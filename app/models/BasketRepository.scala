package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class BasketRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, productRepository: ProductRepository)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  import productRepository.ProductTable

  private class BasketTable(tag: Tag) extends Table[Basket](tag, "basket") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def product_id = column[Long]("product_id")
    def product_id_fk = foreignKey("product_id_fk", product_id, product)(_.id)

    def * = (id, product_id) <> ((Basket.apply _).tupled, Basket.unapply)
  }

  import productRepository.ProductTable

  private val basket = TableQuery[BasketTable]
  private val product = TableQuery[ProductTable]

  def create(product_id: Long): Future[Basket] = db.run {
    (basket.map(b => (b.product_id))
      returning basket.map(_.id)
      into { case ((product_id), id) => Basket(id, product_id) }
    ) += (product_id)
  }

  /**
   * List all the people in the database.
   */
  def list(): Future[Seq[Basket]] = db.run {
    basket.result
  }

  def remove(id: Long): Future[Int] = db.run {
    basket.filter(_.id === id).delete
  }
}
