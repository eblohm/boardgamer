import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { PostFormStyles } from '../styles/Post';
import { addPost } from '../../actions/post';
import { PlainButton } from '../styles/Buttons';

const PostForm = ({ addPost }) => {
  const [text, setText] = useState('');

  return (
    <PostFormStyles>
      <h3>Say Something...</h3>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          addPost({ text });
          setText('');
        }}
      >
        <textarea
          name='text'
          cols='30'
          rows='5'
          placeholder='Create a post'
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

PostForm.propTypes = {
  addPost: PropTypes.func.isRequired,
};

export default connect(null, { addPost })(PostForm);
