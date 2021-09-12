import { Controller, Post, UseGuards } from '@nestjs/common';
import { ImagesService } from './images.service';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from '@modules/auth/guards/jwt-auth.guard';

@ApiTags('Images')
@Controller('images')
export class ImagesController {
  constructor(private readonly imagesService: ImagesService) {}
  @ApiBearerAuth()
  @UseGuards(JwtAuthGuard)
  @Post()
  uploadImage() {
    return this.imagesService.upload();
  }
}
