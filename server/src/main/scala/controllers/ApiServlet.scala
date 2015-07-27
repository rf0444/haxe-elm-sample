package controllers

import com.typesafe.config.Config
import org.json4s.{DefaultFormats, Formats}
import org.scalatra.json.JacksonJsonSupport
import org.scalatra.{Ok, ScalatraServlet}

case class MqttInfo(
  host: String,
  port: Int,
  clientId: String,
  username: String,
  password: String
)
class ApiServlet(config: Config) extends ScalatraServlet with JacksonJsonSupport {
  var mqttHost = config.getString("mqtt.host")
  var mqttPort = config.getInt("mqtt.port.ws")
  
  protected implicit val jsonFormats: Formats = DefaultFormats
  before() {
    contentType = formats("json")
  }
  val rand = new scala.util.Random(new java.security.SecureRandom)
  get("/mqtt") {
    val clientId = rand.alphanumeric.take(23).mkString
    Ok(MqttInfo(
      host = mqttHost,
      port = mqttPort,
      clientId = clientId,
      username = "guest",
      password = "guest"
    ))
  }
}
