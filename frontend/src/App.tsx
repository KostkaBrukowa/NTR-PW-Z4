import React, { Fragment, ReactNode, useState } from 'react';
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
  const flipped = location.pathname !== '/';
  const { transform, opacity } = useSpring({
    opacity: flipped ? 1 : 0,
    transform: `perspective(1000px) rotateY(${flipped ? 180 : 0}deg)`,
    config: { mass: 5, tension: 500, friction: 80 }
  });
  return (
    <div>
      <AnimatedHome
        style={{
          opacity: opacity.interpolate(o => (o && typeof o === 'number' ? 1 - o : 1)),
          transform,
          zIndex: flipped ? 0 : 1,
          position: 'relative'
        }}
      />
      <AnimatedNote
        style={{
          opacity,
          transform: transform.interpolate(t => `translateY(-60%) ${t} rotateY(180deg)`),
          zIndex: flipped ? 1 : 0,
          position: 'relative'
        }}
      />
    </div>
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
