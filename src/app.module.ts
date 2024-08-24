import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from './auth/auth.service';

@Module({
  imports: [ConfigModule.forRoot(),
    JwtModule.register({
      secret:'blackcat@69',
      signOptions:{expiresIn:'12h'},
    }),
  ],
  controllers: [AppController],
  providers: [AppService, AuthService],
  exports:[AuthService]
})
export class AppModule {}
