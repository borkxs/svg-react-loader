var keys = require('lodash/keys');
var omit = require('lodash/omit');
var camelCase = require('lodash/camelCase');

var XML_ATTR_KEY      = '$';
var XML_TEXT_NODE_KEY = '_';
var XML_CHILDREN_KEY  = '$$';
var XML_NAME_KEY      = '#name';

var NS_SEPARATOR      = ':';
var DATA_ATTR_KEY     = 'data-svgreactloader';
var XML_NAMESPACE_KEY = 'xmlns';
var TEXT_REGEX        = /(["'])/g;

var XML_NAMESPACES = {
    xml: '!!!',
    svg: 'http://www.w3.org/2000/svg',
    xlink: 'http://www.w3.org/1999/xlink'
};

var STYLE_ATTR_KEY = 'style';

var RESERVED_KEYS = {
    'class': 'className',
    'for': 'htmlFor'
};

function appendToDataAttribute (xmlNode, key, value, namespaces, nsKey) {
    var dataAttr = xmlNode.attr(DATA_ATTR_KEY)
    var data = (dataAttr && dataAttr.value()) || []

    var ns = namespaces && namespaces[nsKey]
    data.push([ns, key, value])

    if (!dataAttr) {
        xmlNode.attr({
            [DATA_ATTR_KEY]: data
        })
    } else {
        xmlNode.attr(DATA_ATTR_KEY).value(data)
    }
}

/**
 * @param {Object[]} nodes
 */
function sanitizeStyleNodes (node) {

    // var acc = node.value || node.text
    // var src = acc.call(node)

    var src
    try {
        src = node.text()
    } catch (e) {}
    try {
        src = node.value()
    } catch (e) {}

    var text = '{`' + src.replace(TEXT_REGEX, "\\$1") + '`}';

    console.log("src", src)
    try {
        node.text(text)
    } catch (e) {}
    try {
        node.value(text)
    } catch (e) {}

}

/**
 * Remove any non-jsx xml attributes from the given node and any of its child
 * nodes. Return the original node sanitized.
 *
 * @param {Object|Object[]} xmlNode
 * @param {Object} [namespaces]
 * @returns {Object} the node that was given
 */
module.exports = function sanitize (xmlNode, namespaces) {
    namespaces = namespaces || Object.create(XML_NAMESPACES);

    if (xmlNode.childNodes().length) {
        xmlNode.childNodes().forEach(child => {
            sanitize(child, namespaces)
        });
    }

    // libxmljs seems to treat all whitespace as empty text nodes
    if (xmlNode.type() === "text") {
        if (!xmlNode.text().trim() && !xmlNode.childNodes().length) {
            return xmlNode.remove()
        }
    }

    console.log(xmlNode.name())

    // libxmljs seems to skip this in childNodes()
    // if (xmlNode.type() === "comment") {
    //     return xmlNode.remove()
    // }

    // xlinkHref xlinkRole xlinkShow xlinkTitle xlinkType xmlBase xmlLang xmlSpace

    // process this node attributes
    if (xmlNode.attrs().length) {
        xmlNode.attrs().forEach(function (attrNode) {

            var value = attrNode.value()
            var key = attrNode.name()
            var ns = attrNode.namespace()

            if (ns) {
                var prefix = ns.prefix()
                var href = ns.href()
                // console.log("\t", key, value, prefix, href)
                if (XML_NAMESPACES[prefix]) {
                    attrNode.remove()
                    xmlNode.attr({
                        [camelCase(`${prefix}-${key}`)]: value
                    })
                }

                var nsKey = ns.prefix()

                if (nsKey === XML_NAMESPACE_KEY) {
                    namespaces.xml = value;
                }
                else if (nsKey === XML_NAMESPACE_KEY) {
                    namespaces[key] = value;
                }
            } else {
                var keyName = RESERVED_KEYS[key] || camelCase(key);
                attrNode.remove()
                xmlNode.attr({ [keyName]: value })
                // console.log("\t", keyName, value.substr(0, 8))
            }

            // nsKey = nsKey === XML_NAMESPACE_KEY ? 'xml' : nsKey;

            // if (ns && attr || attr === STYLE_ATTR_KEY) {

            //     var dataAttr = xmlNode.attr(DATA_ATTR_KEY)
            //     var data = (dataAttr && dataAttr.value()) || []

            //     data.push([namespaces[nsKey], key, value])

            //     if (!dataAttr) {
            //         xmlNode.attr({
            //             [DATA_ATTR_KEY]: data
            //         })
            //     } else {
            //         xmlNode.attr(DATA_ATTR_KEY).value(data)
            //     }

            //     attrNode.remove()
            // }
            // else {
            //     var keyName = RESERVED_KEYS[key] || camelCase(key);
            //     xmlNode.attr({ [keyName]: value })
            // }
        })
    }

    var style = xmlNode.attr("style")
    if (style) {
        sanitizeStyleNodes(style);
        appendToDataAttribute(xmlNode, "style", xmlNode.text())
        style.remove();
    }

    if (xmlNode.name() === "style") {
        sanitizeStyleNodes(xmlNode);
    }

    // Serialize our data attribute
    if (xmlNode.attr(DATA_ATTR_KEY) && xmlNode.attr(DATA_ATTR_KEY).value()) {
        xmlNode.attr(DATA_ATTR_KEY).value(
            JSON.stringify(xmlNode.attr(DATA_ATTR_KEY).value())
        )
    }

    return xmlNode;
};
