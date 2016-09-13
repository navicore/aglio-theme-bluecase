const classcode    = require('./makecases').classcode
const classname    = require('./makecases').classname
const impcode      = require('./makejson').impcode
const arrayimpcode = require('./makejson').arrayimpcode
const jsoncode     = require('./makejson').jsoncode
const memberTypes  = require('./makejson').memberTypes
const DepGraph     = require('dependency-graph').DepGraph

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
            const mems = memberTypes(name, item)
            yield [name, impcode(name, item), mems]
          }
        }
      }
    }
  }
}

function* implicitArrayGen(input) {
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
            yield [name, arrayimpcode(name, item)]
          }
        }
      }
    }
  }
}

function implicits(input) {
  const graph = new DepGraph()
  const result = []
  const code = implicitGen(input)
  for (const [name, scala, deps] of code) {
    result.push({ name, scala, deps })
  }
  // add nodes with data being scala def
  for (const o of result) {
    if (!graph.hasNode(o.name)) {
      graph.addNode(o.name, o.scala)
    }
  }
  const acode = implicitArrayGen(input)
  for (const [name, dep] of acode) {
    if (!graph.hasNode(name)) {
      graph.addNode(name, graph.getNodeData(dep))
    }
    if (!(dep in graph.dependenciesOf(name))) {
      graph.addDependency(name, dep)
    }
  }
  // add deps
  for (const o of result) {
    for (const d of o.deps) {
      if (graph.hasNode(d)) {
        graph.addDependency(o.name, d)
      }
    }
  }
  return graph
}

function* jsonCodeGen(input, graph) {
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
          yield [jsoncode(name, item, graph)]
        }
      }
    }
  }
}

function jsonCode(input, options, graph) {

  const result = ['// json support\n']
  const code = jsonCodeGen(input, graph)
  for (const [scala] of code) {
    result.push(`${scala}\n`)
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

  const bluecaseVersion = require('root-require')('package.json').version
  const result = [
    `/**\n`,
    `   generated by aglio https://github.com/danielgtaylor/aglio with\n`,
    `   theme bluecase https://github.com/navicore/aglio-theme-bluecase version ${bluecaseVersion}\n`,
    `   using command:\n`,
    `       aglio -i ${options.input} -t ${options.theme} -o ${options.output} --theme-super-class ${options.themeSuperClass} --theme-collection-type ${options.themeCollectionType} --theme-spray-json ${options.themeSprayJson} --theme-doubles ${options.themeDoubles}\n`,

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
  if (options.themeSprayJson) {
    const graph = implicits(input)
    const jcode = jsonCode(input, options, graph)
    result.push(`\n${jcode}\n`)
  }

  // turn refs to array in apib into List[MyType]
  let resultStr = fixArrayReferences(result.join(''), input, options)
  
  // remove type suffixes from apip files
  var re1 = new RegExp(options.themeTrimname,'g')
  resultStr = resultStr.replace(re1, '') 
  
  done(null, resultStr)
}

