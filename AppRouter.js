import React, { Component } from 'react';
import { TouchableOpacity, Image, Platform, Dimensions } from 'react-native';
import {
  ActionConst,
  Actions,
  Stack,
  Scene,
  Router
} from 'react-native-router-flux';
import Home from './Home';
import RepoList from './RepoList';

class AppRouter extends Component {


  render() {
    return (
      <Router>
        <Stack
          key="root">
          <Scene
            hideNavBar
            key="home"
            component={Home}
            initial
          />
          <Scene
            hideNavBar
            key="repolist"
            component={RepoList}
          />
        </Stack>
      </Router>
    );
  }
}

export default AppRouter;