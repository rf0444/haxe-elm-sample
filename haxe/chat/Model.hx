package chat;

enum Model {
	NotConnected(state: NotConnectedState);
	Connecting(state: ConnectingState);
	Connected(state: ConnectedState);
}
typedef NotConnectedState = {
	form: ConnectionForm
};
typedef ConnectionForm = {
	name: String
};
typedef ConnectingState = {
	name: String
};
typedef ConnectedState = {
	name: String,
	form: PostForm,
	posts: Array<Post>
};
typedef PostForm = {
	content: String
};
typedef Post = {
	user: String,
	time: Int,
	content: String
};
class Models {
	public static function init(): Model {
		return NotConnected({
			form: {
				name: ""
			}
		});
	}
}
