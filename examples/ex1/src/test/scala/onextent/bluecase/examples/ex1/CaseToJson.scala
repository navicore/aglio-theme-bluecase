package onextent.bluecase.examples.ex1

import org.scalatest.FlatSpec
import onextent.bluecase.examples.ex1._

class CaseToJson extends FlatSpec {

  def fixture =
    new {
      val coupon = CouponBase(6, 30)
    }

  it should "turn object into json" in {

    import spray.json._
    import CouponBaseJsonProtocol._
    println(fixture.coupon.toJson)
  }

}

