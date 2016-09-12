function impcode(name, item) {
  const members = []
  for (const member of item.content[0].content) {
    members.push(`${member.content.key.content.replace(' ', '')}`)
  }
  const fname = name.charAt(0).toLowerCase() + name.slice(1) + 'Format'
  return(`  implicit val ${fname} = jsonFormat${members.length}(${name})\n`)
}


function jsoncode(name, item, impMap) {
  const scala = []
  scala.push(`\nobject ${name}JsonProtocol extends DefaultJsonProtocol {\n`)

  for (const member of item.content[0].content) {
    const tpe = member.content.value.element
    if (tpe in impMap) {
      scala.push(impMap[tpe])
    }
  }
  scala.push(impMap[name])
  scala.push(`} // ${name}`)
  return scala.join('')
}

function arrayimpcode(name, item, impMap) {
  console.log('ejs arrayimpcode:\n' + JSON.stringify(item, 0, 2))
  /*
  const members = []
  for (const member of item.content[0].content) {
    members.push(`${member.content.key.content.replace(' ', '')}`)
  }
  const fname = name.charAt(0).toLowerCase() + name.slice(1) + 'Format'
  return(`  implicit val ${fname} = jsonFormat${members.length}(${name})\n`)
  */

  //return ('  // i need a ref to List[something\n')
  return impMap[item.content[0].content[0].element]
}

module.exports.arrayimpcode = arrayimpcode
module.exports.impcode = impcode
module.exports.jsoncode = jsoncode

