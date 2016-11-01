react  = require "react"
loader = require "../"
babel  = require "babel-core"
fs     = require "fs"
path   = require "path"
_      = require "lodash"
assign = _.assign;

expect = require "expect"
loaderUtils = require "loader-utils"

defaultMock =
  callback: (error, result) ->
    if error
      throw error
    console.log result
    return
  cacheable: ->
  addDependency: ->
  query: "?reactDOM=react"
  resourcePath: "foo.svg"

invoke = (xml, mock) ->
  context = assign({}, defaultMock, mock or {})
  context.async = (->
    @callback
  ).bind(context)
  loader.call context, xml
  return

read = (filepath) ->
  fs.readFileSync path.join(__dirname, filepath), "utf8"

describe "svg-react-loader", ->
  describe "loader-utils", ->
    it "should handle json-like params", ->
      expect loaderUtils.parseQuery "?{json:5,data:{a:1}}"
        .toEqual { json: 5, data: { a: 1 } }

    it "should only handle things supported by loader-utils", ->
      # the docs imply some weird format would work here that totally doesn't
      expect loaderUtils.parseQuery "?attrs={className: 'mySymbol'}"
        .toEqual { attrs: "{className: 'mySymbol'}" }
      obj = assign {}, "duck"
      expect obj
        .toEqual { 0: "d", 1: "u", 2: "c", 3: "k" }

  describe "how bout we actually test something", ->
    it "should do something", (done) ->
      # var filename = "ffg-sw-advantage.svg";
      filename = "./svg/mashup.svg"
      invoke read(filename),
        query: "?reactDom=react"
        resourcePath: filename
        resourceQuery: "?tag=foo&attrs={foo: \'bar\'}"
        callback: (error, result) ->
          throw error if error

          contents = babel.transform(result, {
            presets: ["es2015", "react"]
          }).code

          # i wonder if there's a more direct way to do this
          outPath = path.join(__dirname, "temp", path.parse(filename).name + ".js")
          fs.writeFileSync outPath, contents, "utf8"
          out = require(outPath)
          fs.unlink outPath

          # console.log(out)
          # console.log(out.defaultProps)

          expect out.defaultProps.foo
            .toNotEqual "bar"

          done()

    it "an example that's not incorrect", (done) ->
      # var filename = "ffg-sw-advantage.svg";
      filename = "./svg/mashup.svg"
      invoke read(filename),
        query: "?reactDom=react"
        resourcePath: filename
        resourceQuery: "?{attrs:{json:5,data:{a:1}}}"
        callback: (error, result) ->
          throw error if error

          contents = babel.transform(result, {
            presets: ["es2015", "react"]
          }).code

          # i wonder if there's a more direct way to do this
          outPath = path.join(__dirname, "react2", path.parse(filename).name + ".js")
          fs.writeFileSync outPath, contents, "utf8"
          out = require(outPath)
          # fs.unlink outPath

          # console.log(out)
          # console.log(out.defaultProps)

          expect(out.defaultProps.json).toEqual 5
          expect(out.defaultProps.data).toEqual { a: 1 }

          done()
