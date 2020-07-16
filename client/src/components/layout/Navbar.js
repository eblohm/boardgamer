import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { logout } from '../../actions/auth';

const NavStyles = styled.nav`
  align-items: center;
  background-color: ${(props) => props.theme.blue};
  border-bottom: 3px solid ${(props) => props.theme.green};
  display: flex;
  justify-content: space-between;
  padding: 1rem 1.5rem;

  a {
    color: #ffffff;
    text-decoration: none;

    &:hover {
      color: ${(props) => props.theme.green};
    }
  }

  h1 {
    font-size: 1.5rem;
  }

  ul {
    display: flex;
    list-style-type: none;

    li {
      &:not(:last-child) {
        margin-right: 1rem;
      }
    }
  }
`;

const Navbar = ({ logout, auth: { isAuthenticated, loading } }) => {
  const authLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Other Players</Link>
      </li>
      <li>
        <Link to='/games'>Games</Link>
      </li>
      <li>
        <Link to='/posts'>Posts</Link>
      </li>
      <li>
        <Link to='/dashboard'>
          <i className='fas fa-user'></i>{' '}
          <span className='hide-sm'>Dashboard</span>
        </Link>
      </li>
      <li>
        <a onClick={logout} href='#!'>
          <i className='fas fa-sign-out-alt'></i>{' '}
          <span className='hide-sm'>Logout</span>
        </a>
      </li>
    </ul>
  );

  const guestLinks = (
    <ul>
      <li>
        <Link to='/profiles'>Players</Link>
      </li>
      <li>
        <Link to='/register'>Register</Link>
      </li>
      <li>
        <Link to='/login'>Login</Link>
      </li>
    </ul>
  );

  return (
    <NavStyles>
      <h1>
        <Link to='/'>
          <i class='fas fa-dice'></i> BoardGamer
        </Link>
      </h1>
      {!loading && <>{isAuthenticated ? authLinks : guestLinks}</>}
    </NavStyles>
  );
};

Navbar.propTypes = {
  logout: PropTypes.func.isRequired,
  auth: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => ({
  auth: state.auth,
});

export default connect(mapStateToProps, { logout })(Navbar);
