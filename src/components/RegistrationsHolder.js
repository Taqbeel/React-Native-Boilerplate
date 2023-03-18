import React, { PureComponent } from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import * as colors from '../styles/colors';
import { scale } from "../utils/scale";
import {  SCREEN_WIDTH } from '../constants/index';

class RegistrationsHolder extends PureComponent {

  state = {
    imageLoading: false,
    imageLoadingFinished: false,
  }

  render() {

    const { ItemHolderStyle, itemTxtView, } = this.styles;
    const { navigation, item, sortBy } = this.props;
    const { Name, Year, Origin, } = item[0];

    const length = this.props.item?.length;

    const name = Name?.substring(0, Name?.indexOf(' '));
    const year = Year?.substring(0, Year?.indexOf('-'));

    const title = sortBy == 'Name' ? name : sortBy == 'Year' ? year : sortBy == 'Origin' ? Origin : ''

    return (

      <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.navigate('CarsListScreen', { title, item,  }) }}
        style={ItemHolderStyle}>

        <View style={[itemTxtView, { borderTopRightRadius: scale(15), borderTopLeftRadius: scale(15), backgroundColor: colors.SECONDARY }]}>
          <Text style={{ color: colors.WHITE, fontWeight: 'bold', fontSize: scale(16), }}>{title}</Text>
        </View>

        <View style={[itemTxtView, { borderBottomRightRadius: scale(15), borderBottomLeftRadius: scale(15), backgroundColor: colors.BACKGROUND }]}>
          <Text style={{ color: colors.PRIMARY, fontWeight: 'bold' }}>Cars: {length}</Text>
        </View>

      </TouchableOpacity>
    );
  }


  styles = {
    ItemHolderStyle: {
      width: SCREEN_WIDTH / 3.5,
      height: SCREEN_WIDTH / 5,
      marginTop: scale(15),
      marginRight: scale(9),
    },
    itemTxtView: {
      flex: 1,
      alignItems: 'center',
      justifyContent: 'center',
    },
  };
}

export default RegistrationsHolder;
