import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from "react-router-dom";
import Login from "./Login";
import PageNotFound from "./errors/pageNotFound";

export default class App extends React.Component<{}, {}> {
  render() {
    return (
        <BrowserRouter>
          <div className="App">
            <Switch>
              <Route path="/login">
                <Login />
              </Route>
              <Route path="/*">
                <PageNotFound />
              </Route>
            </Switch>
          </div>
        </BrowserRouter>
    );
  }
}
