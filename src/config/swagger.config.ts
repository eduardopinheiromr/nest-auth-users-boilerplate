import { DocumentBuilder } from '@nestjs/swagger';
import 'dotenv/config';

const swaggerConfig = new DocumentBuilder()
  //   ABOUT
  .setTitle(process.env.SWAGGER_TITLE)
  .setDescription(process.env.SWAGGER_DESCRIPTION)
  .setVersion(process.env.SWAGGER_VERSION)
  //   AUTH
  .addBearerAuth()
  //   GENERATE
  .build();

export default swaggerConfig;
