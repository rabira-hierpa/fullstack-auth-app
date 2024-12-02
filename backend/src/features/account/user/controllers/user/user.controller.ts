import { BadRequestException, Controller, Get, Inject } from '@nestjs/common';
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
      return await this.userService.findByEmail(user.email);
    } catch (ex) {
      return new BadRequestException(ex);
    }
  }
}
