[![Build Status](https://travis-ci.org/navicore/aglio-theme-bluecase.svg?branch=unittests)](https://travis-ci.org/navicore/aglio-theme-bluecase)
# aglio-theme-bluecase
An [Aglio Blueprint Renderer](https://github.com/danielgtaylor/aglio) theme to generate Scala case classes from `object` `datastructure` entries found in [api-blueprint](https://apiblueprint.org) specifications.

Optionally generate spray.io json `DefaultJsonProtocol` support for case classes with `--theme-spray-json true`

### *caveat*
*Works for my initial specific apib file.  That apib file is moderately complex with several dozen types and some types composed by referencing other types defined in the same apib file.  I have not tested bluecase on any apib files in the wild, yet, except for those in the api-blueprint examples dir.*

## INSTALL

via [npmjs.org](https://www.npmjs.com/package/aglio-theme-bluecase):

1. `npm install -g aglio`
2. `npm install -g aglio-theme-bluecase`

## USE

* `aglio -i tmp/mystructs.apib -t bluecase -o -`
* `aglio -i tmp/myapi.md -t bluecase -o tmp/MyGreatCases  --theme-superclass MyGreatCases --theme-doubles lat,lon`
* `aglio -i ../../test/example3.md -t bluecase -o src/main/scala/onextent/bluecase/examples/ex1/TxnerStuff.scala --theme-super-class TxnerStuff --theme-scala-package onextent.bluecase.examples.ex1 --theme-spray-json true`

![example image](screen.png)

License
=======
Copyright (c) 2016 Ed Sweeney

http://dgt.mit-license.org/

