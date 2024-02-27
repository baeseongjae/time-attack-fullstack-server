import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Patch,
  Post,
} from '@nestjs/common';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { CreateProductDto, UpdateProductDto } from './deals.dto';
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

  @Get()
  async getPosts() {
    const posts = await this.dealsService.getPosts();

    return { posts };
  }

  @Get(':dealId')
  async getPost(@Param('dealId', ParseIntPipe) dealId: number) {
    const post = await this.dealsService.getPost(dealId);

    return { post };
  }

  @Patch(':dealId/edit')
  @LoggedInOnly()
  async updatePost(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    const dto = { ...updateProductDto, authorId: user.id };
    const updatedPost = await this.dealsService.updatePost(
      dto,
      user.id,
      dealId,
    );

    return { updatedPost };
  }

  @Delete(':dealId')
  @LoggedInOnly()
  async deletePost(
    @DUser() user: User,
    @Param('dealId', ParseIntPipe) dealId: number,
  ) {
    const deletedPost = await this.dealsService.deletePost(user.id, dealId);

    return { deletedPost };
  }
}
