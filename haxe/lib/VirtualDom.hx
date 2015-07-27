package lib;

extern class VirtualDom {
	@:overload(function(sel: String, children: Dynamic): Dynamic{})
	public function h(sel: String, properties: Dynamic, children: Dynamic): Dynamic;
	public function diff(a: Dynamic, b: Dynamic): Dynamic;
	public function patch(root: Dynamic, patches: Dynamic): Dynamic;
	@:overload(function(node: Dynamic): Dynamic{})
	public function create(node: Dynamic, ops: Dynamic): Dynamic;
}
class VirtualDoms {
	public static function instance(): VirtualDom {
		return untyped __js__("window.virtualDom");
	}
}
