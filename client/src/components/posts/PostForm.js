import React, { useState } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types'
import { addPost, addAvatar } from '../../actions/post';


const PostForm = ({ addPost,addAvatar, user: {avatar} }) => {
  const [post, setPost] = useState({
    text: ''
  });

  const onChange = (e) => {
    setPost({ text: e.target.value })
  }

  const onSubmit = (e) => {
    e.preventDefault();

    addPost(post);
    setPost({text: ''});

    
  }

  return (
    <div className="post-form">
      <div className="bg-primary p">
        <h3>Say Something...</h3>
      </div>
      <form onSubmit={onSubmit} className="form my-1">
        <textarea
          name="text"
          cols="30"
          rows="5"
          placeholder="Create a post"
          value={post.text}
          onChange={onChange}
        ></textarea>
        <input type="submit" className="btn btn-dark my-1" value="Submit" />
      </form>
    </div>
  )
};

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
}

const mapStateToProps = (state)=> ({
  user: state.auth.user
})

export default connect(mapStateToProps, { addPost, addAvatar })(PostForm)
