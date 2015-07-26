package chat;

import chat.Action;
import chat.Model;

typedef Result = {
	model: Model,
	tasks: Array<Task>
};

class Update {
	public static function update(action: Action, model: Model): Result {
		return {
			model: model,
			tasks: []
		};
	}
}
