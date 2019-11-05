import React from 'react';

import {
  BrowserRouter,
  Switch,
  Route,
} from 'react-router-dom';
import Chat from './Home';
import PageNotFound from './errors/pageNotFound';

export default class App extends React.Component<{}, {}> {
  render(): React.ReactNode {
    return (
        <BrowserRouter>
          <Switch>
            <Route exact path="/">
              <Chat />
            </Route>
            <Route path="/*">
              <PageNotFound />
            </Route>
          </Switch>
        </BrowserRouter>
    );
  }
}
