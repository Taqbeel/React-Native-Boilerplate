import React, { Component } from 'react';
import { View, } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import * as colors from '../styles/colors';
import { connect } from 'react-redux';
import { userRegister } from '../redux/actions';
import { scale } from '../utils/scale'
import { ButtonBox, Header, TextBox } from '../components';
import FontAwesome5Icon from 'react-native-vector-icons/FontAwesome5';
import { SCREEN_HEIGHT, showAlertMessage } from '../constants';


class SignupScreen extends Component {

    state = {
        name: '',
        email: '',
        username: '',
        password: '',
        confirmPassword: '',
        showPassword: true,
    }

    componentDidMount() {

        // signup credentials for dev
        if (__DEV__) {
            this.setState({
                name: 'Taqbeel',
                email: 'qwe@qwe.qw',
                username: '12345678912',
                password: '12345678',
                confirmPassword: '12345678',
                showPassword: true,
            });
        }
    }

    _signupButtonTapped = async () => {

        // Email validation regex
        const emailReg = new RegExp(
            /^(("[\w-\s]+")|([\w-]+(?:\.[\w-]+)*)|("[\w-\s]+")([\w-]+(?:\.[\w-]+)*))(@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$)|(@\[?((25[0-5]\.|2[0-4][0-9]\.|1[0-9]{2}\.|[0-9]{1,2}\.))((25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\.){2}(25[0-5]|2[0-4][0-9]|1[0-9]{2}|[0-9]{1,2})\]?$)/i,
        );

        // Password validation regex
        const passReg = new RegExp(
            /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/
        );
        
        if (this.state.name == '') {
            showAlertMessage('Alert', 'Enter Name');
            return;
        } else if (this.state.email == '' || !emailReg.test(this.state.email)) {
            showAlertMessage('Alert', 'Enter Valid Email');
            return;
        } else if (this.state.username == '' || this.state.username.length < 4) {
            showAlertMessage('Alert', 'Invalid username');
            return;
        } else if (this.state.password == '' || !passReg.test(this.state.password)) {
            showAlertMessage('Alert', ' Password must contain at least a symbol, upper and lower case letters and a number');
            return;
        } else if (this.state.password !== this.state.confirmPassword) {
            showAlertMessage('Alert', 'Password did not match');
            return;
        }

        let user = {
            name: this.state.name,
            username: this.state.username,
            email: this.state.email,
            password: this.state.password,
        }

        // passing user to redux to persist if valid created successfully
        let response = await this.props.userRegister(user, this.props.users);

        if (response.status) {
            this.props.navigation.navigate('HomeScreen')
        }

    };


    render() {
        const { name, email, username, showPassword, password, confirmPassword } = this.state;
        const { navigation } = this.props;

        return (
            <>
                <Header
                    navigation={navigation}
                    goBack
                    noLogout
                />

                <View style={{ flex: 1, backgroundColor: colors.PRIMARY }} >

                    <KeyboardAwareScrollView
                        keyboardShouldPersistTaps='handled'
                        showsVerticalScrollIndicator={false}
                        contentContainerStyle={{ height: SCREEN_HEIGHT - scale(100), paddingHorizontal: scale(30), justifyContent: 'center', }}
                    >

                        <View style={styles.textInputStyle}>
                            <TextBox placeholder="Name" value={name} onChangeText={name => this.setState({ name })} />
                        </View>

                        <View style={styles.textInputStyle}>
                            <TextBox placeholder="Username" value={username} onChangeText={username => this.setState({ username })} />
                        </View>

                        <View style={styles.textInputStyle}>
                            <TextBox placeholder="Email" value={email} onChangeText={email => this.setState({ email })} />
                        </View>

                        <View style={styles.textInputStyle}>
                            <TextBox placeholder="Password" value={password} secureTextEntry={showPassword} onChangeText={password => this.setState({ password })} />
                            <FontAwesome5Icon name={showPassword ? "eye" : "eye-slash"} size={20} color={colors.SECONDARY} onPress={() => this.setState({ showPassword: !showPassword })} />
                        </View>

                        <View style={styles.textInputStyle}>
                            <TextBox placeholder="Confirm Password" value={confirmPassword} secureTextEntry={showPassword} onChangeText={confirmPassword => this.setState({ confirmPassword })} />
                            <FontAwesome5Icon name={showPassword ? "eye" : "eye-slash"} size={20} color={colors.SECONDARY} onPress={() => this.setState({ showPassword: !showPassword })} />
                        </View>

                        <ButtonBox title='Sign Up' onPress={() => this._signupButtonTapped()} />

                    </KeyboardAwareScrollView>
                </View>
            </>
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
    }
}


const mapStateToProps = state => {
    return {
        users: state.user.users,
    };
};

export default connect(mapStateToProps, { userRegister })(SignupScreen);