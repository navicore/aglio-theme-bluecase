package onextent.bluecase.examples.ex1

import org.scalatest.FlatSpec
import onextent.bluecase.examples.ex1._
import spray.json._

class CaseToJson extends FlatSpec {

  def fixture =
    new {
      val coupon = CouponBase(6, 30)
      val txn = Txn(Couponed(3, 30), 100)
    }

  it should "turn object into json" in {

    import CouponBaseJsonProtocol._
    println(fixture.coupon.toJson)
    import TxnJsonProtocol._
    println(fixture.txn.toJson)
    assert(fixture.txn.toJson.toString().contains("coupon\":{\"perc"))
  }

}

