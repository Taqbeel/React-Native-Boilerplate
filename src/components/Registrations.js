import React, { Component } from 'react';
import { FlatList, } from 'react-native';
import RegistrationsHolder from './RegistrationsHolder';
import { scale } from "../utils/scale";

class Registrations extends Component {

  renderItems = ({ item, index }) => {
    return (
      <RegistrationsHolder
        navigation={this.props.navigation}
        item={item}
        index={index}
        sortBy={this.props.sortBy}
      />
    );
  };

  render() {
    let { items } = this.props;

    return (
      <FlatList
        style={{ marginHorizontal: scale(20) }}
        contentContainerStyle={{paddingBottom: scale(100)}}
        data={items}
        renderItem={this.renderItems}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
        numColumns={3}
      />

    );
  }
}

export default Registrations;