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

class ProductController @Inject() (
  productsRepo: ProductRepository,
  cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addProduct = Action { implicit request =>
    val product_name = request.body.asJson.get("product_name").as[String]
    val product_description = request.body.asJson.get("product_description").as[String]
    val product_category = request.body.asJson.get("product_category").as[Int]
    val product_key_words = request.body.asJson.get("product_key_words").as[String]

    productsRepo.create(product_name, product_description, product_category, product_key_words)
    Ok("Added product").withHeaders(
      "Access-Control-Allow-Origin" -> "*")
  }

  def getProducts = Action.async { implicit request =>
    productsRepo.list().map { products =>
      Ok(Json.toJson(products)).withHeaders(
        "Access-Control-Allow-Origin" -> "*")
    }
  }

  def getProduct(id: Long) = Action.async { implicit request =>
    productsRepo.select(id).map { product =>
      Ok(Json.toJson(product.get)).withHeaders(
        "Access-Control-Allow-Origin" -> "*")
    }
  }
}