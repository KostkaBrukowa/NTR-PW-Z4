import React, { Fragment } from 'react';

import { Navbar } from './organizms/Navbar/Navbar';
import { MainContainer } from './atoms/MainContainer';
import { Home } from './Pages/Home/Home';
import { Note } from './Pages/Note/Note';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import AppContext from './data/state/GlobalStateContext';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#0037DB'
    },
    secondary: {
      main: '#322C49'
    }
  }
});

const App: React.FC = () => {
  return (
    <Fragment>
      <AppContext>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <MainContainer />
            <Navbar />
            <Container maxWidth={'md'}>
              <Router>
                <Home path="/" />
                <Note path="/note/:noteId" />
              </Router>
            </Container>
          </ThemeProvider>
        </StylesProvider>
      </AppContext>
    </Fragment>
  );
};

export default App;
