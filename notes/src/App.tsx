import React, { Fragment } from 'react';

import { Navbar } from './organizms/Navbar/Navbar';
import { MainContainer } from './atoms/MainContainer';
import { Home } from './Pages/Home/Home';
import { Note } from './Pages/Note/Note';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import { createMuiTheme, ThemeProvider } from '@material-ui/core/styles';
import { green, purple } from '@material-ui/core/colors';
import AppContext from './data/state/GlobalStateContext';

const theme = createMuiTheme({
  palette: {
    primary: purple,
    secondary: green
  }
});

const App: React.FC = () => {
  return (
    <Fragment>
      <AppContext>
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
      </AppContext>
    </Fragment>
  );
};

export default App;
