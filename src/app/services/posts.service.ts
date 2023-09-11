import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Post } from '../models/posts.model';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root',
})
export class PostsService {
  constructor(private http: HttpClient) {}

  getPosts(): Observable<Post[]> {
    return this.http
      .get<Post[]>(
        'https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts.json'
      )
      .pipe(
        map((data) => {
          let posts: Post[] = [];
          for (let key in data) {
            posts.push({ ...data[key], id: key });
          }
          return posts;
        })
      );
  }

  addPost(post: Post): Observable<{ name: string }> {
    return this.http.post<{ name: string }>(
      'https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts.json',
      post
    );
  }

  updatePost(post: Post | any) {
    const postData = {
      [post.id]: { title: post.title, description: post.description },
    };
    return this.http.patch(
      'https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts.json',
      postData
    );
  }

  deletePost(id: string | undefined) {
    return this.http.delete(
      `https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }

  getPostById(id: any): Observable<Post> {
    return this.http.get<Post>(
      `https://ngrx-complete-course-83177-default-rtdb.firebaseio.com/posts/${id}.json`
    );
  }
}
