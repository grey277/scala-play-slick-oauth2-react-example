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

class TypesController @Inject() (typesRepo: TypesRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addType = Action { implicit request =>
    val types_product_id = request.body.asJson.get("types_product_id").as[Long]
    val types_name = request.body.asJson.get("types_name").as[String]
    typesRepo.create(types_product_id, types_name)
    Ok("Added type")
  }

  def getTypes = Action.async { implicit request =>
    typesRepo.list().map { types =>
      Ok(Json.toJson(types))
    }
  }
}