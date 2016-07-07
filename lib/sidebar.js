import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native';
import Title from './title';

export default class SideBar extends Component {

  static propTypes = {
    items: PropTypes.arrayOf(PropTypes.shape({
      item: PropTypes.string.isRequired,
      subItems: PropTypes.arrayOf(PropTypes.string)
    })).isRequired,
    onSelection: PropTypes.func
  };

  state = {
    selected: null
  };

  componentWillMount() {
    this.handleSelection(this.props.items[0]);
  }

  getSelectedSubItems() {
    let selectedItem = this.props.items.filter(i => i.item === this.state.selected.item)[0];
    return selectedItem.subItems || [];
  }

  setSelected(value) {
    this.setState({ selected: value }, () => {
      if (this.props.onSelection) {
        this.props.onSelection(value);
      }
    });
  }

  handleSelection(value) {
    this.setSelected({
      item: value.item,
      sub: value.subItems && value.subItems[0]
    });
  }

  handleSubSelection(value) {
    this.setSelected({
      item: this.state.selected.item,
      sub: value
    });
  }

  renderSubItems() {
    let { selected } = this.state;
    let subItems = this.getSelectedSubItems();
    return subItems.map(name => {
      let isSelected = selected.sub === name;
      let subItemStyle = isSelected ? styles.selectedSubItem : {};
      return (
        <TouchableOpacity
          key={ name }
          onPress={ ()=> this.handleSubSelection(name) }
          style={ [ styles.item, styles.subItem, subItemStyle ] }
        >
          <Text style={ [ styles.itemLabel, styles.selectedItemLabel ] }>{ name }</Text>
        </TouchableOpacity>
      );
    })
  }

  renderItems() {
    let { selected } = this.state;
    return this.props.items.map(i => {
      let isSelected = i.item === selected.item;
      let itemStyle = isSelected ? styles.selected : {};
      let subItems = isSelected  ? this.renderSubItems() : null;
      let itemLabelStyle = isSelected ? styles.selectedItemLabel : {};
      return (
        <View key={ i.item }>
          <TouchableOpacity
            onPress={ ()=> this.handleSelection(i) }
            style={ [ styles.item, itemStyle ] }
          >
            <Text style={ [ styles.itemLabel, itemLabelStyle ] }>{ i.item }</Text>
          </TouchableOpacity>
          { subItems }
        </View>
      );
    });
  }

  render() {
    let items = this.renderItems();
    return (
      <View style={ styles.container }>
        <Title>Components</Title>
        { items }
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'black',
    borderRightWidth: 1,
    borderRightColor: 'white'
  },
  item: {
    alignSelf: 'stretch',
    borderBottomWidth: 1,
    borderBottomColor: 'grey',
    padding: 15
  },
  itemLabel: {
    color: 'grey'
  },
  selected: {
    backgroundColor: '#344141',
    borderLeftWidth: 0,
    borderLeftColor: '#343C3C',
  },
  selectedItemLabel: {
    color: 'white'
  },
  subItem: {
    paddingLeft: 20,
    backgroundColor: '#344141'
  },
  selectedSubItem: {
    borderLeftWidth: 5,
    backgroundColor: '#344141',
    borderLeftColor: '#3B7171'
  }
});
