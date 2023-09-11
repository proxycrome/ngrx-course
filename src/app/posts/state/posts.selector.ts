import { createFeatureSelector, createSelector } from '@ngrx/store';
import { PostsState, postsAdapter } from './posts.state';
import { getCurrentRoute } from 'src/app/store/router/router.selector';
import { RouterStateUrl } from 'src/app/store/router/custom-serializer';

export const POST_STATE_NAME = 'posts';

const getPostsState = createFeatureSelector<PostsState>(POST_STATE_NAME);
export const postsSelector = postsAdapter.getSelectors();

// export const getPosts = createSelector(getPostsState, (state) => {
//     return state.posts;
// })

export const getPosts = createSelector(getPostsState, postsSelector.selectAll);
export const getPostEntities = createSelector(
  getPostsState,
  postsSelector.selectEntities
);

export const getPostById = createSelector(
  getPostEntities,
  getCurrentRoute,
  (posts, route: RouterStateUrl) => {
    return posts ? posts[route.params['id']] : null;
  }
);


export const getCount = createSelector(getPostsState, (state) => state.count);