'use strict';

var React = require('react');
var helpers = require('../helpers')(require('react-dom'));

module.exports = React.createClass({

    displayName: "Styles",

    getDefaultProps: function getDefaultProps() {
        return { "0": "{", "1": "\"", "2": "f", "3": "o", "4": "o", "5": "\"", "6": ":", "7": " ", "8": "\"", "9": "b", "10": "a", "11": "r", "12": "\"", "13": "}", "version": "1.1", "id": "Layer_1", "xmlns": "http://www.w3.org/2000/svg", "data-svgreactloader": "[[\"http://www.w3.org/2000/svg\",\"xlink\",\"http://www.w3.org/1999/xlink\"],[null,\"style\",\"enable-background:new 0 0 50 50;\"],[\"http://www.w3.org/2000/svg\",\"space\",\"preserve\"]]", "width": "50px", "height": "50px", "x": "0px", "y": "0px", "viewBox": "0 0 50 50", "preserveAspectRatio": "none" };
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
                'style',
                { type: 'text/css' },
                '\n .st0{fill-rule:evenodd;clip-rule:evenodd;fill:#B2B2B2;}\n .foo {\n    background: url(\'foo/bar/baz.jpg\');\n }\n'
            ),
            React.createElement(
                'style',
                null,
                '\n    .bar {\n        background: url(\'foo/fux.jpg\');\n    }\n'
            ),
            React.createElement(
                'g',
                null,
                React.createElement(
                    'g',
                    null,
                    React.createElement(
                        'style',
                        null,
                        '\n            .baz {\n                background: url(\'foo/fux.jpg\');\n            }\n        '
                    ),
                    React.createElement('path', { className: 'st0', d: 'M14.5,18v2h21v-2H14.5z M14.5,26h21v-2h-21V26z M14.5,32h21v-2h-21V32z' })
                )
            ),
            React.Children.map(children, function (c) {
                return c;
            })
        );
    }
});