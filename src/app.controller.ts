import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { user, userLogin } from './types/user_auth';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) { }

  @Get('/home')
  getHello(): string {
    return this.appService.getHello();
  }

  @Post('/login')
  async getUser(@Body() userData: userLogin): Promise<user> {
    console.log(userData.username,userData.password);
    return await this.appService.getUser(userData);
  }
}
