#!/usr/bin/env bash

mkdir -p src/main/scala/onextent/bluecase/examples/ex1
aglio -i ../../test/example.md -t bluecase -o src/main/scala/onextent/bluecase/examples/ex1/CouponStuff.scala --theme-super-class CouponStuff --theme-scala-package onextent.bluecase.examples.ex1 --theme-spray-json true

