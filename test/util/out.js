/*globals describe, it*/
var react  = require('react');
var loader = require('../');
var babel  = require('babel-core');
var fs     = require('fs');
var path   = require('path');
var _      = require('lodash');
var assign = _.assign;

var defaultMock = {
    callback:       function (error, result) {
        if (error) {
            throw error;
        }
        console.log(result);
    },
    cacheable:      function () {},
    addDependency:  function () {},
    query:          '?reactDOM=react',
    resourcePath:   'foo.svg'
    // resourceQuery:  '?tag=symbol&name=AdvantageIcon&attrs={foo:\'bar\'}'
};

require('should');

function invoke (xml, mock) {
    var context = assign({}, defaultMock, mock || {});
    context.async = function () { return this.callback; }.bind(context);
    loader.call(context, xml);
}

function read (filepath) {
    return fs.readFileSync(path.join(__dirname, filepath), 'utf8');
}

var filenames = [
  './svg/ffg-sw-advantage.svg',
  './svg/mashup.svg',
  './svg/styles.svg',
  './svg/text.svg',
];

filenames.forEach(function (filename) {
  invoke(read(filename), {
    resourcePath: filename,
    // query: '?reactDom=react',
    resourceQuery: '?tag=foo&attrs={"foo": "bar"}',
    query: '?' + JSON.stringify({
      attrs: {
        style: {},
        width: 'auto',
        height: 'auto'
      }
    }),
    // resourceQuery: '?' + JSON.stringify({
    //   attrs: {
    //     style: {},
    //     width: 'auto',
    //     height: 'auto'
    //   }
    // }),
    callback: function (error, result) {
      if (error) {
        throw error;
      }

      var contents = babel.transform(result, {
        presets: ['es2015', 'react']
      }).code


      fs.writeFileSync(
        path.resolve(__dirname, "react", path.parse(filename).name + ".jsx"),
        result,
        { format: "utf8" }
      )

      fs.writeFileSync(
        path.resolve(__dirname, "react", path.parse(filename).name + ".js"),
        contents,
        { format: "utf8" }
      )

    }
  });
})