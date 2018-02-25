'use strict';

import React from 'react';

import {
    Platform,
    StatusBar,
    Text,
    TouchableOpacity,
    View,
} from 'react-native';

import TodoItem from './todo-item';
import TodoListView from './todo-listview';
import TodoItemsView from './todo-itemsview';
import TodoListItem from './todo-list-item';
import realm from './realm';
import styles from './styles';

import { StackNavigator } from 'react-navigation';

export default class ItemsScreen extends React.Component {
    static navigationOptions = {
        title: 'Current list',
    };

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentWillMount() {
        if (Platform.OS == 'ios') {
            StatusBar.setBarStyle('light-content');
        }
    }

    render() {
    
        let properties = {
        }

        return <TodoItemsView items={this.props.navigation.state.params.items} {...properties} />;
    }
}