package lib;

class Util {
	public static function copy<T>(x: T, ext: Dynamic): T {
		var jq: Dynamic = untyped __js__("$");
		return jq.extend({}, x, ext);
	}
	public static function ajax(option: Dynamic) {
		var jq: Dynamic = untyped __js__("$");
		jq.ajax(option);
	}
	public static function cons<T>(a: T, b: Array<T>): Array<T> {
		return untyped __js__("Array.prototype.concat({0}, {1})", a, b);
	}
	public static function flatten<T>(xss: Array<Array<T>>): Array<T> {
		return untyped __js__("Array.prototype.concat.apply([], {0})", xss);
	}
}
