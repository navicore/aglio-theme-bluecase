[![Build Status](https://travis-ci.org/navicore/aglio-theme-bluecase.svg?branch=unittests)](https://travis-ci.org/navicore/aglio-theme-bluecase)
# aglio-theme-bluecase
An [Aglio Blueprint Renderer](https://github.com/danielgtaylor/aglio) theme to generate Scala case classes from `object` `datastructure` entries found in [api-blueprint](https://apiblueprint.org) specifications.

### *caveat*
*Works for my initial specific apib files.  That app is moderately complex with several dozen types and some types referencing each other.  I haven't debugged using any other apib files except for the API Blueprint repo's [Data Structure](https://github.com/apiaryio/api-blueprint/blob/master/examples/10.%20Data%20Structures.md) example.  I have not studied the [protagonist](https://github.com/apiaryio/protagonist) parsed form from aglio to know what profound misunderstandings I'm holding - I have some assumptions that some content arrays have just one entry, etc...*

## INSTALL
1. `npm install -g aglio`
2. `npm install -g aglio-theme-bluecase`

## USE

* `aglio -i tmp/mystructs.apib -t bluecase -o -`
* `aglio -i tmp/mystructs.apib -t bluecase -o -  --theme-superclass MyCases   > tmp/MyCases.scala`
* `aglio -i tmp/myapi.md -t bluecase -o -  --theme-superclass MyCases --theme-doubles lat,lon   > tmp/MyCases.scala`
* `aglio -i tmp/myapi.md -t bluecase -o tmp/MyGreatCases  --theme-superclass MyGreatCases --theme-doubles lat,lon`

![example image](screen.png)

License
=======
Copyright (c) 2016 Ed Sweeney

http://dgt.mit-license.org/

