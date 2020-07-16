import React from 'react';
import PropTypes from 'prop-types';
import { TableStyles } from '../styles/Table';

const ProfileGames = ({ games }) => {
  let gamesList;
  if (games !== null) {
    gamesList = games.map((game) => (
      <tr key={game._id}>
        <td>{game.name}</td>
        <td>{game.designer}</td>
        <td>{game.players}</td>
        <td>{game.playTime}</td>
      </tr>
    ));
  }

  return games !== null ? (
    <div>
      <h2>Games</h2>
      <TableStyles>
        <thead>
          <tr>
            <th>Name</th>
            <th>Designer</th>
            <th>Players</th>
            <th>Play Time</th>
          </tr>
        </thead>
        <tbody>{gamesList}</tbody>
      </TableStyles>
    </div>
  ) : (
    <p>No games owned.</p>
  );
};

ProfileGames.propTypes = {
  games: PropTypes.object.isRequired,
};

export default ProfileGames;
