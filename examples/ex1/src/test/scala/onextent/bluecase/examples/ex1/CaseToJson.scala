package onextent.bluecase.examples.ex1

import org.scalatest.FlatSpec
import onextent.bluecase.examples.ex1._
import spray.json._

class CaseToJson extends FlatSpec {

  def fixture =
    new {
      val coupon = CouponBase(6, 30)
      val txn = Txn(Couponed(3, 30), 100)
      val txner = Txner(Couponer(3, 30), 100, List(Rule(2)))
    }

  it should "turn object into json" in {
    import CouponBaseJsonProtocol._
    println(fixture.coupon.toJson)
    import TxnJsonProtocol._
    println(fixture.txn.toJson)
    assert(fixture.txn.toJson.toString().contains("coupon\":{\"perc"))
  }

  it should "turn complex object with List into json" in {
    import TxnerJsonProtocol._
    println(fixture.txner.toJson)
    assert(fixture.txner.toJson.toString().contains("coupon\":{\"perc"))
  }
}

