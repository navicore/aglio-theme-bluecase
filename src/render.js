const classcode    = require('./makecases').classcode
const classname    = require('./makecases').classname
const impcode      = require('./makejson').impcode
const arrayimpcode = require('./makejson').arrayimpcode
const jsoncode     = require('./makejson').jsoncode

// turn all types that are 'array' in apib into scala List[MyType]
function fixArrayReferences(result, input, options) {
  const arraymap = arrays(input, options)
  for (const [tname, aname] of arraymap) {
    var re = new RegExp(tname,'g')
    result = result.replace(re, aname)
  }
  return result
}

//
// generator functions to create scala code
//

// create each case class
function* classes(input, options) {
  for (const content of input.content) {
    if (!content.content) throw new Error('bad input')
    if (content.element === 'category') {
      for (const item of content.content) {
        if (
          item.element === 'dataStructure' &&
          item.content &&
          item.content.length &&
          item.content[0].element === 'object' &&
          item.content[0].content
        ) {
          const name = classname(item)
          yield [classcode(name, item, options)]
        }
      }
    }
  }
}

function* implicitGen(input) {
  for (const content of input.content) {
    if (!content.content) throw new Error('bad input')
    if (content.element === 'category') {
      for (const item of content.content) {
        if (
          item.element === 'dataStructure' &&
          item.content &&
          item.content.length &&
          item.content[0].content) {
          if (item.content[0].element === 'object') {
            const name = classname(item)
            yield [name, impcode(name, item)]
          }
        }
      }
    }
  }
}

function* implicitArrayGen(input, impMap) {
  for (const content of input.content) {
    if (!content.content) throw new Error('bad input')
    if (content.element === 'category') {
      for (const item of content.content) {
        if (
          item.element === 'dataStructure' &&
          item.content &&
          item.content.length &&
          item.content[0].content) {
          if (item.content[0].element === 'array') {
            const name = classname(item)
            yield [name, arrayimpcode(name, item, impMap)]
          }
        }
      }
    }
  }
}

function implicits(input) {

  /* TODO: use dependency tree maker lib
   * ejs todo: need to rework this to walk dependency tree and include code
   * from all dependents!!!
   */

  const result = {}
  const code = implicitGen(input)
  for (const [name, scala] of code) {
    result[name] = scala
  }
  const acode = implicitArrayGen(input, result)
  for (const [name, scala] of acode) {
    result[name] = scala
  }
  return result
}

function* jsonCodeGen(input, impMap) {
  for (const content of input.content) {
    if (!content.content) throw new Error('bad input')
    if (content.element === 'category') {
      for (const item of content.content) {
        if (
          item.element === 'dataStructure' &&
          item.content &&
          item.content.length &&
          item.content[0].element === 'object' &&
          item.content[0].content
        ) {
          const name = classname(item)
          yield [jsoncode(name, item, impMap)]
        }
      }
    }
  }
}

function jsonCode(input, options, impMap) {

  const result = ['// json support']
  const code = jsonCodeGen(input, impMap)
  for (const [scala] of code) {
    result.push(`\n${scala}\n`)
  }
  return result.join('')
}

// old-name/new-name map for renames for all the array objects to be List[MyType]
function* arrays(input, options) {
  for (const content of input.content) {
    if (!content.content) throw new Error('bad input')
    if (content.element === 'category') {
      for (const item of content.content) {
        if (
          item.element === 'dataStructure' &&
          item.content &&
          item.content.length &&
          item.content[0].element === 'array'
        ) {
          const name = classname(item)
          const tpe = item.content[0].content[0].element
          yield [name, `${options.themeCollectionType}[${tpe}]`]
        }
      }
    }
  }
}

exports.getConfig = function () {
  return {
    formats: ['1A'],
    options: [
      { //lookup as themeTrimname
        name: 'trimname',
        description: 'remove this string from all type names, ie: MyObjectSchema becoms MyObject',
        default: 'Schema'
      },
      { //lookup as themeScalaPackage
        name: 'scala-package',
        description: 'scala package',
        default: ''
      },
      { //lookup as themeCollectionType
        name: 'collection-type',
        description: 'scala type for collectoins. ie: List, Set, Array',
        default: 'List'
      },
      { //lookup as themeSuperClass
        name: 'super-class',
        description: 'case classes extend this abstract class',
        default: 'ApibCase'
      },
      { //lookup as themeSprayJson
        name: 'spray-json',
        description: 'add spray.io implicit json support',
        default: ''
      },
      { //lookup as themeDoubles
        name: 'doubles',
        description: 'a comma separated list of keys that should map to double instead of int',
        default: ''
      }
    ]
  }
}

exports.render = function (input, options, done) {

  //console.log(JSON.stringify(input, 0, 2))
  // prepend with abstract class
  const result = [
    `/**\n`,
    `   generated by aglio https://github.com/danielgtaylor/aglio with theme bluecase https://github.com/navicore/aglio-theme-bluecase\n`,
    `   with command:\n`,
    `       aglio -i ${options.input} -t ${options.theme} -o ${options.output} --theme-super-class ${options.themeSuperClass} --theme-collection-type ${options.themeCollectionType} --theme-doubles ${options.themeDoubles}\n`,
    `*/\n`,
    `\n`,
    `sealed abstract class ${options.themeSuperClass}\n`
  ]

  // if spray.io json, add import
  if (options.themeSprayJson) {
    result.unshift(`import spray.json._\n\n`)
  }

  // set package statement
  if (options.themeScalaPackage) {
    result.unshift(`package ${options.themeScalaPackage}\n\n`)
  }

  // generate case class text
  const code = classes(input, options)
  for (const [scala] of code) {
    result.push(`\n${scala}\n`)
  }

  // generate implicit DefaultJsonProtocol code
  if (options.themeScalaPackage) {
    const impMap = implicits(input)
    const jcode = jsonCode(input, options, impMap)
    result.push(`\n${jcode}\n`)
  }

  // turn refs to array in apib into List[MyType]
  let resultStr = fixArrayReferences(result.join(''), input, options)
  
  // remove type suffixes from apip files
  var re1 = new RegExp(options.themeTrimname,'g')
  resultStr = resultStr.replace(re1, '') 
  
  done(null, resultStr)
}

