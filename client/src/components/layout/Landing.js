import React from 'react';
import { Link, Redirect } from 'react-router-dom';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';
import { GreenButton, BlueButton } from '../styles/Buttons';
import bgBg from '../../img/bg-bg.jpg';

const LandingStyles = styled.section`
  background-image: url(${bgBg});
  background-position: left center;
  height: calc(100vh - 64px);
  position: relative;

  .overlay {
    background-color: rgba(0, 0, 0, 0.7);
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
  }

  .inner {
    color: #fff;
    height: 100%;
    width: 80%;
    margin: auto;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    text-align: center;
  }

  .buttons {
    margin-top: 1rem;

    .left-btn {
      margin-right: 1rem;
    }
  }
`;

const Landing = ({ isAuthenticated }) => {
  if (isAuthenticated) {
    return <Redirect to='/dashboard' />;
  }
  return (
    <LandingStyles>
      <div className='overlay'>
        <div className='inner'>
          <h1>BoardGamer</h1>
          <p>
            Create a board gamer profile, share posts and add games to your
            collection
          </p>
          <div className='buttons'>
            <GreenButton className='left-btn'>
              <Link to='/register'>Sign Up</Link>
            </GreenButton>
            <BlueButton>
              <Link to='/login'>Login</Link>
            </BlueButton>
          </div>
        </div>
      </div>
    </LandingStyles>
  );
};

Landing.propTypes = {
  isAuthenticated: PropTypes.bool,
};

const mapStateToProps = (state) => ({
  isAuthenticated: state.auth.isAuthenticated,
});

export default connect(mapStateToProps)(Landing);
