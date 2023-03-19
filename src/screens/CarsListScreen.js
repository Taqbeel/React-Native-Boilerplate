import React from 'react';
import { ScrollView, Text, View, Image, TouchableOpacity, Linking, StyleSheet, } from 'react-native';
import _, { sortBy } from 'lodash';
import { connect } from 'react-redux';
import { deleteCar } from '../redux/actions';
import { Header, NameBar, CarsCard } from '../components';
import * as colors from '../styles/colors';




class HomeScreen extends React.Component {

  state = {
    cars: [],
    allCars: [],
    title: 'title',
  };

  componentDidMount() {
    this.loadData();
  }

  loadData = () => {
    let title = this.props.route.params.title;
    let cars = this.props.route.params.item;
    let allCars = this.props.cars;
    this.setState({ title, cars, allCars })
  }

  _onDelete = async (id, index) => {

    // delete car from current list
    let cars = [...this.state.cars];
    cars.splice(index, 1);

    // delete car from redux state and persist new data
    await this.props.deleteCar(this.props.cars, id);

    // go back if cars list is empty
    if(cars.length == 0){
      this.props.navigation.goBack();
    }

    this.setState({ cars: cars, });

  }

  render() {

    const { navigation } = this.props;
    const { title, cars } = this.state;

    return (
      <View style={styles.container}>
        <Header
          navigation={navigation}
          title={title}
          goBack
        />

        <NameBar name={`Registed Cars - ${cars.length}`} />

        <CarsCard items={cars} navigation={navigation} onDelete={(id, index) => this._onDelete(id, index)} />

      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.WHITE
  },
});

const mapStateToProps = state => {
  return {
    user: state.user.loggedUser,
    cars: state.user.cars,
  };
};

export default connect(mapStateToProps, { deleteCar })(HomeScreen);