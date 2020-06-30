import React, {Fragment, useEffect} from 'react'
import PropTypes from 'prop-types'
import {connect} from 'react-redux';
import {loadPosts} from '../../actions/post';
import Spinner from '../layout/Spinner';

// Components
import PostForm from './PostForm';
import PostItem from './PostItem';

const Posts = ({loadPosts, post: {loading, posts}}) => {
  useEffect(()=>{
    loadPosts()
  },[]);
  return (
    loading ? <Spinner/>: 
    <Fragment>
      <PostForm/>
      <div className="posts">
        {posts.map(post=> (
          <PostItem key={post._id} post={post}/>
        ))}
      </div>
    </Fragment>
  )
};

const mapStateToProps = (state)=> ({
  post: state.post
});

Posts.propTypes = {
  loadPosts: PropTypes.func.isRequired,
  post: PropTypes.object.isRequired,
}

export default connect(mapStateToProps, {loadPosts}) (Posts)
