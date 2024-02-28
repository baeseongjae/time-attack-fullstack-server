import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { DealsModule } from './deals/deals.module';
import { MyModule } from './my/my.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [AuthModule, DealsModule, MyModule, UploadModule],
})
export class DomainsModule {}
