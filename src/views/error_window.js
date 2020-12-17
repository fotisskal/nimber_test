import React from 'react';

import {Spacer} from '../components';

import {Manager} from '../app/manager';

let sw = Manager.scaleW;

import {Text, View, StyleSheet, TouchableWithoutFeedback} from 'react-native';

const styles = StyleSheet.create({
  window: {
    width: sw(75),
    alignItems: 'center',
    justifyContent: 'center',
    flexGrow: 1,
    alignSelf: 'center',
  },
  modal: {
    backgroundColor: 'white',
    width: sw(75),
    alignItems: 'center',
    padding: 25,
    borderRadius: 5,
  },
  button: {
    backgroundColor: '#014e8c',
    borderRadius: 1,
    width: 120,
    textAlign: 'center',
    padding: 5,
    color: 'white',
  },
});

class ErrorWindow extends React.Component {
  render() {
    console.log(this.props);
    return (
      <View style={styles.window}>
        <View style={styles.modal}>
          <Text>{this.props.error ? this.props.error.message : 'Error'}</Text>
          <Spacer height={5} />
          <TouchableWithoutFeedback onPress={() => Manager.closeError()}>
            <Text style={styles.button}>OK</Text>
          </TouchableWithoutFeedback>
        </View>
      </View>
    );
  }
}

export default ErrorWindow;
