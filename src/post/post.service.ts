import { Injectable, NotFoundException } from '@nestjs/common';
import { Post as PostInterface } from './interfaces/post.interface';

@Injectable()
export class PostService {
  private posts: PostInterface[] = [
    {
      id: 1,
      title: 'First Post',
      content: 'This is the content of the first post.',
      author: 'John Doe',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      title: 'Second Post',

      content: 'This is the content of the second post.',
      author: 'Jane Doe',
      createdAt: new Date(),
    },
  ];

  getAllPosts(): PostInterface[] {
    return this.posts;
  }

  getPostById(id: number): PostInterface {
    const post = this.posts.find((post) => post.id === id);
    console.log('post', post);
    console.log('id', id, typeof id);
    if (!post) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }

    return post;
  }

  createPost(
    createPostData: Omit<PostInterface, 'id' | 'createdAt'>,
  ): PostInterface {
    console.log('[Service] createPostData', createPostData);
    const newPost = {
      ...createPostData,
      id: this.getNextPostId(),
      createdAt: new Date(),
      updatedAt: new Date(),
    };
    this.posts.push(newPost);
    return newPost;
  }

  private getNextPostId(): number {
    return this.posts.length
      ? Math.max(...this.posts.map((post) => post.id)) + 1
      : 1;
  }

  updatePost(id: number, updateData: Partial<PostInterface>): PostInterface {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    const updatedPost = {
      ...this.posts[postIndex],
      ...updateData,
      updatedAt: new Date(),
    };
    this.posts[postIndex] = updatedPost;
    return updatedPost;
  }

  removePost(id: number): { message: string } {
    const postIndex = this.posts.findIndex((post) => post.id === id);
    if (postIndex === -1) {
      throw new NotFoundException(`Post with id ${id} not found`);
    }
    this.posts.splice(postIndex, 1);
    return { message: `Post with id ${id} deleted successfully` };
  }
}
