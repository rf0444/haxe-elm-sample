package chat;

import chat.Model;

typedef MqttInfo = {
	host: String,
	port: Int,
	clientId: String,
	username: String,
	password: String
}
enum Action {
	Init;
	ConnectionFormInput(f: ConnectionForm -> ConnectionForm);
	Connect;
	MqttInfoResponse(info: MqttInfo);
	ResponseError(err: Dynamic);
	Connected;
	PostArrived(post: Post);
	PostFormInput(f: PostForm -> PostForm);
	Post(time: Int);
}
enum Task {
	RequestMqtt;
	MqttConnect(info: MqttInfo);
	MqttSend(post: Post);
}
