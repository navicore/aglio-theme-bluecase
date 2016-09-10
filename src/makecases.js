function lookupType(member, options) {
  const tpe = member.content.value.element
  switch(tpe) {
    case 'string':
      return 'String'
    case 'number':
      return 'Integer'
    case 'boolean':
      return 'Boolean'
    default:
      return tpe
  }
}

function classname(item) {
  return item.content[0].meta.id
}

function arraycode(name, item, options) {
  const tpe = item.content[0].content[0].element
  return `// List[${tpe}]`
}

function casecode(name, item, options) {
  const scala = []
  const members = []
  scala.push(`case class ${name}(`)
  for (const member of item.content[0].content) {
    members.push(`${member.content.key.content}:${lookupType(member, options)}`)
  }
  scala.push(members.join(', '))
  scala.push(`) extends ${options.themeSuperclass}`)
  return scala.join('')
}

function classcode(name, item, options) {
  switch (item.content[0].element) {
    case 'array':
      return arraycode(name, item, options)
    default:
      return casecode(name, item, options)
  }
}

module.exports.classcode = classcode
module.exports.classname = classname

