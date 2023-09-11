import { createReducer, on } from '@ngrx/store';
import { initialState, postsAdapter } from './posts.state';
import {
  addPostSuccess,
  deletePostSuccess,
  loadPostsSuccess,
  updatePostSuccess,
} from './posts.actions';

const _postReducer = createReducer(
  initialState,
  on(addPostSuccess, (state, action) => {
    // let post = { ...action.post };

    // return {
    //   ...state,
    //   posts: [...state.posts, post],
    // };
    return postsAdapter.addOne(action.post, {
      ...state,
      count: state.count + 1,
    });
  }),
  on(updatePostSuccess, (state, action) => {
    // const updatedPosts = state.posts?.map((post) => {
    //   return action.post.id === post.id ? action.post : post;
    // });

    // return {
    //   ...state,
    //   posts: updatedPosts,
    // };
    return postsAdapter.updateOne(action.post, state);
  }),
  on(deletePostSuccess, (state, { id }) => {
    // const updatedPosts = state.posts?.filter((post) => {
    //   return post.id !== id;
    // });
    // return {
    //   ...state,
    //   posts: updatedPosts,
    // };
    return postsAdapter.removeOne(id, state);
  }),
  on(loadPostsSuccess, (state, action) => {
    // return {
    //   ...state,
    //   posts: action.posts,
    // };
    return postsAdapter.setAll(action.posts, {
      ...state,
      count: state.count + 1,
    });
  })
);

export const postsReducer = (state: any, action: any) => {
  return _postReducer(state, action);
};
