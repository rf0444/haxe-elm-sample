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
	public static function fromHtml(html: String): Dynamic {
		return untyped __js__("window.vdomVirtualize.fromHTML({0})", html);
	}
	public static function text(str: String): Dynamic {
		var d = instance();
		return d.h("", [ str ]).children[0];
	}
	public static function copy(dom: Dynamic, ?properties: Dynamic, ?children: Array<Dynamic>): Dynamic {
		var d = instance();
		return switch (dom.type) {
			case "VirtualText": text(dom.text);
			case _:
				var p = if (properties == null) dom.properties else properties;
				var c = if (children == null) dom.children else children;
				d.h(dom.tagName, p, c);
		};
	}
}
