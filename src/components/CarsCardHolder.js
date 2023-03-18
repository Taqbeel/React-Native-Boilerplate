import React, { PureComponent } from 'react';
import { View, Text } from 'react-native';
import * as colors from '../styles/colors';
import { scale } from "../utils/scale";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

class CarsCardHolder extends PureComponent {

  render() {

    const { ItemHolderStyle, itemTxtView, rowView, titleTxt } = this.styles;
    const { navigation, item, index, onDelete } = this.props;
    const { id, Name, Miles_per_Gallon, Cylinders, Displacement, Horsepower, Weight_in_lbs, Acceleration, Year, Origin, } = item;

    return (

      <View style={ItemHolderStyle}>

        <View style={[itemTxtView, { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', borderTopRightRadius: scale(15), borderTopLeftRadius: scale(15), backgroundColor: colors.PRIMARY }]}>

          <Text style={{ color: colors.WHITE, fontWeight: 'bold', fontSize: scale(16), }}>{Name}</Text>
          <View style={{ flexDirection: 'row', alignItems: 'center', }}>
            <FontAwesome5 name='edit' size={15} color={colors.GREEN} style={{ marginRight: scale(10) }} onPress={() => { navigation.navigate('AddEditCarScreen', { edit: true, item }) }} />
            <FontAwesome5 name='trash' size={15} color={colors.RED} onPress={() => onDelete(id, index)} />
          </View>
        </View>

        <View style={[itemTxtView, { borderBottomRightRadius: scale(15), borderBottomLeftRadius: scale(15), backgroundColor: colors.BACKGROUND }]}>

          <View style={rowView}>
            <Text style={titleTxt}>Miles:</Text>
            <Text style={{ color: colors.PRIMARY, }}>{Miles_per_Gallon}</Text>
          </View>

          <View style={rowView}>
            <Text style={titleTxt}>Cylinders:</Text>
            <Text style={{ color: colors.PRIMARY, }}>{Cylinders}</Text>
          </View>

          <View style={rowView}>
            <Text style={titleTxt}>Displacement:</Text>
            <Text style={{ color: colors.PRIMARY, }}>{Displacement}</Text>
          </View>

          <View style={rowView}>
            <Text style={titleTxt}>Horsepower:</Text>
            <Text style={{ color: colors.PRIMARY, }}>{Horsepower}</Text>
          </View>

          <View style={rowView}>
            <Text style={titleTxt}>Weight (lbs):</Text>
            <Text style={{ color: colors.PRIMARY, }}>{Weight_in_lbs}</Text>
          </View>

          <View style={rowView}>
            <Text style={titleTxt}>Acceleration:</Text>
            <Text style={{ color: colors.PRIMARY, }}>{Acceleration}</Text>
          </View>

          <View style={rowView}>
            <Text style={titleTxt}>Year: </Text>
            <Text style={{ color: colors.PRIMARY, }}>{Year}</Text>
          </View>

          <View style={rowView}>
            <Text style={titleTxt}>Origin:</Text>
            <Text style={{ color: colors.PRIMARY, }}>{Origin}</Text>
          </View>
        </View>

      </View>
    );
  }


  styles = {
    ItemHolderStyle: {
      flex: 1,
      // height: SCREEN_WIDTH / 5,
      marginTop: scale(15),
      marginRight: scale(9),
    },
    itemTxtView: {
      flex: 1,
      // alignItems: 'center',
      justifyContent: 'center',
      paddingVertical: scale(10),
      paddingHorizontal: scale(30)
    },
    rowView: {
      width: '100%',
      flexDirection: 'row',
      alignItems: 'center',
      justifyContent: 'space-between',
      marginTop: scale(5)
    },
    titleTxt: {
      color: colors.PRIMARY,
      fontWeight: 'bold'
    }
  };
}

export default CarsCardHolder;
