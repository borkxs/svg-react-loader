'use strict';

var React = require('react');
var helpers = require('../helpers')(require('react-dom'));

module.exports = React.createClass({

    displayName: "Text",

    getDefaultProps: function getDefaultProps() {
        return { "0": "{", "1": "\"", "2": "f", "3": "o", "4": "o", "5": "\"", "6": ":", "7": " ", "8": "\"", "9": "b", "10": "a", "11": "r", "12": "\"", "13": "}" };
    },
    componentDidMount: function componentDidMount() {
        helpers.applyXmlAttributes(this);
    },
    render: function render() {
        var props = this.props;
        var children = props.children;

        return React.createElement(
            'foo',
            this.props,
            React.createElement(
                'g',
                null,
                React.createElement(
                    'title',
                    null,
                    'The Title'
                ),
                React.createElement(
                    'text',
                    { x: '20', y: '20' },
                    'Text'
                )
            ),
            React.Children.map(children, function (c) {
                return c;
            })
        );
    }
});