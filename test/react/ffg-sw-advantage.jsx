var React = require('react');
var helpers = require('../helpers')(require('react-dom'));

module.exports = React.createClass({

    displayName: "FfgSwAdvantage",

    getDefaultProps () {
        return {"0":"{","1":"\"","2":"f","3":"o","4":"o","5":"\"","6":":","7":" ","8":"\"","9":"b","10":"a","11":"r","12":"\"","13":"}","version":"1.1","id":"Layer_1","xmlns":"http://www.w3.org/2000/svg","data-svgreactloader":"[[\"http://www.w3.org/2000/svg\",\"xlink\",\"http://www.w3.org/1999/xlink\"],[\"http://www.w3.org/2000/svg\",\"space\",\"preserve\"]]","x":"0px","y":"0px","viewBox":"0 0 16 16","enableBackground":"new 0 0 16 16"};
    },

    componentDidMount () {
        helpers.applyXmlAttributes(this);
    },

    render () {
        var props = this.props;
        var children = props.children;

        return (
            <foo {...this.props}>
                  <g>
    <path d="M8,6.2c0.7,0,1.3-0.6,1.3-1.3c0-0.7-0.6-1.3-1.3-1.3c-0.7,0-1.3,0.6-1.3,1.3C6.7,5.6,7.3,6.2,8,6.2"/>
    <path d="M14.7,7.2C13.9,8.5,13,8.7,13,8.7c-0.1,0-0.2,0-0.2-0.1c0-0.1-0.1-0.2,0-0.2c0.1-0.3,0.3-0.5,0.5-0.8
		C13.7,7,13.8,5.9,13.5,5c-0.4-1.4-1.7-2-3-2.4h-0.1c2.7,1.7,0,4.3,0,4.3c2.1,3.5-1.8,5.7-2.4,6H7.9c-0.6-0.3-4.5-2.5-2.4-6
		c0,0-2.8-2.6,0-4.3H5.4C4.2,3,2.9,3.6,2.5,5c-0.3,1-0.2,2,0.3,2.6c0.2,0.3,0.4,0.5,0.5,0.8c0,0.1,0,0.2,0,0.2
		c0,0.1-0.1,0.1-0.2,0.1c0,0-0.9-0.2-1.7-1.5c0,0.1,0,0.3,0,0.4c0,0.1,0,0.2,0,0.2C1.6,10.1,4,10.7,4,10.7c0.1,0,0.2,0.1,0.1,0.3
		c0,0.1-0.7,0.4-1.3,0.1c0.3,0.3,1.2,1.1,2.3,1.6c1.2,0.5,2.7,0.8,2.8,0.6l0,0H8l0,0c0.1,0.2,1.6-0.1,2.8-0.6c1.2-0.5,2-1.3,2.3-1.6
		c-0.6,0.2-1.3,0-1.3-0.1c0-0.1,0-0.2,0.1-0.3c0,0,2.4-0.7,2.7-2.9c0,0,0-0.1,0-0.2C14.7,7.5,14.7,7.4,14.7,7.2"/>
  </g>
                {React.Children.map(children, (c) => (c))}
            </foo>
        );
    }
});
