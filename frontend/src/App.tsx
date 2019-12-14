import React, { Fragment, ReactNode } from 'react';
import { animated, useSpring } from 'react-spring';

import { Navbar } from './organizms/Navbar/Navbar';
import { MainContainer } from './atoms/MainContainer';
import { Home } from './Pages/Home/Home';
import { Note } from './Pages/Note/Note';
import { Router, Location, WindowLocation } from '@reach/router';
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

const AnimatedHome = animated(Home);
const AnimatedNote = animated(Note);

interface LocationRouterProps {
  location: WindowLocation;
}

const LocationRouter: React.FC<LocationRouterProps> = ({ location }) => {
  const homeProps = useSpring({
    opacity: location.pathname === '/' ? 1 : 0
  });
  const noteProps = useSpring({
    opacity: location.pathname === '/' ? 0 : 1
  });

  return (
    <Router location={location}>
      <AnimatedHome path="/" style={homeProps} />
      <AnimatedNote path="/note/:noteId" style={noteProps} />
    </Router>
  );
};

const App: React.FC = () => {
  return (
    <Fragment>
      <AppContext>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <MainContainer />
            <Navbar />
            <Container maxWidth={'md'}>
              <Location>{({ location }): ReactNode => <LocationRouter location={location} />}</Location>
            </Container>
          </ThemeProvider>
        </StylesProvider>
      </AppContext>
    </Fragment>
  );
};

export default App;
