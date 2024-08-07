import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Apply ValidationPipe globally to validate incoming requests based on defined DTOs
  // Ensures data integrity and validation across the application
  app.useGlobalPipes(new ValidationPipe());

  // Set a global prefix for all routes
  // All routes will start with 'api' (e.g., /api/users)
  app.setGlobalPrefix('api');

  // Configure CORS (Cross-Origin Resource Sharing) settings
  app.enableCors({
    origin: '*', // Allow requests from all origins
    allowedHeaders: ['Content-Type', 'Authorization'], // Specify allowed headers
    methods: ['GET', 'HEAD', 'PUT', 'PATCH', 'POST', 'DELETE', 'OPTIONS'], // Specify allowed HTTP methods
    credentials: true, // Allow credentials (cookies, authorization headers, etc.)
    optionsSuccessStatus: 204, // Status code for successful OPTIONS request
  });

  // Set up Swagger documentation configuration
  const config = new DocumentBuilder()
    .setTitle('Expense Tracker API')
    .setDescription('An API for users to track their spending')
    .setVersion('1.0')
    .build();

  // Generate Swagger documentation based on the configuration
  const document = SwaggerModule.createDocument(app, config);

  // Set up Swagger UI at the '/api' path
  // Allows access to API documentation through the browser
  SwaggerModule.setup('api', app, document);

  await app.listen(3000);
}
bootstrap();
