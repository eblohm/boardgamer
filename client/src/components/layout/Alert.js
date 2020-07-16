import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import styled from 'styled-components';

const AlertStyles = styled.div`
  .alert {
    padding: 0.8rem;
    margin: 1rem 0;
    opacity: 0.9;
    background: ${(props) => props.theme.gray};
    color: ${(props) => props.theme.white};
  }

  .alert-danger {
    background-color: ${(props) => props.theme.red};
    color: ${(props) => props.theme.white};
  }

  .alert-success {
    background-color: ${(props) => props.theme.green};
    color: ${(props) => props.theme.white};
  }
`;

const Alert = ({ alerts }) =>
  alerts !== null &&
  alerts.length > 0 &&
  alerts.map((alert) => (
    <AlertStyles>
      <div key={alert.id} className={`alert alert-${alert.alertType}`}>
        {alert.msg}
      </div>
    </AlertStyles>
  ));

Alert.propTypes = {
  alerts: PropTypes.array.isRequired,
};

const mapStateToProps = (state) => ({
  alerts: state.alert,
});

export default connect(mapStateToProps)(Alert);
