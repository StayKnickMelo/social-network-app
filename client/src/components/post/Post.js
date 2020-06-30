import React, { useEffect, Fragment } from 'react'
import PropTypes from 'prop-types'
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Spinner from '../layout/Spinner';
import { loadPostById, clearPost } from '../../actions/post'

// Components
import PostItem from '../posts/PostItem';
import PostCommentForm from './PostCommentForm';
import Comment from './Comment';




const Post = ({ match, loadPostById, clearPost, post: { post, loading } }) => {
  const id = match.params.id;

  useEffect(() => {
    loadPostById(id)
  }, []);

  return (
    loading || post === null ? <Spinner /> :

      <Fragment>
        <Link onClick={clearPost} to='/posts' className='btn btn-dark'>Back to Posts</Link>
        <PostItem post={post} showBtns={false} />
        <PostCommentForm/>
        <div className="comment">
          {post.comments && post.comments.length > 0 && post.comments.map(comment=> (
            <Comment key={comment._id} postId={id} comment={comment} />
          ))}
        </div>
      </Fragment>
  );
};


const mapStateToProps = (state) => ({
  post: state.post
})

export default connect(mapStateToProps, { loadPostById, clearPost })(Post)
