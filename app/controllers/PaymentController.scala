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

class PaymentController @Inject() (paymentRepo: PaymentRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addPayment = Action { implicit request =>
    val payment_status = request.body.asJson.get("payment_status").as[String]
    paymentRepo.create(payment_status)
    Ok("Added payment")
  }

  def getPayments = Action.async { implicit request =>
    paymentRepo.list().map { payment =>
      Ok(Json.toJson(payment))
    }
  }
}

case class CreatePaymentForm(status: String)
