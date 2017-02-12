[![Build Status](https://travis-ci.org/navicore/aglio-theme-bluecase.svg?branch=unittests)](https://travis-ci.org/navicore/aglio-theme-bluecase)
[![Code Climate](https://codeclimate.com/github/navicore/aglio-theme-bluecase/badges/gpa.svg)](https://codeclimate.com/github/navicore/aglio-theme-bluecase)
[![Test Coverage](https://codeclimate.com/github/navicore/aglio-theme-bluecase/badges/coverage.svg)](https://codeclimate.com/github/navicore/aglio-theme-bluecase/coverage)
[![Issue Count](https://codeclimate.com/github/navicore/aglio-theme-bluecase/badges/issue_count.svg)](https://codeclimate.com/github/navicore/aglio-theme-bluecase)
[![Codacy Badge](https://api.codacy.com/project/badge/Grade/3423ea07c830405a94656cf3035544b7)](https://www.codacy.com/app/navicore/aglio-theme-bluecase?utm_source=github.com&amp;utm_medium=referral&amp;utm_content=navicore/aglio-theme-bluecase&amp;utm_campaign=Badge_Grade)

# aglio-theme-bluecase
An [Aglio Blueprint Renderer](https://github.com/danielgtaylor/aglio) theme to generate Scala case classes from `object` `datastructure` entries found in [api-blueprint](https://apiblueprint.org) specifications.

Optionally generate spray.io json `DefaultJsonProtocol` support for case classes with `--theme-spray-json true`

## STATUS
*Works for my initial specific apib file.  That apib file is moderately complex with several dozen object and array types with some types composed by referencing other types defined in the same apib file.  I have not tested bluecase on any apib files in the wild, yet, except for api-blueprint [examples](https://github.com/apiaryio/api-blueprint/blob/master/examples/10.%20Data%20Structures.md).*

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

