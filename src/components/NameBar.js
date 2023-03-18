import React from "react";
import { Text, View, } from 'react-native';
import * as colors from '../styles/colors';
import { scale } from "../utils/scale";

class NameBar extends React.Component {
  render() {
    const { name } = this.props;
    return (
      <View  style={{ marginHorizontal: scale(20), marginVertical: scale(10), padding: scale(10), backgroundColor: colors.PRIMARY }}>
        <Text style={{ color: colors.WHITE, fontSize: scale(14), fontWeight: 'bold' }} >{name.toUpperCase()}</Text>
      </View>
    )
  }
}



export default NameBar;