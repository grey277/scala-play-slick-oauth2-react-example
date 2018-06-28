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

class OrderController @Inject() (orderRepo: OrderRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addOrder = Action { implicit request =>
    val product_id = request.body.asJson.get("product_id").as[Long]
    val payment_id = request.body.asJson.get("payment_id").as[Long]
    orderRepo.create(product_id, payment_id)
    Ok("Added order")
  }

  def getOrders = Action.async { implicit request =>
    orderRepo.list().map { order =>
      Ok(Json.toJson(order))
    }
  }
}
