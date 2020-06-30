import { LOAD_POSTS, LOAD_POST, ADD_POST, POST_ERROR, ADD_REMOVE_LIKE, REMOVE_POST, CLEAR_POST, ADD_COMMENT, REMOVE_COMMENT } from '../actions/types';


const inititalState = {
  posts: [],
  post: null,
  loading: true,
  error: null
};


const postReducer = (state = inititalState, action) => {
  const { type, payload } = action;
  switch (type) {
    case LOAD_POSTS:
      return {
        ...state,
        posts: payload,
        loading: false
      }
    case LOAD_POST:
      return {
        ...state,
        post: payload,
        loading: false
      }
    case ADD_POST:
      return {
        ...state,
        posts: [payload, ...state.posts],
        loading: false
      }
    case CLEAR_POST:
      return {
        ...state,
        post: null,
        loading: false
      }
    case REMOVE_POST:
      return {
        ...state,
        posts: state.posts.filter(post => post._id !== payload),
        loading: false
      }
    case POST_ERROR:
      return {
        ...state,
        posts: [],
        post: null,
        loading: false,
        error: payload
      }
    case ADD_REMOVE_LIKE:
      return {
        ...state,
        posts: state.posts.map(post => post._id.toString() === payload.id ? { ...post, likes: payload.likes } : post)
      }
    case ADD_COMMENT:
      return {
        ...state,
        post: { ...state.post, comments: payload },
        loading: false
      }
    case REMOVE_COMMENT:
      return {
        ...state,
        post: {
          ...state.post,
          comments: state.post.comments.filter(comment => comment._id !== payload)
        }
      }

    default:
      return state
  }
}


export default postReducer