import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addGame } from '../../actions/game';
import { PlainButton } from '../styles/Buttons';
import { ProfileFormStyles } from '../styles/Profile';

const initialState = {
  designer: '',
  name: '',
  players: '',
  playTime: '',
};

const GameForm = ({ addGame, history }) => {
  const [formData, setFormData] = useState(initialState);

  const { designer, name, players, playTime } = formData;

  const onChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const onSubmit = (e) => {
    e.preventDefault();
    addGame(formData, history);
  };

  return (
    <ProfileFormStyles>
      <h1>Add A Game</h1>
      <small>* = required field</small>
      <form onSubmit={onSubmit}>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Game Name'
            name='name'
            value={name}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Game Designer'
            name='designer'
            value={designer}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Player Count (e.g. 1 - 4)'
            name='players'
            value={players}
            onChange={onChange}
          />
        </div>
        <div className='form-group'>
          <input
            type='text'
            placeholder='Play Time (e.g. 30 - 60 minutes)'
            name='playTime'
            value={playTime}
            onChange={onChange}
          />
        </div>
        <PlainButton>
          <input type='submit' className='submit-button' />
        </PlainButton>
      </form>
    </ProfileFormStyles>
  );
};

GameForm.propTypes = {
  addGame: PropTypes.func.isRequired,
};

export default connect(null, { addGame })(GameForm);
