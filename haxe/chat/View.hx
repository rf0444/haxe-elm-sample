package chat;

import js.html.DOMElement;

import lib.Util.copy;
import lib.Util.flatten;
import lib.VirtualDom;
import lib.VirtualDom.VirtualDoms.text in dt;
import lib.VirtualDom.VirtualDoms.copy in dcopy;
import lib.elm.Signal;

import chat.Action;
import chat.Model;

typedef BindingData = {
	@:optional var state: String;
	@:optional var rows: String;
	@:optional var text: String;
	@:optional var input: String;
	@:optional var click: String;
};

enum State {
	None;
	Post(post: Post);
}
class View {
	static var d = VirtualDoms.instance();
	var tdom: Dynamic;
	public function new(template: DOMElement) {
		this.tdom = VirtualDoms.fromHtml('<div>${template.innerHTML}</div>');
	}
	public function view(address: Address<Action>, model: Model): Dynamic {
		return traverse(tdom, model, State.None, address)[0];
	}
	function traverse(dom: Dynamic, model: Model, state: State, address: Address<Action>): Array<Dynamic> {
		if (dom.properties == null || dom.properties.dataset == null) {
			return withChildren(dom, {}, model, state, address);
		}
		var binds: BindingData = dom.properties.dataset;
		var show = switch ([ binds.state, model ]) {
			case [ "NotConnected", NotConnected(s) ]: true;
			case [ "Connecting",   Connecting(s)   ]: true;
			case [ "Connected",    Connected(s)    ]: true;
			case [ null,           _               ]: true;
			case _                                  : false;
		};
		if (!show) {
			return [];
		}
		var rows = switch ([ binds.rows, model, state ]) {
			case [ "posts", Connected(s), None ]:
				s.posts.map(function(p) {
					return traverse(dom, model, Post(p), address);
				});
			case _                        : null;
		};
		if (rows != null) {
			return flatten(rows);
		}
		var ext: Dynamic = {
			properties: copy(dom.properties, {}),
		};
		switch ([ binds.input, model ]) {
			case [ "user.name", NotConnected(s) ]:
				ext.properties.value = s.form.name;
				ext.properties.oninput = function(e) {
					var value = e.target.value;
					var f = function(form) {
						return { name: value };
					};
					address.send(ConnectionFormInput(f));
				};
			case [ "post.content", Connected(s) ]:
				ext.properties.value = s.form.content;
				ext.properties.oninput = function(e) {
					var value = e.target.value;
					var f = function(form) {
						return { content: value };
					};
					address.send(PostFormInput(f));
				};
			default: 
		}
		switch (binds.click) {
			case "connect":
				ext.properties.onclick = function(e) {
					address.send(Connect);
				};
			case "post":
				ext.properties.onclick = function(e) {
					address.send(Post(e.timeStamp));
				};
			default: 
		}
		var text = switch ([ binds.text, model, state ]) {
			case [ "user",         Connected(s), _       ]: 'user: ${s.name}';
			case [ "post.user",    Connected(_), Post(p) ]: p.user;
			case [ "post.content", Connected(_), Post(p) ]: p.content;
			case [ "post.time",    Connected(_), Post(p) ]: timeToString(p.time);
			case _                                        : null;
		};
		if (text != null) {
			ext.children = [ dt(text) ];
		}
		return withChildren(dom, ext, model, state, address);
	}
	function withChildren(dom: Dynamic, ext: Dynamic, model: Model, state: State, address: Address<Action>): Array<Dynamic> {
		if (dom.children == null) {
			return [ dcopy(dom, copy(dom.properties, ext.properties)) ];
		}
		if (ext.children != null) {
			return [ dcopy(dom, copy(dom.properties, ext.properties), ext.children) ];
		}
		var children = flatten(
			dom.children.map(function(child) {
				return traverse(child, model, state, address);
			})
		);
		return [ dcopy(dom, copy(dom.properties, ext.properties), children) ];
	}
	public static function timeToString(time: Int): String {
		return DateTools.format(Date.fromTime(time), '%Y/%m/%d %H:%M:%S');
	}
}
