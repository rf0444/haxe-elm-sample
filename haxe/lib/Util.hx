package lib;

class Util {
	public static function copy<T>(x: T, modify: T -> Void): T {
		var ret = Reflect.copy(x);
		modify(ret);
		return ret;
	}
}
