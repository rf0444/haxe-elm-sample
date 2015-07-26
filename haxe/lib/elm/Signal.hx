package lib.elm;

import lib.Bacon;

class Signal<T> {
	var stream_: EventStream<T>;
	function new(stream: EventStream<T>) {
		this.stream_ = stream;
	}
	public function stream(): EventStream<T> {
		return this.stream_;
	}
	public static function fromStream<T>(stream: EventStream<T>): Signal<T> {
		return new Signal(stream);
	}
	public static function mailbox<T>(): Mailbox<T> {
		var bus = Bacons.bus();
		return Mailbox.fromBus(bus);
	}
}
class Address<T> {
	var send_: T -> Void;
	function new(send: T -> Void) {
		this.send_ = send;
	}
	public function send(x: T) {
		this.send_(x);
	}
	public function forwardTo<R>(f: R -> T): Address<R> {
		return new Address(function(x) { this.send(f(x)); });
	}
	public static function fromBus<T>(bus: Bus<T>) {
		return new Address(function(x) { bus.push(x); });
	}
}
class Mailbox<T> {
	var signal_: Signal<T>;
	var address_: Address<T>;
	function new(signal: Signal<T>, address: Address<T>) {
		this.signal_ = signal;
		this.address_ = address;
	}
	public function signal(): Signal<T> {
		return this.signal_;
	}
	public function address(): Address<T> {
		return this.address_;
	}
	public static function fromBus<T>(bus: Bus<T>): Mailbox<T> {
		return new Mailbox(Signal.fromStream(bus), Address.fromBus(bus));
	}
}
