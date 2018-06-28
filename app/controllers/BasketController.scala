package controllers

import javax.inject._
import models._
import play.api.data.Form
import play.api.data.Forms._
import play.api.data.validation.Constraints._
import play.api.i18n._
import play.api.libs.json.Json
import play.api.mvc._

import scala.concurrent.{ ExecutionContext, Future }
import scala.util.{ Failure, Success }

class BasketController @Inject() (basketRepo: BasketRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addToBasket = Action { request =>
    val product_id = request.body.asJson.get("product_id").as[Long]
    basketRepo.create(product_id)
    Ok("Added to basket").withHeaders(
      "Access-Control-Allow-Origin" -> "*")

  }

  def getBasket = Action.async { request =>
    basketRepo.list().map { basket =>
      Ok(Json.toJson(basket)).withHeaders(
        "Access-Control-Allow-Origin" -> "*")
    }
  }

  def delete(id: Long) = Action.async { request =>
    basketRepo.remove(id).map { basket =>
      Ok(Json.toJson(basket)).withHeaders(
        "Access-Control-Allow-Origin" -> "*")
    }
  }
}
