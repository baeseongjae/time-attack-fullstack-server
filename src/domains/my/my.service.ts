import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class MyService {
  constructor(private readonly prismaService: PrismaService) {}

  async getMyPosts(userId: string) {
    const myPosts = await this.prismaService.product.findMany({
      where: { authorId: userId },
    });

    return myPosts;
  }
}
