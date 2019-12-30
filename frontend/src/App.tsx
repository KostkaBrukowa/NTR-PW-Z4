import React from 'react';

import { Navbar } from './organizms/Navbar/Navbar';
import { MainContainer } from './atoms/MainContainer';
import { Home } from './Pages/Home/Home';
import { Note } from './Pages/Note/Note';
import { Router } from '@reach/router';
import { Container } from '@material-ui/core';
import { createMuiTheme, StylesProvider, ThemeProvider } from '@material-ui/core/styles';
import AppContext from './data/state/GlobalStateContext';
import { ApolloProvider } from '@apollo/react-common';
import { NetworkErrorDialog } from './molecules/Dialog/NetworkErrorDialog/NetworkErrorDialog';
import ApolloClient from 'apollo-boost';

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

const client = new ApolloClient({
  uri: '/graphql',
  onError({ graphQLErrors }) {
    console.log('graphQLErrors: ', graphQLErrors);
  }
});

const App: React.FC = () => {
  return (
    <ApolloProvider client={client}>
      <AppContext>
        <StylesProvider injectFirst>
          <ThemeProvider theme={theme}>
            <MainContainer />
            <NetworkErrorDialog />
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
    </ApolloProvider>
  );
};

export default App;
