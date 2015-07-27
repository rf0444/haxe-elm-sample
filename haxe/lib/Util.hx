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
		var f: T -> Array<T> -> Array<T> = untyped __js__("function(a, b) { return Array.prototype.concat(a, b); }");
		return f(a, b);
	}
}
