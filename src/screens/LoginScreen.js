import React, { Component } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { userLogin } from '../redux/actions';
import * as colors from '../styles/colors';
import { TextBox, ButtonBox } from '../components';
import { SCREEN_HEIGHT, showAlertMessage, } from '../constants';
import { scale } from '../utils/scale'
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';

class LoginScreen extends Component {

    state = {
        username: '',
        password: '',
        showPassword: true,
    }

    async componentDidMount() {

        // login credentials for dev
        if (__DEV__) {
            this.setState({
                username: 'taqbeel',
                password: 'taqbeel'
            });
        }
    }

    _loginButtonTapped = async () => {

        if (this.state.username == '') {
            showAlertMessage('Alert', 'Please Enter Username');
            return;
        } else if (this.state.password == '') {
            showAlertMessage('Alert', 'Please Enter Password');
            return;
        }

        // passing user to redux to persist if valid user
        let response = await this.props.userLogin(this.state.username.toLowerCase(), this.state.password, this.props.users);
        if (response.status) {
            this.props.navigation.navigate('HomeScreen')
        }
    }

    render() {
        const { username, showPassword, password } = this.state;

        return (

            <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: scale(30), backgroundColor: colors.PRIMARY }} >

{/*KeyboardAwareScrollView to automatically adjust view when keyboard is open  */}
                <KeyboardAwareScrollView
                    keyboardShouldPersistTaps='handled'
                    showsVerticalScrollIndicator={false}
                    contentContainerStyle={{ height: SCREEN_HEIGHT, justifyContent: 'center', marginTop: scale(40) }}
                >


                    <View style={styles.textInputStyle}>
                        <TextBox placeholder="Username" value={username} onChangeText={username => this.setState({ username })} />
                    </View>

                    <View style={styles.textInputStyle}>
                        <TextBox placeholder="Password" value={password} secureTextEntry={showPassword} onChangeText={password => this.setState({ password })} />
                        <FontAwesome5Icon name={showPassword ? "eye" : "eye-slash"} size={20} color={colors.SECONDARY} onPress={() => this.setState({ showPassword: !showPassword })} />
                    </View>

                    <ButtonBox title='Login' onPress={() => this._loginButtonTapped()} />

                    <TouchableOpacity activeOpacity={0.8} onPress={() => { this.props.navigation.navigate('SignupScreen') }}>
                        <Text style={styles.signUpTxt}>Don't Have An Account?
                            <Text style={[{ fontWeight: 'bold' }]}> Sign Up</Text>
                        </Text>
                    </TouchableOpacity>

                </KeyboardAwareScrollView>
            </View>
        )
    }
}

const styles = {
    textInputStyle: {
        elevation: 3,
        backgroundColor: colors.BACKGROUND,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        marginTop: scale(15),
        padding: scale(15),
        paddingHorizontal: scale(20),
        paddingVertical: scale(15),
        borderRadius: scale(10)
    },
    signUpTxt: {
        marginTop: scale(50),
        textAlign: 'center',
        color: colors.WHITE,
        fontSize: scale(14)
    }
}

const mapStateToProps = state => {
    return {
        users: state.user.users,
    };
};

export default connect(mapStateToProps, { userLogin })(LoginScreen);