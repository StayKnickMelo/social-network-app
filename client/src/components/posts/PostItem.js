import React, { Fragment } from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import userLogo from '../../img/avatar-default-icon.png'
import { deletePost, addLike, removeLike } from '../../actions/post';




const PostItem = ({ post, deletePost, addLike, removeLike, auth, showBtns }) => {

  const {
    name,
    text,
    user,
    _id,
    likes,
    comments,
    createdAt

  } = post;
  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/users/${user._id}`}>
          <img src={user.avatar ? `/api/image/${user._id}` : userLogo} alt="" className="round-img" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">
          {text}
        </p>
        <p className="post-date">
          Posted on <Moment format='YYYY/MM/DD'>{createdAt}</Moment>
        </p>

        {showBtns && (
          <Fragment>
            <button onClick={() => addLike(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-up"></i> {' '}
              <span>{likes.length > 0 && likes.length}</span>
            </button>
            <button onClick={() => removeLike(_id)} className="btn btn-light">
              <i className="fas fa-thumbs-down"></i>
            </button>
            <Link to={`/posts/${_id}`} className='btn btn-primary'>
              Discussion{' '}{comments.length > 0 && <span className='comments-count'>{comments.length}</span>}
            </Link>
            {!auth.loading && auth.user._id === user._id && (
              <button onClick={() => deletePost(_id)} className='btn btn-danger'>
                <i className="fas fa-times"></i>
              </button>
            )}
          </Fragment>

        )}

      </div>
    </div>
  )
};

PostItem.defaultProps = {
  showBtns: true
}

PostItem.propTypes = {
  auth: PropTypes.object.isRequired,
  post: PropTypes.object.isRequired,
  deletePost: PropTypes.func.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})
export default connect(mapStateToProps, { deletePost, addLike, removeLike })(PostItem)
