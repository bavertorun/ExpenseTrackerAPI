import {
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { User } from './schemas/User.schema';
import { JwtService } from '@nestjs/jwt';
import { UserDTO } from './dto/User.dto';
import * as bcrypt from 'bcrypt';
@Injectable()
export class AuthService {
  constructor(
    @InjectModel(User.name) private readonly userModel: Model<User>,
    private jwtService: JwtService,
  ) {}

  async register(body: UserDTO) {
    const existingUserUsername = await this.userModel
      .findOne({ username: body.username })
      .exec();
    if (existingUserUsername)
      throw new ConflictException('Username already exists');

    const existingUserEmail = await this.userModel.findOne({
      email: body.email,
    });
    if (existingUserEmail)
      throw new ConflictException('Email already exists');

    body.password = await bcrypt.hash(body.password, 10);
    const registerUser = await this.userModel.create(body);
    return this.createToken(registerUser.username);
  }

  async login(body: UserDTO) {
    const user = await this.userModel
      .findOne({ username: body.username, email: body.email })
      .exec();
    if (!user) throw new UnauthorizedException('Wrong Username or Email');

    const isPasswordValid = await bcrypt.compare(body.password, user.password);
    if (!isPasswordValid) throw new UnauthorizedException('Wrong Password');

    return this.createToken(user.username);
  }

  async createToken(username: string) {
    return { access_token: this.jwtService.sign({ username }) };
  }
}
