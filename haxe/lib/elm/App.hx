package lib.elm;

import lib.Bacon;
import lib.VirtualDom;
import lib.elm.Signal;

typedef View = Dynamic;

typedef UpdateResult<M, T> = {
	model: M,
	tasks: Array<T>
};
typedef AppOption<M, A, T> = {
	model: M,
	update: A -> M -> UpdateResult<M, T>,
	view: Address<A> -> M -> View
};
class App<A, T> {
	var main_: Signal<View>;
	var address_: Address<A>;
	var task_: Signal<T>;
	function new(main: Signal<View>, address: Address<A>, task: Signal<T>) {
		this.main_ = main;
		this.address_ = address;
		this.task_ = task;
	}
	public function main(): Signal<View> {
		return main_;
	}
	public function address(): Address<A> {
		return address_;
	}
	public function task(): Signal<T> {
		return task_;
	}
	public static function create<M, A, T>(option: AppOption<M, A, T>): App<A, T> {
		var actions: Mailbox<A> = Signal.mailbox();
		var initM: UpdateResult<M, T> = {
			model: option.model,
			tasks: []
		};
		var next: UpdateResult<M, T> -> A -> UpdateResult<M, T> = function(current, action) {
			return option.update(action, current.model);
		};
		var modelWithTask: Signal<UpdateResult<M, T>> = Signal
			.fromStream(
				actions.signal().stream().scan(initM, next).toEventStream()
			)
		;
		var model: Signal<M> = Signal
			.fromStream(
				modelWithTask.stream()
					.map(function(x) { return x.model; })
					.skipDuplicates()
			)
		;
		var task: Signal<T> = Signal
			.fromStream(
				modelWithTask.stream()
					.flatMap(function(x) { return Bacons.Bacon.fromArray(x.tasks); })
			)
		;
		var main: Signal<View> = Signal
			.fromStream(
				model.stream()
					.map(function(m) { return option.view(actions.address(), m); })
			)
		;
		return new App(main, actions.address(), task);
	}
	public static function renderToBody(main: Signal<View>) {
		var d = VirtualDoms.instance();
		var root = null;
		var prev = null;
		main.stream().assign(function(html) {
			if (root == null) {
				root = d.create(html);
				js.Browser.document.body.appendChild(root);
				prev = html;
				return;
			}
			var ps = d.diff(prev, html);
			root = d.patch(root, ps);
			prev = html;
		});
	}
}
