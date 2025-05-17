import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { AppController } from './app.controller';
import { SharedModule } from './shared/shared.module';
import { LogModule } from './logger/app-logger.module';
import { DatabaseModule } from './database/database.module';
import { SeederModule } from './database/seed/seeder.module';

@Module({
  imports: [SharedModule, LogModule, DatabaseModule, SeederModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
