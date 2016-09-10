const classcode = require('./makecases').classcode
const classname = require('./makecases').classname

//
// generator functions to create scala code
//

// create each case class
function* classes(input, options) {
  if (!input.content[0].content) throw new Error("bad input")
  for (const item of input.content[0].content) {
    if (item.element !== 'dataStructure') throw new Error("not a datastructure: " + JSON.stringify(item))
    const name = classname(item)
    yield [name, classcode(name, item, options)]
  }
}

// old-name/new-name map for renames for all the array objects to be List[MyType]
function* arrays(input, options) {
  if (!input.content[0].content) throw new Error("bad input")
  for (const item of input.content[0].content) {
    if (item.element !== 'dataStructure') throw new Error("not a datastructure: " + JSON.stringify(item))
    const name = classname(item)
    if (item.content[0].element === 'array') {
      const tpe = item.content[0].content[0].element
      yield [name, `List[${tpe}]`]
    }
  }
}

exports.getConfig = function () {
  return {
    formats: ['1A'],
    options: [
      { //remove this string from the names of types, ie: Schema suffix
        name: 'trimname',
        description: 'remove this string from all type names, ie: MyObjectSchema becoms MyObject',
        default: 'Schema'
      },
      { //lookup as themeSuperclass
        name: 'superclass',
        description: 'case classes extend this abstract class',
        default: 'MyCase'
      },
      { //lookup as themeDoubles
        name: 'doubles',
        description: 'a comma separated list of keys that should map to double instead of int',
        default: ''
      }
    ]
  };
}

exports.render = function (input, options, done) {
  const result = []
  const code = classes(input, options)
  for (const [name, scala] of code) {
    result.push('\n')
    result.push(`${scala}\n`)
  }
  result.unshift(`abstract class ${options.themeSuperclass}\n`)
  let fixedArrays = result.join("")
  const arraymap = arrays(input, options)
  for (const [tname, aname] of arraymap) {
    var re = new RegExp(tname,"g");
    fixedArrays = fixedArrays.replace(re, aname)
  }
  var re1 = new RegExp(options.themeTrimname,"g");
  fixedArrays = fixedArrays.replace(re1, '')  // remove type suffixes from apip files

  done(null, fixedArrays)
};

