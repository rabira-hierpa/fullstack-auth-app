import { BadRequestException, Controller, Get, Inject } from '@nestjs/common';
import { userToUserDecodeDto } from 'src/shared/helper/class-transformer';
import { User } from '../../decorators/user.decorator';
import { UserService } from '../../services/user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject(UserService)
    private readonly userService,
  ) {}

  @Get('getCurrentUser')
  async GetCurrentUser(@User() user) {
    try {
      const _user = await this.userService.findByEmail(user.email);
      return userToUserDecodeDto(_user);
    } catch (ex) {
      return new BadRequestException(ex);
    }
  }
}
