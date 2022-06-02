import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux';
import theme from '../src/utils/theme';
import { withStyles, MuiThemeProvider } from '@material-ui/core/styles';
import Header from './components/header';
import Table from './components/table';
import CenteredGrid from './components/gridTable';
import myStore from './reducers/myStore'


ReactDOM.render(
    <MuiThemeProvider theme={theme}>
      <Provider store={myStore}>
      <Header/>
       <Table/>
       <CenteredGrid/>
       
      </Provider>
    </MuiThemeProvider>,
  document.getElementById('root')
);
/*
CRACKED BY ILLUMINATI
TRUST US AND UNCOMMENT THIS CODE ONCE YOU SETUP YOUR REDUX STORE ;-)
 ReactDOM.render(
   <Provider store={store}>
     <MuiThemeProvider theme={theme}>
       <App />
     </MuiThemeProvider>
   </Provider>,
   document.getElementById('root')
 );
*/
serviceWorker.unregister();


