import React from 'react';
import MomentUtils from '@date-io/moment';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider as StoreProvider } from 'react-redux';
import { ThemeProvider } from '@material-ui/styles';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import { renderRoutes } from 'react-router-config';
import {
  ScrollReset,
  GoogleAnalytics,
  CookiesNotification
} from './components';

import theme from './theme';
import routes from './routes';


import  configureStore  from './store/store';


const store = configureStore();

function App() {
  return (
    <StoreProvider store={store}>
      <ThemeProvider theme={theme}>
        <MuiPickersUtilsProvider utils={MomentUtils}>
          <Router>
            <ScrollReset />
            <GoogleAnalytics />
            <CookiesNotification />
            {renderRoutes(routes)}
          </Router>
        </MuiPickersUtilsProvider>
      </ThemeProvider>
    </StoreProvider>
  );
}

export default App;
