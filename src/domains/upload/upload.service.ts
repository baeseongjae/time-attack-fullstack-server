import { Injectable } from '@nestjs/common';
import { writeFile } from 'fs/promises';
import { nanoid } from 'nanoid';
import { join } from 'path';
import { PrismaService } from 'src/db/prisma/prisma.service';

@Injectable()
export class UploadService {
  constructor(private readonly prismaService: PrismaService) {}

  async create({ title, content, price, location, image, authorId }) {
    // 실제 어디다 저장할건지 + 파일명 + 확장자 => 경로 만들어주기.
    const fileName = nanoid();
    const extension = image.originalname.split('.').pop();
    const path = join(
      __dirname,
      '../../../public/images',
      `${fileName}.${extension}`,
    ); // __dirname을 써야 현재 위치가 나온다.

    // file 객체에 있는 버퍼 저장하기. -> 우리는 image라고 부르기로 했으니.
    await writeFile(path, image.buffer); // 저장하는 라이브러리 fs 근데 프로미스 지원안하니까 fs/promises

    // product(판매글)를 생성하자 이제!
    const newProduct = await this.prismaService.product.create({
      data: {
        title,
        content,
        location,
        price,
        imgSrc: `/images/${fileName}.${extension}`, //이거 어케하지;;;;;
        authorId,
      },
    });

    console.log(newProduct);
  }
}
