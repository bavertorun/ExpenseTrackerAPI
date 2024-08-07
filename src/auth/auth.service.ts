import { Injectable } from '@nestjs/common';
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
    body.password = await bcrypt.hash(body.password, 10);
    const registerUser = await this.userModel.create(body);
    return this.createToken(registerUser.username);
  }

  async createToken(username: string) {
    return this.jwtService.sign({ username });
  }
}
