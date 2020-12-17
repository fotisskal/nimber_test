import React from 'react';

import {TouchableOpacity, View, Text} from 'react-native';

class ButtonsTile extends React.Component {
  render() {
    return (
      <View style={{flexDirection: 'row', justifyContent: 'space-between'}}>
        <TouchableOpacity
          style={this.props.styleTrue}
          onPress={() => {
            this.props.onPress(this.props.valueA);
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            {this.props.valueA}
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={this.props.styleFalse}
          onPress={() => {
            this.props.onPress(this.props.valueB);
          }}>
          <Text
            style={{
              color: 'white',
              textAlign: 'center',
              textAlignVertical: 'center',
            }}>
            {this.props.valueB}
          </Text>
        </TouchableOpacity>
      </View>
    );
  }
}

export default ButtonsTile;
