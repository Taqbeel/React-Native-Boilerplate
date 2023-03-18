import React, { Component } from 'react';
import { TouchableOpacity, Text } from 'react-native';
import * as colors from '../styles/colors';
import { scale } from '../utils/scale';

class ButtonBox extends Component {

    render() {
        let { title, onPress, customStyle } = this.props;

        return (

            <TouchableOpacity activeOpacity={0.8} onPress={() => onPress()}
                style={[styles.btn, customStyle]} >
                <Text style={[styles.btnTxt]}>{title}</Text>
            </TouchableOpacity>

        );
    }
}

const styles = {
    btn: {
        elevation: 3,
        backgroundColor: colors.SECONDARY,
        justifyContent: 'center',
        alignItems: 'center',
        marginTop: scale(25),
        padding: scale(20),
        borderRadius: scale(10)
    },
    btnTxt: {
        color: colors.WHITE,
        fontSize: scale(16),
        fontWeight: 'bold'
    },
}

export default ButtonBox;