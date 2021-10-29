// Dependencies
import React from 'react';
import ReactDOM from 'react-dom';
import { HashRouter as Router } from "react-router-dom";
import { createStore } from "redux";
import { Provider } from 'react-redux';

// APP
import App from './App';

// Reducers
import reducers from "./redux/reducers/index";

// Theming
import * as themes from './themes/schema.json';
import { setToLS } from './utils/storage';




const store = createStore(
  reducers,
  window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);






const Index = () => {
  setToLS('all-themes', themes.default);
  return (
    <Provider store={store}>
      <Router>
        <App />
      </Router>
    </Provider>
  )
}


ReactDOM.render(
  <Index />,
  document.getElementById('root')
);
