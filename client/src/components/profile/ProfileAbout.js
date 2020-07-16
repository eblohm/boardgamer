import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const AboutStyles = styled.div`
  h2 {
    margin-bottom: 0.5rem;
  }

  .interests {
    margin-top: 1rem;
  }
`;

const ProfileAbout = ({
  profile: {
    bio,
    gameInterests,
    user: { name },
  },
}) => (
  <AboutStyles>
    {bio && (
      <>
        <h2>{name.trim().split(' ')[0]}'s Bio</h2>
        <p>{bio}</p>
      </>
    )}
    <div className='interests'>
      <h2>Game Interests</h2>
      <div>
        {gameInterests.map((interest, index) => (
          <div key={index}>
            <i className='fas fa-check'></i> {interest}
          </div>
        ))}
      </div>
    </div>
  </AboutStyles>
);

ProfileAbout.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileAbout;
