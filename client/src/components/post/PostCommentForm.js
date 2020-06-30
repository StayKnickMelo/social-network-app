import React, { useState } from 'react';
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { addComment } from '../../actions/post'


const PostCommentForm = ({ addComment, post: { _id } }) => {

  const [text, setComment] = useState('');

  const onChange = (e) => {
    setComment(e.target.value);
  };

  const onSubmit = (e) => {
    e.preventDefault();

    addComment({text}, _id);

    setComment('');
  }

  return (
    <div className='post-form'>
      <div className="bg-primary p">
        <h3>Leave A Comment</h3>
      </div>

      <form onSubmit={onSubmit} className="form my-1">
        <textarea onChange={onChange} value={text} name="text" cols="30" rows="5" placeholder='Comment on this post'></textarea>
        <input type="submit" className="btn btn-dark my-1" value='Submit' />
      </form>
    </div>
  );
};

PostCommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  post: state.post.post
})

export default connect(mapStateToProps, { addComment })(PostCommentForm)
