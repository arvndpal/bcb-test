import {
  IsNotEmpty,
  IsOptional,
  IsString,
  MaxLength,
  MinLength,
} from 'class-validator';

export class UpdatePostDto {
  @IsOptional()
  @IsNotEmpty({ message: 'title should not be empty' })
  @IsString({ message: 'title should be a string' })
  @MinLength(3, { message: 'title should be at least 3 characters long' })
  @MaxLength(100, {
    message: 'title should not be longer than 100 characters',
  })
  title?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'content should not be empty' })
  @IsString({ message: 'content should be a string' })
  @MinLength(10, { message: 'content should be at least 10 characters long' })
  @MaxLength(5000, {
    message: 'content should not be longer than 5000 characters',
  })
  content?: string;

  @IsOptional()
  @IsNotEmpty({ message: 'authorId should not be empty' })
  @IsString({ message: 'authorId should be a string' })
  @MinLength(1, { message: 'authorId should be at least 1 character long' })
  @MaxLength(50, {
    message: 'authorId should not be longer than 50 characters',
  })
  author?: string;
}
