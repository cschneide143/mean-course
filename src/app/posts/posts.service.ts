import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

import { Post } from './post.model';

@Injectable({ providedIn: 'root' })
export class PostsService {
  private posts: Post[] = [];
  private postsUpdated = new Subject<Post[]>();

  getPosts() {
    return [...this.posts];
  }

  getPostUpdateListener() {
    return this.postsUpdated.asObservable();
  }

  addPost(ptitle: string, pcontent: string) {
    const post: Post = { title: ptitle, content: pcontent };
    this.posts.push(post);
    this.postsUpdated.next([...this.posts]);
  }
}
