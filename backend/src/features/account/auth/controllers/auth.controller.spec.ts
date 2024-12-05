import { Test, TestingModule } from '@nestjs/testing';
import { getRepositoryToken } from '@nestjs/typeorm';
import { UserEntity } from '../../../../entities/user.entity';
import { WinstonLoggerService } from '../../../../logger/service/logger.service';
import { UserService } from '../../user/services/user.service';
import { RegisterDto } from '../dto/register.dto';
import { AuthService } from '../services/auth.service';
import { AuthController } from './auth.controller';

describe('AuthController', () => {
  let authController: AuthController;
  let authService: AuthService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [AuthController],
      providers: [
        AuthService,
        UserService,
        WinstonLoggerService,
        {
          provide: getRepositoryToken(UserEntity),
          useValue: {}, // Mock repository
        },
      ],
    }).compile();

    authController = module.get<AuthController>(AuthController);
    authService = module.get<AuthService>(AuthService);
  });

  it('should be defined', () => {
    expect(authController).toBeDefined();
  });

  describe('register', () => {
    it('should call register method of authService', async () => {
      const registerDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'Password123!',
        token: 'someToken',
        roles: ['user'],
      };
      const result = {
        id: '1',
        email: 'john.doe@example.com',
        firstName: 'John',
        lastName: 'Doe',
        roles: ['user'],
        token: 'someToken',
        fullName: 'John Doe',
      }; // Mock result

      jest
        .spyOn(authService, 'register')
        .mockImplementation(async () => result);

      expect(await authController.register(registerDto)).toBe(result);
      expect(authService.register).toHaveBeenCalledWith(registerDto);
    });

    it('should throw an error if register method of authService throws an error', async () => {
      const registerDto: RegisterDto = {
        firstName: 'John',
        lastName: 'Doe',
        email: 'john.doe@example.com',
        password: 'password',
        token: 'someToken',
        roles: ['user'],
      };

      jest
        .spyOn(authService, 'register')
        .mockRejectedValue(new Error('Registration failed'));

      await expect(authController.register(registerDto)).rejects.toThrow(
        'Registration failed',
      );
    });
  });
});
