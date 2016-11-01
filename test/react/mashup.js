'use strict';

var React = require('react');
var helpers = require('../../helpers')(require('react'));

module.exports = React.createClass({

    displayName: "Mashup",

    getDefaultProps: function getDefaultProps() {
        return { "version": "1.1", "id": "Layer_1", "xmlns": "http://www.w3.org/2000/svg", "data-svgreactloader": "[[\"http://www.w3.org/2000/svg\",\"xlink\",\"http://www.w3.org/1999/xlink\"],[\"http://www.w3.org/2000/svg\",\"space\",\"preserve\"]]", "x": "0px", "y": "0px", "viewBox": "0 0 16 16", "enableBackground": "new 0 0 16 16", "json": 5, "data": { "a": 1 } };
    },
    componentDidMount: function componentDidMount() {
        helpers.applyXmlAttributes(this);
    },
    render: function render() {
        var props = this.props;
        var children = props.children;

        return React.createElement(
            'svg',
            this.props,
            React.createElement(
                'symbol',
                { id: 'ffg-sw-advantage' },
                React.createElement(
                    'g',
                    null,
                    React.createElement('path', { d: 'M8,6.2c0.7,0,1.3-0.6,1.3-1.3c0-0.7-0.6-1.3-1.3-1.3c-0.7,0-1.3,0.6-1.3,1.3C6.7,5.6,7.3,6.2,8,6.2' }),
                    React.createElement('path', { d: 'M14.7,7.2C13.9,8.5,13,8.7,13,8.7c-0.1,0-0.2,0-0.2-0.1c0-0.1-0.1-0.2,0-0.2c0.1-0.3,0.3-0.5,0.5-0.8 C13.7,7,13.8,5.9,13.5,5c-0.4-1.4-1.7-2-3-2.4h-0.1c2.7,1.7,0,4.3,0,4.3c2.1,3.5-1.8,5.7-2.4,6H7.9c-0.6-0.3-4.5-2.5-2.4-6 c0,0-2.8-2.6,0-4.3H5.4C4.2,3,2.9,3.6,2.5,5c-0.3,1-0.2,2,0.3,2.6c0.2,0.3,0.4,0.5,0.5,0.8c0,0.1,0,0.2,0,0.2 c0,0.1-0.1,0.1-0.2,0.1c0,0-0.9-0.2-1.7-1.5c0,0.1,0,0.3,0,0.4c0,0.1,0,0.2,0,0.2C1.6,10.1,4,10.7,4,10.7c0.1,0,0.2,0.1,0.1,0.3 c0,0.1-0.7,0.4-1.3,0.1c0.3,0.3,1.2,1.1,2.3,1.6c1.2,0.5,2.7,0.8,2.8,0.6l0,0H8l0,0c0.1,0.2,1.6-0.1,2.8-0.6c1.2-0.5,2-1.3,2.3-1.6 c-0.6,0.2-1.3,0-1.3-0.1c0-0.1,0-0.2,0.1-0.3c0,0,2.4-0.7,2.7-2.9c0,0,0-0.1,0-0.2C14.7,7.5,14.7,7.4,14.7,7.2' })
                )
            ),
            React.createElement(
                'symbol',
                { id: 'ffg-sw-triumph' },
                React.createElement('path', { d: 'M10.1,11.7l-1.3-1.7l2.9-0.2C11.4,10.6,10.8,11.3,10.1,11.7 M8.2,12.4v-1.4l0-0.1l1.5,1.1C9.3,12.2,8.8,12.3,8.2,12.4 M3.4,8c0-2.3,1.8-4.2,4-4.4l-0.2,5L4,7.8l2.6,1.8l-1.2,1.7l1.7-0.9l0.1,0.3l0,0.3v1.4C5.1,12.1,3.4,10.3,3.4,8 M12.1,8 c0,0.5-0.1,1-0.2,1.4L8.9,9l1.7-2.4L8.3,8.3L8.1,3.7C10.3,3.8,12.1,5.7,12.1,8 M12.4,9.6c0.2-0.5,0.2-1,0.2-1.5c0-2.6-2-4.7-4.6-4.9 L8,1H7.5L7.4,3.1C4.8,3.3,2.8,5.4,2.8,8c0,2.5,1.9,4.6,4.4,4.9v1l1-0.3v-0.7c0.7-0.1,1.4-0.3,2-0.6l0.6,0.5l-0.4-0.6 c0.9-0.6,1.6-1.4,2-2.4l0.9-0.1L12.4,9.6z' })
            ),
            React.createElement('use', { width: '100px', height: '100px', 'data-svgreactloader': '[["http://www.w3.org/1999/xlink","href","#ffg-sw-triumph"]]' }),
            React.Children.map(children, function (c) {
                return c;
            })
        );
    }
});