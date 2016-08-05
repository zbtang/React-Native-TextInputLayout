/**
 * Created by tangzhibin on 16/8/4.
 */

'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, TextInput, Text, StatusBar} from 'react-native';
import TextInputLayout from './TextInputLayout';

export default class TextInputLayoutDemo extends Component {
    static propTypes = {
        ...View.propTypes
    };
    static defaultProps = {};

    render() {
        return (
            <View style={styles.container}>
                <TextInputLayout >
                    <TextInput
                        style={styles.textInput}
                        placeholder={'请输入邮箱'}
                    />
                </TextInputLayout>
                <TextInputLayout >
                    <TextInput
                        style={styles.textInput}
                        placeholder={'请输入密码'}
                    />
                </TextInputLayout>
            </View>
        );
    }
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingTop: 100
    },
    textInput: {
        fontSize: 16,
        height: 40,
    },
});