package lib;

typedef MqttInfo = {
	host: String,
	port: Int,
	clientId: String,
	username: String,
	password: String
};

class MqttClient {
	var client: Dynamic;
	function new(client: Dynamic) {
		this.client = client;
	}
	public static function connect(info: MqttInfo, onConnect: MqttClient -> Void, onMessageArrived: String -> Void) {
		var client = createClient(info);
		client.onMessageArrived = function(message) {
			onMessageArrived(message.payloadString);
		};
		client.connect({
			timeout: 3,
			userName: info.username,
			password: info.password,
			onSuccess: function() {
				onConnect(new MqttClient(client));
			}
		});
	}
	static function createClient(info: MqttInfo): Dynamic {
		var f: MqttInfo -> Dynamic = untyped __js__("function(x) { return new window.Paho.MQTT.Client(x.host, x.port, x.clientId); }");
		return f(info);
	}
	public function subscribe(destination: String, onSuccess: Void -> Void) {
		this.client.subscribe(destination, {
			qos: 0,
			onSuccess: onSuccess
		});
	}
	public function send(destination: String, message: String) {
		if (this.client == null) {
			return;
		}
		var m = createMesasge(message);
		m.destinationName = destination;
		m.qos = 0;
		m.retained = false;
		this.client.send(m);
	}
	static function createMesasge(message: String): Dynamic {
		var f: String -> Dynamic = untyped __js__("function(x) { return new window.Paho.MQTT.Message(x); }");
		return f(message);
	}
}
