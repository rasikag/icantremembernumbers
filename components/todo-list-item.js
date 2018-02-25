'use strict';

import React from 'react';

import {
    Platform,
    Text,
    TextInput,
    TouchableWithoutFeedback,
    View,
} from 'react-native';

import realm from './realm';
import styles from './styles';

const iOS = (Platform.OS == 'ios');

export default class TodoListItem extends React.Component {
    constructor(props) {
        super(props);

        this._onChangeText = this._onChangeText.bind(this);
    }

    get done() {
        let items = this.props.item.items;
        if (items) {
            return items.length > 0 && items.every((item) => item.done);
        }
        else {
            return this.props.item.done;
        }
    }

    get text() {
        return this.props.item.name;
    }

    set text(text) {
        this.props.item.name = text;
    }

    componentDidMount() {
        // The autoFocus prop on TextInput was not working for us :(
        this._focusInputIfNecessary();
    }

    componentDidUpdate() {
        this._focusInputIfNecessary();
    }

    render() {
        return (
            <View style={styles.listItem}>
                {this.renderLeftSide()}
                {this.renderText()}
                {this.renderRightSide()}
            </View>
        );
    }

    renderLeftSide() {
        return (
            <View style={styles.listItemLeftSide}>
                <Text>{this.done ? '✓' : '⁃'}</Text>
            </View>
        );
    }

    renderRightSide() {
        // Only show the delete button while not editing the text.
        return this.props.editing ? null : this.renderDelete();
    }

    renderText(extraStyle) {
        if (this.props.editing) {
            return (
                <TextInput
                    ref="input"
                    value={this.text}
                    placeholder="Todo…"
                    style={[styles.listItemInput, extraStyle]}
                    onChangeText={this._onChangeText}
                    onEndEditing={this.props.onEndEditing}
                    enablesReturnKeyAutomatically={true} />
            );
        } else {
            return (
                <Text
                    style={[styles.listItemText, extraStyle]}
                    onPress={this.props.onPress}
                    suppressHighlighting={true}>
                    {this.text}
                </Text>
            );
        }
    }

    renderDelete() {
        return (
            <TouchableWithoutFeedback onPress={this.props.onPressDelete}>
                <View style={styles.listItemDelete}>
                    <Text>{iOS ? '𐄂' : '×'}</Text>
                </View>
            </TouchableWithoutFeedback>
        );
    }

    _onChangeText(text) {
        realm.write(() => {
            this.text = text;
        });

        this.forceUpdate();
    }

    _focusInputIfNecessary() {
        if (!this.props.editing) {
            return;
        }

        let input = this.refs.input;
        if (!input.isFocused()) {
            input.focus();
        }
    }
}