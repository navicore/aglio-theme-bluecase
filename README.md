# api-blueprint-to-scala
Generate Scala case classes from api-blueprint specifications

### caveat 
**works for my initial case of an apib file with just datastructures**

## INSTALL

* `npm install -g .`

## USE

* `aglio -i tmp/mystructs.apib -t bluecase -o -`
* `aglio -i tmp/mystructs.apib -t bluecase -o -  --theme-superclass MyCases   > tmp/MyCases.scala`
* `aglio -i tmp/mystructs.apib -t bluecase -o -  --theme-superclass MyCases --theme-doubles lat,lon   > tmp/MyCases.scala`

