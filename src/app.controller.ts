import { Controller, Get } from '@nestjs/common';
import { AppService } from 'src/services/app.service';
// import { Request, Response } from 'express';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  // @Render('home')
  getHello(): string {
    return this.appService.getHello();
  }
}
