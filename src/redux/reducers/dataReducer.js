import {
  SET_POSTS,
  SET_POST,
  LIKE_POST,
  UNLIKE_POST,
  POST_POST,
  SUBMIT_COMMENT,
} from '../type';

const initialState = {
  posts: [],
  post: {},
};

export default function (state = initialState, actions) {
  switch (actions.type) {
    case SET_POSTS:
      return {
        ...state,
        posts: actions.payload,
      };
    case SET_POST:
      return {
        ...state,
        post: actions.payload,
      };
    case LIKE_POST:
    case UNLIKE_POST:
      let index = state.posts.findIndex(
        (post) => post.postId === actions.payload.postId
      );
      state.posts[index].likeCount = actions.payload.likeCount;
      if (state.post.postId === actions.payload.postId) {
        state.post.likeCount = actions.payload.likeCount;
      }
      return {
        ...state,
      };
    case POST_POST:
      return {
        ...state,
        posts: [actions.payload, ...state.posts],
      };
    case SUBMIT_COMMENT:
      let i = state.posts.findIndex(
        (post) => post.postId === actions.payload.postId
      );
      state.posts[i].commentCount++;
      return {
        ...state,
        post: {
          ...state.post,
          comments: [actions.payload, ...state.post.comments],
        },
      };
    default:
      return state;
  }
}
