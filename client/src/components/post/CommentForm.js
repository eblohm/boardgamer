import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addComment } from '../../actions/post';
import { PostFormStyles } from '../styles/Post';
import { PlainButton } from '../styles/Buttons';

const CommentForm = ({ postId, addComment }) => {
  const [text, setText] = useState('');

  return (
    <PostFormStyles>
      <h3>Leave a comment</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addComment(postId, { text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Add Comment'
          value={text}
          onChange={(e) => setText(e.target.value)}
          required
        />
        <PlainButton>
          <input type='submit' className='submit-button' value='Submit' />
        </PlainButton>
      </form>
    </PostFormStyles>
  );
};

CommentForm.propTypes = {
  addComment: PropTypes.func.isRequired,
};

export default connect(null, { addComment })(CommentForm);
