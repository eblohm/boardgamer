import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import styled from 'styled-components';
import Spinner from '../layout/Spinner';
import { getProfileById } from '../../actions/profile';
import { getOwnedGames } from '../../actions/game';
import ProfileGames from './ProfileGames';
import ProfileAbout from './ProfileAbout';
import ProfileTop from './ProfileTop';
import { PlainButton } from '../styles/Buttons';

const ProfileStyles = styled.section`
  .profile-info {
    display: flex;
    flex-direction: column;
    margin-top: 2rem;

    @media screen and (min-width: 880px) {
      flex-direction: row;
    }

    div {
      &:first-child {
        margin-right: 2rem;
      }
    }
  }

  .btn-left {
    margin-right: 1rem;
  }
`;

const Profile = ({
  match,
  getProfileById,
  auth,
  profile: { profile, loading },
  getOwnedGames,
  game: { games },
}) => {
  useEffect(() => {
    getProfileById(match.params.id);
    getOwnedGames(match.params.id);
  }, [getProfileById, match.params.id, getOwnedGames]);

  return (
    <>
      {profile === null || loading ? (
        <Spinner />
      ) : (
        <ProfileStyles>
          <ProfileTop profile={profile} />
          <div className='profile-info'>
            <ProfileGames className='profile-games' games={games} />
            <ProfileAbout profile={profile} />
          </div>
          <PlainButton className='btn-left'>
            <Link to='/profiles/'>Back To Profiles</Link>
          </PlainButton>
          {auth.isAuthenticated &&
            auth.loading === false &&
            auth.user._id === profile.user._id && (
              <PlainButton>
                <Link to='/edit-profile'>Edit Profile</Link>
              </PlainButton>
            )}
        </ProfileStyles>
      )}
    </>
  );
};

Profile.propTypes = {
  getProfileById: PropTypes.func.isRequired,
  profile: PropTypes.object.isRequired,
  auth: PropTypes.object.isRequired,
  game: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  profile: state.profile,
  auth: state.auth,
  game: state.game,
});

export default connect(mapStateToProps, { getProfileById, getOwnedGames })(
  Profile
);
