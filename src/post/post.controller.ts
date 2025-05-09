import { PostService } from './post.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { Post as PostInterface } from './interfaces/post.interface';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
import { PostExistsPipe } from './pipes/post-exists.pipe';

@Controller('post')
export class PostController {
  constructor(private readonly postService: PostService) {}

  @Get()
  getAllPosts(@Query('search') search?: string): PostInterface[] {
    const getAllPosts = this.postService.getAllPosts();

    console.log('search', search);

    if (search) {
      return getAllPosts.filter((post) =>
        post.title.toLowerCase().includes(search.toLowerCase()),
      );
    }
    return getAllPosts;
  }

  @Get(':id')
  getPostById(
    @Param('id', ParseIntPipe, PostExistsPipe) id: number,
  ): PostInterface {
    return this.postService.getPostById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(@Body() createPostData: CreatePostDto): PostInterface {
    console.log('createPostData', createPostData);
    return this.postService.createPost(createPostData);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: UpdatePostDto,
  ): PostInterface {
    return this.postService.updatePost(id, updateData);
  }

  @Delete(':id')
  //   @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.postService.removePost(id);
  }
}
