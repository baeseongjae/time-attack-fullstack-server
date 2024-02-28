import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { User } from '@prisma/client';
import { LoggedInOnly } from 'src/decorators/loggedInOnly.decorator';
import { DUser } from 'src/decorators/user.decorator';
import { updateFormDto } from './upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @LoggedInOnly()
  @Post('image')
  @UseInterceptors(FileInterceptor('image')) // ★중간에 어떤형태인지 모르는 녀석을 쓸수있는 형태로 바꿔줌.
  //폼데이터의 blabla라는 키값을 잡아서 객체로 해주는 역할이 인터셉터?
  async uploadImage(
    @DUser() user: User,
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: updateFormDto,
  ) {
    console.log(image);

    const data = {
      ...dto,
      image: image,
      authorId: user.id,
    };
    // 여까지 하고 console.log 찍었음. 이제 남은건 public에 이미지저장하고, URL로 바꿔주기.
    // => service로 가자.
    const postOfProduct = await this.uploadService.create(data);

    return { postOfProduct };

    // return 3000
  }
}
