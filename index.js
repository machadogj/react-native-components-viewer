import React, { Component, PropTypes } from 'react';
import {
  StyleSheet,
  Text,
  View
} from 'react-native';

import Title from './lib/title';
import SideBar from './lib/sidebar';
import LayoutTester from 'react-native-layout-tester';

export default class ComponentsViewer extends Component {

  static propTypes = {
    // components
    layoutTesterConfig: PropTypes.shape(LayoutTester.propTypes),
    specs: PropTypes.arrayOf(PropTypes.shape({
      type: PropTypes.func.isRequired,
      props: PropTypes.arrayOf(PropTypes.object),
    })).isRequired
  };

  constructor(props) {
    super(props);
  }

  state = {
    selected: null
  }

  handleSelectedItem(value) {
    let { item, sub } = value;
    let component = this.props.specs.filter(c => c.type.name === item)[0];
    if (!component) throw new Error('invalid selected component');
    let selected = {
      type: component.type,
      props: (component.props || []).filter(p => p.name === sub)[0]
    };
    this.setState({ selected });
  }

  renderMenu() {
    let { specs } = this.props;
    if (!specs) {
      return null;
    }
    let menuItems = specs.map(c => {
      return {
        item: c.type.name,
        subItems: (c.props || []).map(p => p.name)
      };
    });
    return (
      <SideBar
        items={ menuItems }
        onSelection={ (item) => this.handleSelectedItem(item) }
      />
    );
  }

  renderEmptyComponent() {
    return (
      <View style={ styles.emptyContainer }>
        <Text>Select a component first</Text>
      </View>
    );
  }

  renderBody() {
    let { specs } = this.props;
    if (!specs) {
      return <Text>You need to configure your specs first!</Text>;
    }
    else {
      let { selected } = this.state;
      if (!selected) {
        return this.renderEmptyComponent();
      }
      let { type: ComponentType, props } = this.state.selected;
      return (
        <View style={ styles.body }>
          <Title>{ ComponentType.name }</Title>
          <LayoutTester { ...this.props.layoutTesterConfig }>
            <ComponentType { ...props } />
          </LayoutTester>
        </View>
      );
    }
  }

  render() {
    return (
      <View style={ [ styles.container ] }>
        <View style={ styles.menuContainer }>
          { this.renderMenu() }
        </View>
        <View style={ styles.bodyContainer }>
          { this.renderBody() }
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    flex: 1
  },
  menuContainer: {
    flex: 0.25
  },
  bodyContainer: {
    flex: 0.75
  },
  body: {
    flex: 1
  },
  emptyContainer: {
    flex: 0.75,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#6BA3A3'
  }
});
