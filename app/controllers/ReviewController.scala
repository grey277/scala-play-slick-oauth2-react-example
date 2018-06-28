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

class ReviewController @Inject() (reviewRepo: ReviewRepository, cc: MessagesControllerComponents)(implicit ec: ExecutionContext)
  extends MessagesAbstractController(cc) {

  def addReview = Action { implicit request =>
    val review_product_id = request.body.asJson.get("review_product_id").as[Long]
    val review_review_text = request.body.asJson.get("review_review_text").as[String]
    reviewRepo.create(review_product_id, review_review_text)
    Ok("Added review")
  }

  def getReviews = Action.async { implicit request =>
    reviewRepo.list().map { review =>
      Ok(Json.toJson(review))
    }
  }
}
