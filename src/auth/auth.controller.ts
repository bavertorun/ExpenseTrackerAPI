import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { UserDTO } from './dto/User.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}
  @Post('register')
  async register(@Body() body: UserDTO) {
    return this.authService.register(body);
  }
  @Post('login')
  async login(@Body() body: UserDTO) {
    return this.authService.login(body);
  }
}
