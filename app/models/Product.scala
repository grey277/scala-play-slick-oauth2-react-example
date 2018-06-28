package models

import play.api.libs.json._

case class Product(id: Long, name: String, description: String, category: Int, key_words: String)

object Product {
  implicit val productFormat = Json.format[Product]
}
