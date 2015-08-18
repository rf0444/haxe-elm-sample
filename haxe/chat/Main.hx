package chat;

import lib.elm.App;
import lib.elm.Signal;

import chat.Action;
import chat.Model;
import chat.TaskExecutor;
import chat.Update;
import chat.View;

class Main {
	public static function main() {
		var view = new View(js.Browser.document.querySelector("body > template"));
		var app = App.create({
			model: Models.init(),
			update: Update.update,
			view: view.view
		});
		App.renderToBody(app.main());
		var exec = new TaskExecutor();
		app.task().stream().assign(function(task) {
			exec.exec(app.address(), task);
		});
		app.address().send(Init);
	}
}
