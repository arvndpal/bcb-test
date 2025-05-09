import { Injectable, NotFoundException, PipeTransform } from '@nestjs/common';
import { PostService } from '../post.service';

@Injectable()
export class PostExistsPipe implements PipeTransform {
  constructor(private readonly postService: PostService) {}

  transform(value: number): number {
    try {
      this.postService.getPostById(value);
    } catch (e: unknown) {
      if (e instanceof Error) {
        throw new NotFoundException(e.message);
      }
      throw e;
    }
    return value;
  }
}
