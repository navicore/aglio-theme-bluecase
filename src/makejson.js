function memberTypes(name, item) {
  const mems = []
  for (const member of item.content[0].content) {
    mems.push(`${member.content.value.element.replace(' ', '')}`)
  }
  return mems
}

function members(name, item) {
  const mems = []
  for (const member of item.content[0].content) {
    mems.push(`${member.content.key.content.replace(' ', '')}`)
  }
  return mems
}

function impcode(name, item) {
  const mems = members(name, item)
  const fname = name.charAt(0).toLowerCase() + name.slice(1) + 'Format'
  return(`  implicit val ${fname} = jsonFormat${mems.length}(${name})\n`)
}

function spraycode(name, item, graph) {
  const scala = []
  scala.push(`\nobject ${name}JsonProtocol extends DefaultJsonProtocol {\n`)
  for (const dep of graph.dependenciesOf(name)) {
    const code = graph.getNodeData(dep)
    if (!scala.includes(code)) {
      scala.push(code)
    }
  }
  scala.push(graph.getNodeData(name))
  scala.push(`} // ${name}`)
  return scala.join('')
}

function arrayimpcode(name, item) {
  return item.content[0].content[0].element
}

module.exports.arrayimpcode = arrayimpcode
module.exports.impcode      = impcode
module.exports.spraycode    = spraycode
module.exports.members      = members
module.exports.memberTypes  = memberTypes

