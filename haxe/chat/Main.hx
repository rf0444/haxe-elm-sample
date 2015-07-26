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
		app.main().stream().assign(function(html) {
			
		});
		app.task().stream().assign(function(task) {
			Tasks.exec(app.address(), task);
		});
	}
}
