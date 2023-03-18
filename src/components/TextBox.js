import React, { Component } from 'react';
import { TextInput, Keyboard } from 'react-native';
import * as colors from '../styles/colors';

class TextBox extends Component {

    render() {
        let { placeholder, value, onChangeText, secureTextEntry } = this.props;

        return (

            <TextInput
                style={[{ flex: 1, color: colors.BLACK, fontWeight: 'bold', paddingVertical: 0, }]}
                placeholder={placeholder}
                placeholderTextColor={colors.PLACE_HOLDER_COLOR}
                keyboardType='default'
                value={value}
                secureTextEntry={secureTextEntry}
                onChangeText={val => onChangeText(val)}
                onEndEditing={() => Keyboard.dismiss()}
                autoCorrect={true}
            />

        );
    }
}

export default TextBox;