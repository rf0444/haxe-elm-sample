package chat;

import haxe.Json;

//import lib.MqttClient;
import lib.Util;
import lib.elm.Signal;

import chat.Action;

class TaskExecutor {
//	var mqtt: MqttClient;
	public function new() {
//		this.mqtt = null;
	}
	public function exec(address: Address<Action>, task: Task) {
		switch (task) {
		case RequestMqtt:
//			Util.ajax({
//				method: "GET",
//				url: "/api/mqtt",
//				success: function(info) { address.send(MqttInfoResponse(info)); },
//				error: function(e) { address.send(ResponseError(e)); }
//			});
			var info: Dynamic = {};
			address.send(MqttInfoResponse(info));
		case MqttConnect(info):
//			MqttClient.connect(info,
//				function(client) {
//					this.mqtt = client;
//					client.subscribe("/chat", function() {
//						address.send(Connected);
//					});
//				},
//				function(message) {
//					var post = Json.parse(message);
//					address.send(PostArrived(post));
//				}
//			);
			haxe.Timer.delay(function() {
				address.send(Connected);
			}, 1000);
		case MqttSend(post):
//			if (mqtt != null) {
//				mqtt.send("/chat", Json.stringify(post));
//			}
			address.send(PostArrived(post));
		}
	}
}
