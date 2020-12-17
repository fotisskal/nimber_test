/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React, {Fragment} from 'react';
import {StyleSheet, View, Dimensions, BackHandler} from 'react-native';

import {Home, Quiz, Results, ErrorWindow} from './src/views';

import {Manager} from './src/app/manager';
import 'regenerator-runtime/runtime';
Manager.registerView('quiz', Quiz);
Manager.registerView('results', Results);
Manager.registerView('error_window', ErrorWindow);
Manager.registerView('home', Home);

class App extends React.Component {
  state = Manager.getAppState();

  constructor() {
    super();
    Manager.setStateChangeCallback((new_state) => {
      this.handleStageChange(new_state);
    });

    BackHandler.addEventListener('hardwareBackPress', function () {
      Manager.navigateBack();
      return true;
    });

    this.handleStageChange = this.handleStageChange.bind(this);
  }

  componentDidMount() {
    Manager.navigateTo('home');
  }

  handleStageChange(new_state) {
    this.setState(new_state);
  }

  render() {
    let CurrentView = this.state.currentView
        ? this.state.currentView
        : Fragment;
    return (
        <View style={styles.background}>
          <CurrentView {...(this.state.props ? this.state.props : {})} />
          {this.state.error ? (
              <View style={styles.error_window}>
                <ErrorWindow error={this.state.error} />
              </View>
          ) : null}
        </View>
    );
  }
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    display: 'flex',
    flexDirection: 'column',
  },
  error_window: {
    top: 0,
    left: 0,
    position: 'absolute',
    display: 'flex',
    flex: 1,
    flexDirection: 'column',
    width: Dimensions.get('window').width,
    height: Dimensions.get('window').height,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 100,
  },
});

export default App;
