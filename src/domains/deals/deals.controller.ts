import { Body, Controller, Post } from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { CreateProductDto } from './deals.dto';
import { DealsService } from './deals.service';

@Controller('deals')
export class DealsController {
  constructor(private readonly dealsService: DealsService) {}

  @LoggedInOnly()
  @Post('create')
  async createPost(@DUser() user: User, @Body() dto: CreateProductDto) {
    const postOfProduct = await this.dealsService.createPost({
      ...dto,
      authorId: user.id,
    });

    return { postOfProduct };
  }
}
