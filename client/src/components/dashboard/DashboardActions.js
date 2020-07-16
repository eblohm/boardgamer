import React from 'react';
import { Link } from 'react-router-dom';
import { PlainButton } from '../styles/Buttons';

const DashboardActions = () => {
  return (
    <PlainButton>
      <Link to='/edit-profile'>
        <i className='fas fa-user-circle text-primary'></i> Edit Profile
      </Link>
    </PlainButton>
  );
};

export default DashboardActions;
