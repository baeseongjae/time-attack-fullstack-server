import { Controller, Get } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { MyService } from './my.service';

@Controller('my')
export class MyController {
  constructor(private readonly myService: MyService) {}

  @Get('deals')
  @LoggedInOnly()
  async getMyPosts(@DUser() user: User) {
    const myPosts = await this.myService.getMyPosts(user.id);
    return { myPosts };
  }
}
