import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Moment from 'react-moment';
import { connect } from 'react-redux';
import { addLike, removeLike, deletePost } from '../../actions/post';
import { BlueButton, PlainButton, RedButton } from '../styles/Buttons';
import { ItemStyles } from '../styles/Post';

const PostItem = ({
  auth,
  post: { _id, text, name, avatar, user, likes, comments, date },
  addLike,
  removeLike,
  deletePost,
  showActions,
}) => (
  <ItemStyles>
    <div className='user-info'>
      <Link to={`/profile/${user}`}>
        <img src={avatar} alt={`${name}'s Avatar`} />
        <h4>{name}</h4>
      </Link>
    </div>
    <div className='post-body'>
      <p>{text}</p>
      <div className='post-info'>
        <p className='post-date'>
          Posted on <Moment format='YYYY/MM/DD'>{date}</Moment>
        </p>
        {showActions && (
          <div className='post-actions'>
            <PlainButton type='button' onClick={(e) => addLike(_id)}>
              <i className='fas fa-thumbs-up'></i>{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </PlainButton>
            <PlainButton type='button' onClick={(e) => removeLike(_id)}>
              <i className='fas fa-thumbs-down'></i>
            </PlainButton>
            <BlueButton>
              <Link to={`/post/${_id}`}>
                Discussion{' '}
                {comments.length > 0 && (
                  <span className='comment-count'>{comments.length}</span>
                )}
              </Link>
            </BlueButton>
            {!auth.loading && user === auth.user._id && (
              <RedButton type='button' onClick={(e) => deletePost(_id)}>
                <i className='fas fa-times'></i>
              </RedButton>
            )}
          </div>
        )}
      </div>
    </div>
  </ItemStyles>
);

PostItem.defaultProps = {
  showActions: true,
};

PostItem.propTypes = {
  post: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  deletePost: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { addLike, removeLike, deletePost })(
  PostItem
);
