import React from 'react';

import {View} from 'react-native';

class Separator extends React.Component {
  render() {
    return this.props.horizontal ? (
      <View
        style={Object.assign(
          {},
          {
            width: this.props.size,
            height: this.props.weight ? this.props.weight : 1,
            backgroundColor: this.props.color ? this.props.color : 'black',
          },
          this.props.style,
        )}
      />
    ) : (
      <View
        style={Object.assign(
          {},
          {
            height: this.props.size,
            width: this.props.weight ? this.props.weight : 1,
            backgroundColor: this.props.color ? this.props.color : 'black',
          },
          this.props.style,
        )}
      />
    );
  }
}

export default Separator;
