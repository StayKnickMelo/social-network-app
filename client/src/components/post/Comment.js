import React from 'react';
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';


const Comment = ({ comment, auth, deleteComment, postId }) => {

  const {
    user,
    name,
    text,
    avatar,
    _id,
    createdAt

  } = comment;

  return (
    <div className='post bg-white p-1 my-1'>
      <div>
        <Link to={`/users/${user}`}>
          <img className='round-img' src={`/api/image/${user}`} alt="" />
          <h4>{name}</h4>
        </Link>
      </div>

      <div>
        <p className="my-1">
          {text}
        </p>
        <p className="post-date">
          <Moment format='YYYY/MM/DD'>{createdAt}</Moment>
        </p>

        {!auth.loading && auth.user._id === user && (
          <button onClick={() => deleteComment(postId, _id)} className="btn btn-danger">
            <i className="fas fa-times"></i>
          </button>
        )}
      </div>

    </div>
  )
};

Comment.propTypes = {
  deleteComment: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  comment: PropTypes.object.isRequired,
}

const mapStateToProps = (state) => ({
  auth: state.auth
})

export default connect(mapStateToProps, { deleteComment })(Comment)
