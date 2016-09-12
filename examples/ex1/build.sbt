name         := "ex1"
version      := "1.0"
organization := "OnExtent"

scalaVersion := "2.10.4"//

libraryDependencies ++=
  Seq(
    "io.spray" %% "spray-json" % "1.3.1",
    "org.scalatest" %% "scalatest" % "2.2.1" % "test"
  )

resolvers += Resolver.mavenLocal

