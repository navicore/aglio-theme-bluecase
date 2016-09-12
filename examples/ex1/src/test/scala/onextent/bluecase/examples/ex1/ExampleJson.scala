package onextent.bluecase.examples.ex1

import org.scalatest.FlatSpec
import spray.json.DefaultJsonProtocol

class ExampleJson extends FlatSpec {

  it should "pass" in {
    case class Color(name: String, red: Int, green: Int, blue: Int)

    object MyJsonProtocol extends DefaultJsonProtocol {
      implicit val colorFormat = jsonFormat4(Color)
    }

    import MyJsonProtocol._
    import spray.json._

    val json = Color("CadetBlue", 95, 158, 160).toJson
    println(json)
    val color = json.convertTo[Color]
  }
}

