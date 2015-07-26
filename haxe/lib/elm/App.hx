package lib.elm;

import lib.Bacon;
import lib.elm.Signal;

typedef UpdateResult<M, T> = {
	model: M,
	tasks: Array<T>
};
typedef AppOption<M, A, T, V> = {
	model: M,
	update: A -> M -> UpdateResult<M, T>,
	view: Address<A> -> M -> V
};
class App<A, T, V> {
	var main_: Signal<V>;
	var address_: Address<A>;
	var task_: Signal<T>;
	function new(main: Signal<V>, address: Address<A>, task: Signal<T>) {
		this.main_ = main;
		this.address_ = address;
		this.task_ = task;
	}
	public function main(): Signal<V> {
		return main_;
	}
	public function address(): Address<A> {
		return address_;
	}
	public function task(): Signal<T> {
		return task_;
	}
	public static function create<M, A, T, V>(option: AppOption<M, A, T, V>): App<A, T, V> {
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
		var main: Signal<V> = Signal
			.fromStream(
				model.stream()
					.map(function(m) { return option.view(actions.address(), m); })
			)
		;
		return new App(main, actions.address(), task);
	}
}
