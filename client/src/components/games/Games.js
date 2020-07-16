import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getGames } from '../../actions/game';
import Spinner from '../layout/Spinner';
import GameItem from './GameItem';
import { BlueButton } from '../styles/Buttons';

const TitleStyles = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const Games = ({ getGames, game: { games, loading } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <TitleStyles>
        <h1>Games</h1>
        <BlueButton>
          <Link to='/add-game'>Add A Game</Link>
        </BlueButton>
      </TitleStyles>
      <div className='games'>
        {games.map((game) => (
          <GameItem key={game._id} game={game} />
        ))}
      </div>
    </>
  );
};

Games.propTypes = {
  getGames: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  game: state.game,
});

export default connect(mapStateToProps, { getGames })(Games);
