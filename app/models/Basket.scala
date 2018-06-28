package models

import play.api.libs.json._

case class Basket(id: Long, product_id: Long)

object Basket {
  implicit val basketFormat = Json.format[Basket]
}
