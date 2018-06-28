package models

import javax.inject.{ Inject, Singleton }
import play.api.db.slick.DatabaseConfigProvider
import slick.jdbc.JdbcProfile
import scala.concurrent.{ Future, ExecutionContext }

@Singleton
class OrderRepository @Inject() (dbConfigProvider: DatabaseConfigProvider, productRepository: ProductRepository, paymentRepository: PaymentRepository)(implicit ec: ExecutionContext) {
  private val dbConfig = dbConfigProvider.get[JdbcProfile]

  import dbConfig._
  import profile.api._

  private class OrderTable(tag: Tag) extends Table[Order](tag, "order") {

    def id = column[Long]("id", O.PrimaryKey, O.AutoInc)
    def product_id = column[Long]("product_id")
    def product_id_fk = foreignKey("product_id_fk", product_id, product)(_.id)
    def payment_id = column[Long]("payment_id")
    def payment_id_fk = foreignKey("payment_id_fk", payment_id, payment)(_.id)

    def * = (id, product_id, payment_id) <> ((Order.apply _).tupled, Order.unapply)
  }

  import productRepository.ProductTable
  import paymentRepository.PaymentTable

  private val order = TableQuery[OrderTable]
  private val product = TableQuery[ProductTable]
  private val payment = TableQuery[PaymentTable]

  def create(product_id: Long, payment_id: Long): Future[Order] = db.run {
    (order.map(o => (o.product_id, o.payment_id))
      returning order.map(_.id)
      into { case ((product_id, payment_id), id) => Order(id, product_id, payment_id) }
    ) += ((product_id, payment_id))
  }

  /**
   * List all the people in the database.
   */
  def list(): Future[Seq[Order]] = db.run {
    order.result
  }
}
