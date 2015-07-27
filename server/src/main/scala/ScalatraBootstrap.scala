import javax.servlet.ServletContext

import com.typesafe.config.ConfigFactory
import org.scalatra.LifeCycle

import controllers.{ApiServlet}

class ScalatraBootstrap extends LifeCycle {
  val config =  ConfigFactory.load()
  override def init(context: ServletContext) {
    context.mount(new ApiServlet(config), "/api/*")
  }
}
