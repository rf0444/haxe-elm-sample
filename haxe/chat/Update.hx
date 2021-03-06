package chat;

import lib.Util.cons;
import lib.Util.copy;
import lib.elm.App.UpdateResult;

import chat.Action;
import chat.Model;

class Update {
	public static function update(action: Action, model: Model): UpdateResult<Model, Task> {
		return switch ({ model: model, action: action }) {
		case { model: NotConnected(state), action: ConnectionFormInput(f) }:
			var next = NotConnected(
				copy(state, { form: f(state.form) })
			);
			result(next, []);
		case { model: NotConnected({ form: { name: "" } }), action: Connect }:
			result(model, []);
		case { model: NotConnected(state), action: Connect }:
			var next = Connecting({ name: state.form.name });
			result(next, [ RequestMqtt ]);
		case { model: Connecting(_), action: ResponseError(_) }:
			var next = NotConnected({ form: { name: "" } });
			result(next, []);
		case { model: Connecting(state), action: MqttInfoResponse(info) }:
			result(model, [ MqttConnect(info) ]);
		case { model: Connecting(state), action: Connected }:
			var next = Connected({
				name: state.name,
				form: { content: "" },
				posts: []
			});
			result(next, []);
		case { model: Connected(state), action: PostFormInput(f) }:
			var next = Connected(
				copy(state, { form: f(state.form) })
			);
			result(next, []);
		case { model: Connected({ form: { content: "" } }), action: Post(_) }:
			result(model, []);
		case { model: Connected(state), action: Post(time) }:
			var next = Connected(
				copy(state, { form: copy(state.form, { content: "" }) })
			);
			var post = {
				user: state.name,
				time: time,
				content: state.form.content
			};
			result(next, [ MqttSend(post) ]);
		case { model: Connected(state), action: PostArrived(post) }:
			var next = Connected(
				copy(state, { posts: cons(post, state.posts) })
			);
			result(next, []);
		default:
			result(model, []);
		}
	}
	static function result(next: Model, tasks: Array<Task>): UpdateResult<Model, Task> {
		return { model: next, tasks: tasks };
	}
}
