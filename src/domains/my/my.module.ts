import { Module } from '@nestjs/common';
import { MyService } from './my.service';
import { MyController } from './my.controller';

@Module({
  controllers: [MyController],
  providers: [MyService],
})
export class MyModule {}
