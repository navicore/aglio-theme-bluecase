#!/usr/bin/env bash

mkdir -p src/main/scala/onextent/bluecase/examples/ex1

aglio -i ../../test/example.md -t bluecase -o src/main/scala/onextent/bluecase/examples/ex1/CouponStuff.scala --theme-super-class CouponStuff --theme-scala-package onextent.bluecase.examples.ex1 --theme-spray-json true

aglio -i ../../test/example2.md -t bluecase -o src/main/scala/onextent/bluecase/examples/ex1/TxnStuff.scala --theme-super-class TxnStuff --theme-scala-package onextent.bluecase.examples.ex1 --theme-spray-json true

aglio -i ../../test/example3.md -t bluecase -o src/main/scala/onextent/bluecase/examples/ex1/TxnerStuff.scala --theme-super-class TxnerStuff --theme-scala-package onextent.bluecase.examples.ex1 --theme-spray-json true

