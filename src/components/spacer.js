import React from 'react';

import {View, StyleSheet} from 'react-native';

import {Manager} from '../app/manager';
let sw = Manager.scaleW;
let sh = Manager.scaleH;

const styles = StyleSheet.create({
  spacer: {
    height: sh(10),
    width: sw(10),
  },
});

class Spacer extends React.Component {
  render() {
    return (
      <View
        style={Object.assign(
          {},
          styles.spacer,
          {height: sh(this.props.height), width: sw(this.props.width)},
          this.props.style,
        )}
      />
    );
  }
}

export default Spacer;
