//turn number into scala Double if element name matches cmdline arg list
function numberType(mname, tpe, options) {
  const doubles = options.themeDoubles.split(',')
  if (doubles && doubles.includes(mname)) {
    return 'Double'
  } else {
    return 'Integer'
  }
}

function lookupType(member, options) {
  const tpe = member.content.value.element
  const mname = member.content.key.content
  switch(tpe) {
  case 'string':
    return 'String'
  case 'number':
    return numberType(mname, tpe, options)
  case 'boolean':
    return 'Boolean'
  default:
    return tpe
  }
}

function classname(item) {
  return item.content[0].meta.id
}

function arraycode(name, item) {
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
    return arraycode(name, item)
  default:
    return casecode(name, item, options)
  }
}

module.exports.classcode = classcode
module.exports.classname = classname

