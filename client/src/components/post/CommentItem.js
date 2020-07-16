import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import Moment from 'react-moment';
import { deleteComment } from '../../actions/post';
import { ItemStyles } from '../styles/Post';
import { RedButton } from '../styles/Buttons';

const CommentItem = ({
  postId,
  comment: { _id, text, name, avatar, user, date },
  auth,
  deleteComment,
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
        <div className='post-actions'>
          {!auth.loading && user === auth.user._id && (
            <RedButton
              type='button'
              onClick={(e) => deleteComment(postId, _id)}
            >
              <i className='fas fa-times'></i>
            </RedButton>
          )}
        </div>
      </div>
    </div>
  </ItemStyles>
);

CommentItem.propTypes = {
  postId: PropTypes.number.isRequired,
  comment: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  deleteComment: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { deleteComment })(CommentItem);
