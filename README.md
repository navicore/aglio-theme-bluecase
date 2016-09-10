# api-blueprint-to-scala
Generate Scala case classes from api-blueprint specifications using Algio

This module is an Aglio theme

See [Aglio Blueprint Renderer](https://github.com/danielgtaylor/aglio)

### caveat 
*works for my initial case of an apib file with just datastructures*

## INSTALL
1. `npm install -g aglio`
2. `npm install -g .`

## USE

* `aglio -i tmp/mystructs.apib -t bluecase -o -`
* `aglio -i tmp/mystructs.apib -t bluecase -o -  --theme-superclass MyCases   > tmp/MyCases.scala`
* `aglio -i tmp/mystructs.apib -t bluecase -o -  --theme-superclass MyCases --theme-doubles lat,lon   > tmp/MyCases.scala`

