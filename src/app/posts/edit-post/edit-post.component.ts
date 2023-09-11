import { Component, OnDestroy, OnInit } from '@angular/core';
import { ActivatedRoute, Data, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { AppState } from 'src/app/store/app.state';
import { getPostById } from '../state/posts.selector';
import { Post } from 'src/app/models/posts.model';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { updatePost } from '../state/posts.actions';

@Component({
  selector: 'app-edit-post',
  templateUrl: './edit-post.component.html',
  styleUrls: ['./edit-post.component.css'],
})
export class EditPostComponent implements OnInit, OnDestroy {
  post!: Post;
  postForm!: FormGroup;
  postSubscription!: Subscription;
  constructor(
    private store: Store<AppState>,
  ) {}

  ngOnInit(): void {
    this.createForm();
    this.postSubscription = this.store
      .select(getPostById)
      .subscribe((post: any) => {
        this.post = post;
        this.postForm.patchValue({
          title: post?.title,
          description: post?.description,
        });
      });

    // this.route.paramMap.subscribe((params) => {
    //   const id = params.get('id');
    //   this.postSubscription = this.store
    //     .select(getPostById, { id })
    //     .subscribe((data: any) => {
    //       this.post = data;
    //       this.createForm();
    //       this.postForm.setValue({
    //         title: this.post?.title,
    //         description: this.post?.description
    //       })
    //     });
    // });
  }

  createForm() {
    this.postForm = new FormGroup({
      title: new FormControl(null, [
        Validators.required,
        Validators.minLength(6),
      ]),
      description: new FormControl(null, [
        Validators.required,
        Validators.minLength(10),
      ]),
    });
  }

  onUpdatePost() {
    if (!this.postForm.valid) {
      return;
    }

    const title = this.postForm.value.title;
    const description = this.postForm.value.description;

    const post: Post = {
      id: this.post.id,
      title,
      description,
    };
    // dispatch the action
    this.store.dispatch(updatePost({ post }));
  }

  ngOnDestroy(): void {
    if (this.postSubscription) {
      this.postSubscription.unsubscribe();
    }
  }
}
