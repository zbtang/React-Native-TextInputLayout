/**
 * Created by tangzhibin on 16/8/4.
 */

'use strict';
import React, {Component} from 'react';
import {StyleSheet, View, Animated} from 'react-native';
export default class TextInputLayout extends Component {
    static propTypes = {
        ...View.propTypes
    };
    static defaultProps = {
        verticalTransBy: 25,
        fontSizeScaleBy: 3
    };

    constructor(props) {
        super(props);
        this._onBlur = this._onBlur.bind(this);
        this._onFocus = this._onFocus.bind(this);
        this._onChangeText = this._onChangeText.bind(this);

        this._oriEdtStyle = StyleSheet.flatten([React.Children.only(props.children).props.style])
        this.state = {
            showLabel: false,
            labelTransY: new Animated.Value(this._oriEdtStyle.height),
            labelFontSize: new Animated.Value(this._oriEdtStyle.fontSize)
        };

    }

    componentWillMount() {
        this._handleChildren(this.props);
    }

    componentDidMount() {
    }

    componentWillReceiveProps(nextProps) {
        this._handleChildren(nextProps);
    }


    componentWillUpdate(nextProps, nextState) {
        if (nextState.showLabel !== this.state.showLabel) {
            let currentTrans = this.state.labelTransY._value;
            let toValue = nextState.showLabel ? currentTrans - this.props.verticalTransBy : currentTrans + this.props.verticalTransBy;
            Animated.spring(this.state.labelTransY, {
                toValue: toValue,
                friction: 9
            }).start();

            let currentFontSize = this.state.labelFontSize._value;
            let toFontSize = nextState.showLabel ? currentFontSize - this.props.fontSizeScaleBy : currentFontSize + this.props.fontSizeScaleBy;
            // Animated.spring(this.state.labelFontSize, {
            //     toValue: toFontSize,
            //     friction: 9
            // }).start();
        }
    }

    /**
     * font, size, color, gravity, hintColor
     * @param props
     * @private
     */
    _handleChildren(props) {
        let edtChild = React.Children.only(props.children);
        this._oriEdtChild = edtChild;
        this._oriOnFocus = edtChild.props.onFocus;
        this._oriOnBlur = edtChild.props.onBlur;
        this._oriOnChangeText = edtChild.props.onChangeText;
        this._edtChild = React.cloneElement(edtChild, {
            onFocus: this._onFocus,
            onBlur: this._onBlur,
            onChangeText: this._onChangeText,
            placeholder: null,
            style: [edtChild.props.style, {backgroundColor: 'transparent'}]
        });
    }

    _onFocus() {
        !this._edtText && this.setState({showLabel: true});
        this._oriOnFocus && this._oriOnFocus();
    }

    _onBlur() {
        !this._edtText && this.setState({showLabel: false});
        this._oriOnBlur && this._oriOnBlur();
    }

    _onChangeText(text) {
        this._edtText = text;
        this._oriOnChangeText && this._oriOnChangeText(text);
    }

    render() {
        let {height, fontSize}= StyleSheet.flatten([this._oriEdtChild.props.style]);
        return (
            <View style={styles.inputContainer}>
                <Animated.Text
                    style={[{
                        fontSize: this.state.labelFontSize,
                        marginVertical: (height - fontSize) / 2
                    }, {transform: [{translateY: this.state.labelTransY}]}]}>
                    {this._oriEdtChild.props.placeholder }
                </Animated.Text>
                {this._edtChild}
            </View>
        );
    }
}
const styles = StyleSheet.create({
    inputContainer: {
        borderBottomWidth: StyleSheet.hairlineWidth * 2,
        borderBottomColor: 'blue',
        marginHorizontal: 30
    }
});