import { Module } from '@nestjs/common';
import { ProjectsModule } from './projects/projects.module';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    ProjectsModule
  ],
  controllers: [],
  providers: [],
})
export class AppModule { }
