
import axios from 'axios'
import { LOAD_POSTS, LOAD_POST, ADD_POST, CLEAR_POST, REMOVE_POST, ADD_REMOVE_LIKE, ADD_COMMENT, REMOVE_COMMENT } from './types';
import { setAlert } from './alert';

// Load all Posts
export const loadPosts = () => async dispatch => {
  try {
    const res = await axios.get('/api/posts');

    dispatch({
      type: LOAD_POSTS,
      payload: res.data.data
    });
  } catch (error) {

    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));

  }
};


// Load Post By Id
export const loadPostById = (id) => async dispatch => {
  try {
    const res = await axios.get(`/api/posts/${id}`);

    dispatch({
      type: LOAD_POST,
      payload: res.data.data
    })
  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')))

  }
};

// Add Post
export const addPost = (post) => async dispatch => {
  const config = {
    headers: {
      'Content-type': 'application/json'
    }

  }

  try {
    const res = await axios.post('/api/posts', post, config);

    dispatch({
      type: ADD_POST,
      payload: res.data.data
    });

    dispatch(setAlert('Post Added', 'success'));

  } catch (error) {
    console.log(error.response.data.errors)
    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
  }
}

// Clear post
export const clearPost = () => dispatch => {
  dispatch({
    type: CLEAR_POST
  });
};

// Delete Post 
export const deletePost = (id) => async dispatch => {
  try {
    await axios.delete(`/api/posts/${id}`);

    dispatch({
      type: REMOVE_POST,
      payload: id
    });

    dispatch(setAlert('Post Removed', 'success'));

  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));
  }
};

// Add like to a post
export const addLike = (id) => async dispatch => {

  try {

    const res = await axios.put(`/api/posts/${id}/likes`);

    dispatch({
      type: ADD_REMOVE_LIKE,
      payload: { id, likes: res.data.data }
    })

  } catch (error) {
    console.log(error.response.data.errors);

  }

};

// Remove like from a post
export const removeLike = (id) => async dispatch => {
  try {
    const res = await axios.delete(`/api/posts/${id}/likes`);

    dispatch({
      type: ADD_REMOVE_LIKE,
      payload: { id, likes: res.data.data }
    })

  } catch (error) {
    console.log(error.response.data.errors);

  };

};

// Add a comment
export const addComment = (comment, id) => async dispatch => {

  try {
    const res = await axios.put(`/api/posts/${id}/comments`, comment);

    dispatch({
      type: ADD_COMMENT,
      payload: res.data.data
    });


    dispatch(setAlert('Comment Added', 'success'));

  } catch (error) {
    console.log(error.response.data.errors);

    error.response.data.errors.forEach(err => dispatch(setAlert(err.msg, 'danger')));

  }

};

// Delete comment 
export const deleteComment = (postId,commentId) => async dispatch => {

  try {
    const res = await axios.delete(`/api/posts/${postId}/comments/${commentId}`);

    dispatch({
      type: REMOVE_COMMENT,
      payload: commentId
    });

    dispatch(setAlert('Comment Removed', 'success'));

    
  } catch (error) {
    console.log(error.response.data.errors);
  }

}




// Avatar check
export const addAvatar = async () => {

  try {
    await axios.put('/api/posts/avatar');

    console.log('Avatar Added')
  } catch (error) {
    console.log(error.response.data.errors);

  }

}



