var path     = require('path');
var fs       = require('fs');
var lutils   = require('loader-utils');
var sanitize = require('./utility/sanitize');
var getName  = require('./utility/get-name');
// var xml2js   = require('xml2js');

var libxmljs = require('libxmljs');

var template = require('lodash/template');
var assign   = require('lodash/assign');
var keys     = require('lodash/keys');
var partial  = require('lodash/partial');

function readTemplate (callback, filepath) {
    fs.readFile(filepath, 'utf8', function (error, contents) {
        if (error) {
            throw error;
        }
        callback(template(contents));
    });
}

function parseXml (callback, source) {
    callback(null,
        libxmljs.parseXml(source)
    );
}

function serialize(node) {
    const children = node.childNodes().length
        ? node.childNodes().map(serialize)
        : `"${node.text()}"`

    var name = `"${node.name()}"`

    var props = node.attrs().length ? `{${node.attrs().reduce((str, attr) =>
    {
        return str + (
            !attr.name ? ""
            : `"${ attr.name() }": ${ attr.value() },`
        )
    }, "")}}` : "null"

    if ((node.type() === "text")
        && (node.name() === "text")
        && (node.attrs().length === 0)) {
        return children
    }

    return `React.createElement(${[name, props, children || "null"].join(",")})`
}

function renderJsx (opts, callback, error, xml) {
    if (error) {
        return callback(error);
    }

    // console.log("xml", xml.toString())

    var tagName = xml.root().name();

    // var root    = xml.roo;

    // console.log("tagName", tagName)

    // if (opts.tag) {
    //     root = xml[opts.tag] = root;
    //     delete xml[tagName];
    //     tagName = opts.tag;
    //     props = root.$ = {};
    // }

    sanitize(xml.root());

    // var props = assign(sanitize(xml.root()).$ || {}, opts.attrs);
    var props = Object.assign(xml.root().attrs().reduce(function (acc, attr) {
        acc[attr.name()] = attr.value();
        return acc;
    }, {}), opts.attrs);

    // var xmlBuilder = new xml2js.Builder({
    //     headless: true
    // });

    console.log(
        serialize(xml.root())
    )

    var xmlSrc = xml.root().childNodes().map(node =>node.toString()).join("\n");

    console.log("xmlSrc", xmlSrc)

    var component = opts.tmpl({
        reactDom:      opts.reactDom,
        tagName:       opts.tagName || tagName,
        displayName:   opts.displayName,
        defaultProps:  props,
        innerXml:      xmlSrc
                         // .split(/\n/).slice(1, -1).join('\n')
                         .replace(/\ xmlns.*?\=.*?".*?"/g, "") // TODO
                         .replace(/\<\!\-\-.*\-\-\>/g, "") // TODO
                         .replace(/\<\!DOCTYPE.*\>/g, "") // TODO
    });

    callback(null, component);
}
/**
 * @param {String} source
 */
module.exports = function (source) {
    // read our template
    var tmplPath = path.join(__dirname, 'utility', 'template.txt');

    // let webpack know about us, and get our callback
    var callback = this.async();
    this.addDependency(tmplPath);
    this.cacheable();

    // parameters to the loader
    var query     = lutils.parseQuery(this.query);
    var rsrcPath  = this.resourcePath;
    var rsrcQuery = lutils.parseQuery(this.resourceQuery);

    // resource parameters override loader parameters
    var params = assign({}, query, rsrcQuery);

    var displayName = params.name || getName(rsrcPath);
    var tag         = params.tag || null;
    var reactDom    = params.reactDom || 'react-dom';
    var attrs       = assign({}, params.attrs || {});

    var opts = {
        reactDom:    reactDom,
        tagName:     tag,
        attrs:       attrs,
        displayName: displayName
    };

    var render = partial(renderJsx, opts, callback);
    var parse = partial(parseXml, render, source);

    readTemplate(function (tmpl) {
        opts.tmpl = tmpl;
        parse();
    }, tmplPath);
};
