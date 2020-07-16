import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { getCurrentProfile, deleteAccount } from '../../actions/profile';
import { getOwnedGames } from '../../actions/game';
import Spinner from '../layout/Spinner';
import DashboardActions from './DashboardActions';
import { RedButton, GreenButton } from '../styles/Buttons';
import DashGames from './DashGames';

const DashStyles = styled.section`
  .lead {
    margin: 1rem 0;
  }

  h2 {
    margin-top: 1rem;
  }
`;

const Dashboard = ({
  getCurrentProfile,
  auth: { user },
  profile: { profile, loading },
  deleteAccount,
  getOwnedGames,
  game: { games },
}) => {
  useEffect(() => {
    getCurrentProfile();

    if (!loading && user !== null) {
      getOwnedGames(user._id);
    }
  }, [getCurrentProfile, user, loading, getOwnedGames]);

  return loading && profile === null ? (
    <Spinner />
  ) : (
    <DashStyles>
      <h1>Dashboard</h1>
      <p className='lead'>
        <i className='fas fa-user'></i> Welcome {user && user.name}
      </p>
      {profile !== null ? (
        <>
          <DashboardActions />
          <h2>Games</h2>
          <DashGames games={games} />

          <RedButton onClick={() => deleteAccount()}>
            <i className='fas fa-user-minus'></i> Delete My Account
          </RedButton>
        </>
      ) : (
        <>
          <p>You have not yet setup a profile, please add some info</p>
          <GreenButton>
            <Link to='/create-profile'>Create Profile</Link>
          </GreenButton>
        </>
      )}
    </DashStyles>
  );
};

Dashboard.propTypes = {
  getCurrentProfile: PropTypes.func.isRequired,
  getOwnedGames: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
  profile: PropTypes.object.isRequired,
  deleteAccount: PropTypes.func.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
  profile: state.profile,
  game: state.game,
});

export default connect(mapStateToProps, {
  getCurrentProfile,
  deleteAccount,
  getOwnedGames,
})(Dashboard);
