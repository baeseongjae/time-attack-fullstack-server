import { ForbiddenException, Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(data: Prisma.ProductUncheckedCreateInput) {
    const post = this.prismaService.product.create({
      data,
    });

    return post;
  }

  async getPosts() {
    const posts = this.prismaService.product.findMany();

    return posts;
  }

  async getPost(dealId: number) {
    const post = this.prismaService.product.findUnique({
      where: { id: dealId },
    });

    return post;
  }

  async updatePost(
    data: Prisma.ProductUncheckedCreateInput,
    userId: string,
    dealId: number,
  ) {
    // 요청한 유저가 해당 글의 작성자가 맞는지 확인
    const targetPost = this.prismaService.product.findUnique({
      where: { id: dealId, authorId: userId },
    });
    if (!targetPost) throw new ForbiddenException();

    // 판매글 수정
    const updatedPost = this.prismaService.product.update({
      where: { id: dealId },
      data,
    });

    return updatedPost;
  }

  async deletePost(userId: string, dealId: number) {
    // 요청한 유저가 작성자가 맞는지 확인
    const targetPost = this.prismaService.product.findUnique({
      where: { id: dealId, authorId: userId },
    });
    if (!targetPost) throw new ForbiddenException();

    // 판매글 삭제
    const updatedPost = this.prismaService.product.delete({
      where: { id: dealId },
    });

    return updatedPost;
  }
}
