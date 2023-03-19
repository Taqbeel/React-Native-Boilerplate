import React from 'react';
import { View, StyleSheet } from 'react-native';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';
import { connect } from 'react-redux';
import { addEditCar, deleteCar } from '../redux/actions';
import * as colors from '../styles/colors';
import { ButtonBox, Header, TextBox } from '../components';
import { scale } from '../utils/scale';
import { showAlertMessage } from '../constants';

class AddEditCarScreen extends React.Component {

  state = {
    edit: false,
    name: '',
    miles: '',
    cylinders: '',
    dispacement: '',
    horsepower: '',
    weight: '',
    acceleration: '',
    year: '',
    origin: '',
    cars: []
  }

  componentDidMount() {

        // Add car data for dev
    if (__DEV__) {
      this.setState({
        name: 'Suzuki',
        miles: '12312313',
        cylinders: '1222',
        dispacement: '12314',
        horsepower: '124',
        weight: '1234',
        acceleration: 'qqweqwr',
        year: '2002',
        origin: 'Pak',
        id: 0,
      })
    }
    this._loadData();
  }

  _loadData = () => {
    this.setState({ cars: this.props.cars })
    
    // get data of car from previous screen if in edit mode
    if (this.props.route.params?.edit) {
      this.setState({
        edit: true,
        name: this.props.route.params?.item.Name,
        miles: this.props.route.params?.item.Miles_per_Gallon.toString(),
        cylinders: this.props.route.params?.item.Cylinders.toString(),
        dispacement: this.props.route.params?.item.Displacement.toString(),
        horsepower: this.props.route.params?.item.Horsepower.toString(),
        weight: this.props.route.params?.item.Weight_in_lbs.toString(),
        acceleration: this.props.route.params?.item.Acceleration.toString(),
        year: this.props.route.params?.item.Year,
        origin: this.props.route.params?.item.Origin,
        id: this.props.route.params?.item.id,
      })
    }
  }

  _addEditCar = async () => {

    if (this.state.name == '') {
      showAlertMessage('Alert', 'Name Is Required');
      return;
    } else if (this.state.year == '') {
      showAlertMessage('Alert', 'Year Is Required')
      return;
    } else if (this.state.origin == '') {
      showAlertMessage('Alert', 'Origin Is Required')
      return;
    }


    //if in edit mode delete the current car than modify to update in redux list
    if (this.state.edit) {
      await this.props.deleteCar(this.props.cars, this.state.id);
    }


    // Home screen sorting is based on Name which requires at least 1 
    // white space and Year which requires at leat 1 "-" therefore 
    // adding or editing a car needs a whitespace in name and a "-" 
    //in year so it doesn't crash the app  

    const name = this.state.name.indexOf(' ');
    const year = this.state.year.indexOf('-');

    let newCar = {
      Name: this.state.name + `${name > -1? '' : ' '}`,
      Miles_per_Gallon: this.state.miles,
      Cylinders: this.state.cylinders,
      Displacement: this.state.dispacement,
      Horsepower: this.state.horsepower,
      Weight_in_lbs: this.state.weight,
      Acceleration: this.state.acceleration,
      Year: this.state.year + `${year > -1? '' : '-'}`,
      Origin: this.state.origin,
      id: this.state.cars.length + 1
    }

    let cars = [...this.props.cars, newCar];

    // add or edit a car and persist in redux
    let response = await this.props.addEditCar(cars);
    if (response.status) {
      this.props.navigation.goBack();
    }

  }


  render() {

    const { navigation } = this.props;
    const { edit, name, miles, cylinders, dispacement, horsepower, weight, acceleration, year, origin } = this.state;

    return (

      <View style={{ flex: 1 }}>

        <Header
          navigation={navigation}
          title='Edit Car'
          goBack
        />

        <KeyboardAwareScrollView
          keyboardShouldPersistTaps='handled'
          showsVerticalScrollIndicator={false}
        >

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Name" value={name} onChangeText={name => this.setState({ name })} />
          </View>

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Miles" value={miles} onChangeText={miles => this.setState({ miles })} />
          </View>

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Cylinders" value={cylinders} onChangeText={cylinders => this.setState({ cylinders })} />
          </View>

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Dispacement" value={dispacement} onChangeText={dispacement => this.setState({ dispacement })} />
          </View>

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Horsepower" value={horsepower} onChangeText={horsepower => this.setState({ horsepower })} />
          </View>

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Weight" value={weight} onChangeText={weight => this.setState({ weight })} />
          </View>

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Acceleration" value={acceleration} onChangeText={acceleration => this.setState({ acceleration })} />
          </View>

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Year" value={year} onChangeText={year => this.setState({ year })} />
          </View>

          <View style={styles.textInputStyle}>
            <TextBox placeholder="Origin" value={origin} onChangeText={origin => this.setState({ origin })} />
          </View>

          <ButtonBox customStyle={{ marginHorizontal: scale(20) }} title={edit ? 'Edit' : 'Add'} onPress={() => this._addEditCar()} />

        </KeyboardAwareScrollView>

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  textInputStyle: {
    elevation: 3,
    backgroundColor: colors.BACKGROUND,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: scale(15),
    marginHorizontal: scale(20),
    padding: scale(15),
    paddingHorizontal: scale(20),
    paddingVertical: scale(15),
    borderRadius: scale(10)
  },
});

const mapStateToProps = state => {
  return {
    user: state.user.loggedUser,
    cars: state.user.cars,
  };
};

export default connect(mapStateToProps, { addEditCar, deleteCar })(AddEditCarScreen);