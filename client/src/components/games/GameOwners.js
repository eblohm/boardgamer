import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { Link } from 'react-router-dom';
import { getGame } from '../../actions/game';
import { BlueButton } from '../styles/Buttons';
import Spinner from '../layout/Spinner';

const OwnerStyles = styled.div`
  .owner-info {
    margin-top: 0.5rem;

    p {
      font-size: 1.25rem;
    }
  }
`;

const GameOwners = ({ getGame, game: { game, loading }, match }) => {
  useEffect(() => {
    getGame(match.params.id);
  }, [getGame, match.params.id]);

  return loading || game === null ? (
    <Spinner />
  ) : (
    <OwnerStyles>
      <h1>{game.name}</h1>
      <>
        {game.owners.map((owner) => (
          <div className='owner-info'>
            <p>{owner.name}</p>
            <BlueButton>
              <Link to={`/profile/${owner._id}`}>View Profile</Link>
            </BlueButton>
          </div>
        ))}
      </>
    </OwnerStyles>
  );
};

GameOwners.propTypes = {
  getGame: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGame })(GameOwners);
