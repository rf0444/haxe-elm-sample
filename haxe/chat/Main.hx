package chat;

import lib.elm.App;
import lib.elm.Signal;

import chat.Action;
import chat.Model;
import chat.Task;
import chat.Update;
import chat.View;

class Main {
	public static function main() {
		var app = App.create({
			model: Models.init(),
			update: Update.update,
			view: View.view
		});
		App.renderToBody(app.main());
		app.task().stream().assign(function(task) {
			Tasks.exec(app.address(), task);
		});
		app.address().send(Init);
	}
}
