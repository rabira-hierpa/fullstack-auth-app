import {
  BadRequestException,
  ConflictException,
  Injectable,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import * as bcrypt from 'bcrypt';
import { passwordStrength } from 'check-password-strength';
import * as crypto from 'crypto';
import { User } from 'src/entities/user.entity';
import { Repository } from 'typeorm';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepo: Repository<User>,
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  private generateToken() {
    return crypto.randomBytes(20).toString('hex');
  }

  async validateUser(email: string, password: string): Promise<User | null> {
    const user = await this.userService.findByEmail(email);
    if (user && (await bcrypt.compare(password, user.password))) {
      return user;
    }
    return null;
  }

  async login(user: User): Promise<{ access_token: string }> {
    const payload = { email: user.email, sub: user.id };
    return {
      access_token: this.jwtService.sign(payload),
    };
  }

  async register(userDto: RegisterDto): Promise<User> {
    //check if user with this email already exists
    const existingUser = await this.userService.findByEmail(userDto.email);
    if (existingUser) {
      throw new ConflictException('User with this email already exists');
    }
    if (userDto.password.length < 8) {
      //check password
      throw new BadRequestException(
        'password must be longer than or equal to 8 characters',
      );
    }
    //TODO: Apply the password policy
    if (passwordStrength(userDto.password).id < 2) {
      throw new BadRequestException('Password too weak');
    }

    userDto.email = userDto.email.toLowerCase();

    const token = this.generateToken();
    userDto.token = token;

    const hashedPassword = await bcrypt.hash(userDto.password, 10);
    userDto.password = hashedPassword;
    // Register the user
    let user = this.userRepo.create(userDto);
    user = await this.userRepo.save(user);
    return user;
  }
}
