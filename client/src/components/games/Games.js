import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { getGames } from '../../actions/game';
import Spinner from '../layout/Spinner';
import GameItem from './GameItem';

const Games = ({ getGames, game: { games, loading } }) => {
  useEffect(() => {
    getGames();
  }, [getGames]);

  return loading ? (
    <Spinner />
  ) : (
    <>
      <h1>Games</h1>
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
