import {
  Body,
  Controller,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { updateFormDto } from './upload.dto';
import { UploadService } from './upload.service';

@Controller('upload')
export class UploadController {
  constructor(private readonly uploadService: UploadService) {}

  @Post('image')
  @UseInterceptors(FileInterceptor('image')) // ★중간에 어떤형태인지 모르는 녀석을 쓸수있는 형태로 바꿔줌.
  //폼데이터의 blabla라는 키값을 잡아서 객체로 해주는 역할이 인터셉터?
  uploadImage(
    @UploadedFile() image: Express.Multer.File,
    @Body() dto: updateFormDto,
  ) {
    console.log(image);

    const data = {
      title: dto.title,
      content: dto.content,
      location: dto.location,
      price: dto.price,
      image: image,
    };
    // 여까지 하고 console.log 찍었음. 이제 남은건 public에 이미지저장하고, URL로 바꿔주기.
    // => service로 가자.
    this.uploadService.create(data);

    // return 3000
  }
}
