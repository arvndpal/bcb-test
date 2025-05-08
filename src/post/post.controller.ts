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
  getPostById(@Param('id', ParseIntPipe) id: number): PostInterface {
    return this.postService.getPostById(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  createPost(
    @Body() createPostData: Omit<PostInterface, 'id' | 'createdAt'>,
  ): PostInterface {
    console.log('createPostData', createPostData);
    return this.postService.createPost(createPostData);
  }

  @Patch(':id')
  @HttpCode(HttpStatus.OK)
  updatePost(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateData: Partial<PostInterface>,
  ): PostInterface {
    return this.postService.updatePost(id, updateData);
  }

  @Delete(':id')
  //   @HttpCode(HttpStatus.NO_CONTENT)
  deletePost(@Param('id', ParseIntPipe) id: number): { message: string } {
    return this.postService.removePost(id);
  }
}
