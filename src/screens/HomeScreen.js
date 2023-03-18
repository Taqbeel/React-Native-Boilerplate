import React from 'react';
import { Text, View, StyleSheet, } from 'react-native';
import _, { sortBy } from 'lodash';
import { connect } from 'react-redux';
import { ButtonBox, Header, NameBar, Registrations } from '../components';
import * as colors from '../styles/colors';
import { scale } from '../utils/scale';
import { SelectList } from 'react-native-dropdown-select-list'


class HomeScreen extends React.Component {

  state = {
    cars: [],
    sortBy: '',
    selected: 0,
    dropdown_props: [
      { value: 'Name', key: 0 },
      { value: 'Year', key: 1 },
      { value: 'Origin', key: 2 },
    ],
    value: 0,
    radio_props: [
      { label: 'Name', value: 0 },
      { label: 'Year', value: 1 },
      { label: 'Origin', value: 2 },
    ]
  };

  componentDidMount() {
    this.loadData(0);
  }

  componentDidUpdate(prevProps, prevState) {
    if (prevProps.cars != this.props.cars) {
      this.loadData(0);
    }
  }

  loadData = async (by) => {

    console.log('by-->>>', by)
    await this.setState({ cars: [], value: 0 });
    let cars;
    if (by == 0) {
      cars = _.groupBy(this.props.cars, event => event.Name.substring(0, event.Name.indexOf(' ')));
      this.setState({ sortBy: 'Name' });
    } else if (by == 1) {
      cars = _.groupBy(this.props.cars, event => event.Year.substring(0, event.Year.indexOf('-')));
      this.setState({ sortBy: 'Year' });
    } else if (by == 2) {
      cars = _.groupBy(this.props.cars, event => event.Origin);
      this.setState({ sortBy: 'Origin' });
    } else {
      cars = [];
      this.setState({ sortBy: '' });
    }
    cars = Object.values(cars)
    this.setState({ cars });
  }

  render() {

    const { navigation, user } = this.props;
    const { cars, sortBy, selected, dropdown_props, value, radio_props } = this.state;

    return (
      <View style={styles.container}>
        <Header
          navigation={navigation}
          title={user?.name || 'User'}
        />

        <NameBar name={`Registered By ${sortBy} - ${cars.length}`} />

        <View style={{ marginHorizontal: scale(20) }}>
          <Text style={{ color: colors.PRIMARY, fontWeight: 'bold', fontSize: scale(16), }}>Sort By:</Text>

          <SelectList
            setSelected={(selected) => this.setState({ selected }, () => this.loadData(selected))}
            data={dropdown_props}
            save="key"
            placeholder='Name'
            boxStyles={{ marginTop: scale(10) }}

          />
        </View>
        <Registrations navigation={navigation} items={cars} sortBy={sortBy} />


        <ButtonBox customStyle={{
          marginHorizontal: scale(20),
          position: 'absolute',
          right: 0,
          left: 0,
          bottom: scale(10)
        }}
          title='Register A New Car' onPress={() => navigation.navigate('AddEditCarScreen')} />

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

export default connect(mapStateToProps, {})(HomeScreen);