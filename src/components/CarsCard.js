import React, { Component } from 'react';
import { FlatList, } from 'react-native';
import CarsCardHolder from './CarsCardHolder';
import { scale } from "../utils/scale";

class CarsCard extends Component {

  renderItems = ({ item, index }) => {
    return (
      <CarsCardHolder
        navigation={this.props.navigation}
        item={item}
        index={index}
        onDelete={(id)=>this.props.onDelete(id, index)}
      />
    );
  };

  render() {
    let { items } = this.props;

    return (
      <FlatList
        style={{ marginHorizontal: scale(20) }}
        data={items}
        renderItem={this.renderItems}
        keyExtractor={item => item.id}
        showsVerticalScrollIndicator={false}
      />

    );
  }
}

export default CarsCard;