import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import {
  addLike,
  removeLike,
  addOwner,
  removeOwner,
  deleteGame,
} from '../../actions/game';
import {
  BlueButton,
  GreenButton,
  PlainButton,
  RedButton,
} from '../styles/Buttons';

const GameStyles = styled.div`
  border: 1px solid black;
  padding: 1rem;
  margin-bottom: 1.5rem;

  .like-buttons {
    margin-top: 1rem;
  }

  .unlike,
  .see-owners {
    margin-left: 1rem;
  }

  .collection-buttons {
    margin: 1rem 0;
  }

  span {
    font-weight: 700;
  }

  .game-info {
    margin: 0.5rem 0;
  }
`;

const GameItem = ({
  auth,
  game: { _id, designer, name, players, playTime, user, likes, owners },
  addLike,
  removeLike,
  addOwner,
  removeOwner,
  deleteGame,
}) => {
  let isOwned = [];
  if (!auth.loading) {
    isOwned = owners.filter((owner) => owner.user.toString() === auth.user._id);
  }
  return (
    <GameStyles>
      <h3>{name}</h3>
      <p className='game-info'>
        <span>Designer:</span> {designer}
      </p>
      <p className='game-info'>
        <span>Players:</span> {players}
      </p>
      <p className='game-info'>
        <span>Play Time:</span> {playTime}
      </p>
      {!auth.loading && user && (
        <>
          <div className='like-buttons'>
            <PlainButton onClick={(e) => addLike(_id)}>
              <i className='fas fa-thumbs-up'></i>{' '}
              {likes.length > 0 && <span>{likes.length}</span>}
            </PlainButton>
            <PlainButton
              className='unlike'
              type='button'
              onClick={(e) => removeLike(_id)}
            >
              <i className='fas fa-thumbs-down'></i>
            </PlainButton>
          </div>
          <div className='collection-buttons'>
            {isOwned.length > 0 ? (
              <GreenButton
                type='button'
                className='btn btn-light'
                onClick={(e) => removeOwner(_id)}
              >
                Remove From Collection
              </GreenButton>
            ) : (
              <GreenButton
                type='button'
                className='btn btn-light'
                onClick={(e) => addOwner(_id)}
              >
                Add To Collection
              </GreenButton>
            )}
            <BlueButton className='see-owners'>
              <Link to={`/games/${_id}`}>See Owners</Link>
            </BlueButton>
          </div>
          {user === auth.user._id && (
            <RedButton
              type='button'
              className='btn btn-danger'
              onClick={(e) => deleteGame(_id)}
            >
              <i className='fas fa-times'></i> Delete Game
            </RedButton>
          )}
        </>
      )}
    </GameStyles>
  );
};

GameItem.propTypes = {
  game: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  addLike: PropTypes.func.isRequired,
  removeLike: PropTypes.func.isRequired,
  addOwner: PropTypes.func.isRequired,
  removeOwner: PropTypes.func.isRequired,
  deleteGame: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, {
  addLike,
  removeLike,
  addOwner,
  removeOwner,
  deleteGame,
})(GameItem);
