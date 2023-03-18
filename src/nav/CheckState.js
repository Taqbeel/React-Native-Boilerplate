import React, { Component } from 'react'
import { SafeAreaView } from 'react-native';
import { connect } from "react-redux";
import { Loader } from '../components';
import * as colors from '../styles/colors';
import SplashScreen from 'react-native-splash-screen';

class CheckState extends Component {

    state = {
        render: 0
    }
    _loadApp = () => {
        if (this.props.user) {
            this.props.navigation.navigate('HomeScreen');
        } else {
            this.props.navigation.navigate('LoginScreen');
        }
        setTimeout(function () {
            SplashScreen.hide();
        }, 2000);
        return;
    }

    componentDidMount() {
        // this._navListener = this.props.navigation.addListener('focus', async () => {
            //  this._loadApp()
        // });
        this.setState({ render: 1 })
    }

    rerenderer = () => this.setState({ render: 2 })

    render() {
        if (this.state.render == 1) {
            this.rerenderer()
        }
        if (this.state.render == 2) {
            this._loadApp()
        }
        return (
            <SafeAreaView style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <Loader color={colors.PRIMARY} />
            </SafeAreaView>
        );
    }
}


const mapStateToProps = state => {
    return {
        user: state.user.loggedUser,
    };
};

export default connect(mapStateToProps, {})(CheckState);
