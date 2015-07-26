package lib;

extern class Bacon {
	public function combineAsArray<T>(xs: Array<Observable<T>>): Property<Array<T>>;
	@:overload(function<A, B, C, D>(f: A -> B -> C -> D, x: Observable<A>, y: Observable<B>, z: Observable<C>): Property<D>{})
	@:overload(function<A, B, C, D, E>(f: A -> B -> C -> D -> E, x: Observable<A>, y: Observable<B>, z: Observable<C>, w: Observable<D>): Property<E>{})
	public function combineWith<A, B, C>(f: A -> B -> C, x: Observable<A>, y: Observable<B>): Property<C>;
	public function constant<T>(x: T): Property<T>;
	public function fromArray<T>(xs: Array<T>): EventStream<T>;
	public function mergeAll<T>(xs: Array<EventStream<T>>): EventStream<T>;
	public function never<T>(): EventStream<T>;
	public function once<T>(x: T): EventStream<T>;
	public function zipAsArray<T>(xs: Array<Observable<T>>): EventStream<Array<T>>;
	@:overload(function<A, B, C, D>(f: A -> B -> C -> D, x: Observable<A>, y: Observable<B>, z: Observable<C>): EventStream<D>{})
	@:overload(function<A, B, C, D, E>(f: A -> B -> C -> D -> E, x: Observable<A>, y: Observable<B>, z: Observable<C>, w: Observable<D>): EventStream<E>{})
	public function zipWith<A, B, C>(f: A -> B -> C, x: Observable<A>, y: Observable<B>): EventStream<C>;
}
extern class Observable<T> {
	@:overload(function(): Void -> Void {})
	public function assign<R>(f: T -> R): Void -> Void;
}
extern class EventStream<T> extends Observable<T> {
	@:overload(function(s: String): EventStream<T>{})
	public function doAction<R>(f: T -> R): EventStream<T>;
	public function filter(f: T -> Bool): EventStream<T>;
	public function flatMap<R>(f: T -> EventStream<R>): EventStream<R>;
	public function flatMapFirst<R>(f: T -> EventStream<R>): EventStream<R>;
	public function flatMapLatest<R>(f: T -> EventStream<R>): EventStream<R>;
	public function log(): EventStream<T>;
	public function map<R>(f: T -> R): EventStream<R>;
	public function mapError<E>(f: E -> T): EventStream<T>;
	public function merge(x: EventStream<T>): EventStream<T>;
	public function scan<R>(x: R, f: R -> T -> R): Property<R>;
	@:overload(function(): EventStream<T>{})
	public function skipDuplicates(eq: T -> T -> Bool): EventStream<T>;
	public function take(n: Int): EventStream<T>;
	@:overload(function(): Property<T>{})
	public function toProperty(x: T): Property<T>;
}
extern class Property<T> extends Observable<T> {
	public function changes(): EventStream<T>;
	public function doAction<R>(f: T -> R): Property<T>;
	public function filter(f: T -> Bool): Property<T>;
	public function log(): Property<T>;
	public function map<R>(f: T -> R): Property<R>;
	public function sampledBy<R>(s: EventStream<R>): EventStream<T>;
	public function toEventStream(): EventStream<T>;
}
extern class Bus<T> extends EventStream<T> {
	public function end(): Void;
	public function plug(x: EventStream<T>): Void -> Void;
	public function push(x: T): Void;
}
class Bacons {
	public static var Bacon: Bacon = untyped __js__("window.Bacon");
	public static function bus<T>(): Bus<T> {
		var bacon = Bacons.Bacon;
		return untyped __js__("new bacon.Bus()");
	}
}
