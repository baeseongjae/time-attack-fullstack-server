import { Injectable } from '@nestjs/common';
import { Prisma } from '@prisma/client';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class DealsService {
  constructor(private readonly prismaService: PrismaService) {}

  async createPost(data: Prisma.ProductUncheckedCreateInput) {
    const product = this.prismaService.product.create({
      data,
    });

    return product;
  }
}
