var React = require('react');
var helpers = require('../helpers')(require('react-dom'));

module.exports = React.createClass({

    displayName: "Text",

    getDefaultProps () {
        return {"0":"{","1":"\"","2":"f","3":"o","4":"o","5":"\"","6":":","7":" ","8":"\"","9":"b","10":"a","11":"r","12":"\"","13":"}"};
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
    <title>The Title</title>
    <text x="20" y="20">Text</text>
  </g>
                {React.Children.map(children, (c) => (c))}
            </foo>
        );
    }
});
