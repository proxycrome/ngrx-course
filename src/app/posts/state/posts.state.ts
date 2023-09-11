import { EntityState, createEntityAdapter } from '@ngrx/entity';
import { Post } from '../../models/posts.model';

// export interface PostsState {
//     posts: Post[];
// }

export interface PostsState extends EntityState<Post> {
  count: number;
}

export function sortByName(a: Post, b: Post): number {
  const compare = a.title.localeCompare(b.title);
  // sort in descending order
  if (compare > 0) {
    return -1;
  }
  if (compare < 0) {
    return 1;
  }
  return compare;
}

export const postsAdapter = createEntityAdapter<Post>({
  // selectId: (post: Post) => post.id // select what you want as the unique id in the Adapter
  sortComparer: sortByName,
});

// export const initialState: PostsState = {
//     posts: []
// }

export const initialState: PostsState = postsAdapter.getInitialState({
  count: 0,
});
