import React from 'react';
import ReactDOM from 'react-dom';
import 'fontsource-roboto';
import "./styles/index.scss";
import "./styles/custom.scss";
import './index.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import { ThemeProvider } from 'styled-components';
import { MuiThemeProvider, StylesProvider } from '@material-ui/core/styles';
import { Provider } from 'react-redux';
import App from './App';
import theme from './config/theme';
import store from './config/store';
import * as serviceWorker from './config/serviceWorker';
import { CosmosProvider } from "@use-web3wallet/cosmos";
import { XummProvider } from "xumm-react";

const kplrConfig = {
  "Keplr": {
    // supportedChainIds: ["cosmoshub-4", "juno-1", "osmosis-1"]
    supportedChainIds: ["cosmoshub-4"]
  }
};

const xummConfig = {
  url: 'https://xumm.app/api/v1/',
  getToken: () => "91089b94-e296-4540-858a-cf109c9a03a3"
};


ReactDOM.render(
  <React.StrictMode>
    <StylesProvider injectFirst>
      <MuiThemeProvider theme={theme}>
        <ThemeProvider theme={theme}>
          <Provider store={store}>
            <CssBaseline />
            {/* <XummProvider config={xummConfig}> */}
              <CosmosProvider walletOptions={kplrConfig}>
                <App />
              </CosmosProvider>
            {/* </XummProvider> */}
          </Provider>
        </ThemeProvider>
      </MuiThemeProvider>
    </StylesProvider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();