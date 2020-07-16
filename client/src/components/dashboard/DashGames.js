import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { removeOwner } from '../../actions/game';
import { RedButton } from '../styles/Buttons';

const TableStyles = styled.table`
  border-collapse: collapse;
  margin: 0.75rem 0 1.5rem;

  th {
    background-color: ${(props) => props.theme.gray};
  }

  th,
  td {
    padding: 1rem;
    text-align: center;
  }

  tr {
    border-bottom: 1px solid ${(props) => props.theme.black};
  }
`;

const DashGames = ({ games, removeOwner }) => {
  let gamesList;
  if (games !== null) {
    gamesList = games.map((game) => (
      <tr key={game._id}>
        <td>{game.name}</td>
        <td>{game.designer}</td>
        <td>{game.players}</td>
        <td>{game.playTime}</td>
        <td>
          <RedButton onClick={() => removeOwner(game._id)}>
            Remove From Collection
          </RedButton>
        </td>
      </tr>
    ));
  }

  return games !== null ? (
    <TableStyles>
      <thead>
        <tr>
          <th>Name</th>
          <th>Designer</th>
          <th>Players</th>
          <th>Play Time</th>
          <th />
        </tr>
      </thead>
      <tbody>{gamesList}</tbody>
    </TableStyles>
  ) : (
    <p>No games owned.</p>
  );
};

DashGames.propTypes = {
  games: PropTypes.object.isRequired,
  removeOwner: PropTypes.func.isRequired,
};

export default connect(null, { removeOwner })(DashGames);
