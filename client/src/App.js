import React, { useEffect } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import { createGlobalStyle, ThemeProvider } from 'styled-components';
import Navbar from './components/layout/Navbar';
import Landing from './components/layout/Landing';
import Routes from './components/routing/Routes';

import { loadUser } from './actions/auth';
import setAuthToken from './utils/setAuthToken';

// Redux
import { Provider } from 'react-redux';
import store from './store';

if (localStorage.token) {
  setAuthToken(localStorage.token);
}

const GlobalStyle = createGlobalStyle`
  *,
  *::before,
  *::after {
    box-sizing: inherit;
    margin: 0;
    padding: 0;
  }

  body {
    box-sizing: border-box;
    font-family: 'Raleway', sans-serif;
  }

  h1 {
    color: ${(props) => props.theme.green};
    font-size: 3rem;
  }

  @media (max-width: 700px) {
    .hide-sm {
      display: none;
    }
  }

  .auth-action {
    color: ${(props) => props.theme.blue};
  }
`;

const theme = {
  blue: '#2c4770',
  green: '#6ca299',
  purple: '#867db0',
  red: '#c62828',
  gray: '#cfd8dc',
  white: '#ffffff',
  black: '#000000',
};

const App = () => {
  useEffect(() => {
    store.dispatch(loadUser());
    // eslint-disable-next-line
  }, []);

  return (
    <Provider store={store}>
      <ThemeProvider theme={theme}>
        <GlobalStyle />
        <Router>
          <>
            <Navbar />
            <Switch>
              <Route exact path='/' component={Landing} />
              <Route component={Routes} />
            </Switch>
          </>
        </Router>
      </ThemeProvider>
    </Provider>
  );
};

export default App;
