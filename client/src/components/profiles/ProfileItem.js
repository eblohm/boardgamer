import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { BlueButton } from '../styles/Buttons';

const ProfileItemStyles = styled.div`
  align-items: center;
  border: 1px solid ${(props) => props.theme.purple};
  border-radius: 2px;
  display: flex;
  flex-direction: column;
  margin-bottom: 1.5rem;
  padding: 1rem;

  @media screen and (min-width: 770px) {
    align-items: initial;
    flex-direction: row;
  }

  img {
    margin-right: 2rem;
  }

  .profile-about {
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    width: 100%;

    @media screen and (min-width: 500px) {
      flex-direction: row;
    }

    ul {
      list-style-type: none;
    }
  }
`;

const ProfileItem = ({
  profile: {
    user: { _id, name, avatar },
    bio,
    location,
    gameInterests,
  },
}) => {
  return (
    <ProfileItemStyles>
      <img src={avatar} alt='' />
      <div className='profile-about'>
        <div>
          <h2>{name}</h2>
          <p>{bio}</p>
          <p>{location && <span>{location}</span>}</p>
          <BlueButton>
            <Link to={`/profile/${_id}`}>View Profile</Link>
          </BlueButton>
        </div>
        <ul>
          {gameInterests.slice(0, 4).map((interest, index) => (
            <li key={index}>
              <i className='fas fa-check'></i> {interest}
            </li>
          ))}
        </ul>
      </div>
    </ProfileItemStyles>
  );
};

ProfileItem.propTypes = {
  profile: PropTypes.object.isRequired,
};

export default ProfileItem;
