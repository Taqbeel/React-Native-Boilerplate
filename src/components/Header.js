import React from "react";
import { View, TouchableOpacity, Text, StyleSheet, } from 'react-native';
import * as colors from '../styles/colors';
import { scale } from "../utils/scale";
import { PLATFORM_IOS, isIPhoneX, SCREEN_WIDTH, } from "../constants";
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';
import { userLogout } from '../redux/actions';
import { connect } from "react-redux";

class Header extends React.Component {
  render() {
    const { title, goBack, noLogout, navigation, } = this.props;
    const { container, titleTxt } = styles;
    return (

      <View style={{  paddingTop: PLATFORM_IOS ? isIPhoneX ? scale(3) : scale(10) : scale(30), backgroundColor: colors.PRIMARY }}>
        <View style={container}>

          {
            goBack && <TouchableOpacity activeOpacity={0.8} onPress={() => { navigation.goBack() }}>
              <FontAwesome5 name="arrow-left" size={15} color={colors.WHITE} style={{ marginRight: scale(15) }} />
            </TouchableOpacity>
          }

          {
            title && <Text style={titleTxt}>
              {title.toUpperCase()}
            </Text>
          }

          {!noLogout &&
            <TouchableOpacity activeOpacity={0.8} onPress={() => { this.props.userLogout() }}>
              <FontAwesome5 name="sign-out-alt" size={15} color={colors.RED} />
            </TouchableOpacity>
          }
          
        </View>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 10,
    paddingTop: 0,
    paddingHorizontal: scale(30),
    flexDirection: 'row',
    alignItems: 'center',
    width: SCREEN_WIDTH,
    height: scale(30),
  },
  titleTxt: {
    flex: 1,
    fontSize: scale(16),
    paddingVertical: scale(5),
    color: colors.WHITE,
  }
})

const mapStateToProps = state => {
  return {
    user: state.user.loggedUser
  };
};

export default connect(mapStateToProps, { userLogout })(Header);
