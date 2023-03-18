import React, { PureComponent } from 'react';
import { ActivityIndicator } from 'react-native';
import * as colors from '../styles/colors';

class Loader extends PureComponent {
  render() {
    return (
        <ActivityIndicator
          size={this.props.size || 'small'}
          style={[{ padding: 1 }, this.props.style]}
          color={this.props.color||colors.PRIMARY}
        />
    );
  }
}

export default Loader;
