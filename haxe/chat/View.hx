package chat;

import lib.VirtualDom;
import lib.elm.Signal;

import chat.Action;
import chat.Model;

class View {
	static var d = VirtualDoms.instance();
	public static function view(address: Address<Action>, model: Model): Dynamic {
		var nav = d.h("nav.navbar.navbar-default", [
			d.h("div.container-fluid", [
				d.h("div.navbar-header", [
					d.h("a.navbar-brand", { href: "chat.html" }, "Chat Sample")
				])
			])
		]);
		var children = switch (model) {
		case NotConnected(state):
			[ d.h("div.row", [ userInput(address, state) ]) ];
		case Connecting(_):
			[ d.h("div.row", [ "接続中..." ]) ];
		case Connected(c):
			[
				d.h("div.row", { style: { padding: "0 20px 10px 0" } }, [ showUser(c.name) ]),
				d.h("div.row", { style: { padding: "10px" } }, [ postForm(address, c) ]),
				d.h("div.row", { style: { padding: "10px" } }, [ postList(c.posts) ])
			];
		};
		var content = d.h("div.container", [ children ]);
		return d.h("div", [ nav, content ]);
	}
	static function userInput(address: Address<Action>, state: NotConnectedState): Dynamic {
		return singleForm(address, state.form.name, "名前", "接続",
			function(value) {
				return ConnectionFormInput(function(form) {
					return { name: value };
				});
			},
			function(_) { return Connect; }
		);
	}
	static function showUser(user: String): Dynamic {
		return d.h("div", { style: { textAlign: "center" } }, [ 'user: ${user}' ]);
	}
	static function postForm(address: Address<Action>, state: ConnectedState): Dynamic {
		return singleForm(address, state.form.content, "メッセージ", "送信",
			function(value) {
				return PostFormInput(function(form) {
					return { content: value };
				});
			},
			function(e) { return Post(e.timeStamp); }
		);
	}
	static function postList(posts: Array<Post>): Dynamic {
		var head = d.h('thead', [
			d.h('th', { style: { width: "200px"} }, [ '送信者' ]),
			d.h('th', { style: { width: "auto" } }, [ 'メッセージ' ]),
			d.h('th', { style: { width: "200px"} }, [ '時刻' ])
		]);
		var toTr = function(post) {
			return d.h('tr', [
				d.h('td', [ post.user ]),
				d.h('td', [ post.content ]),
				d.h('td', [ timeToString(post.time) ]),
			]);
		};
		var body = d.h('tbody', posts.map(toTr));
		return d.h('table', [ head, body ]);
	}
	public static function timeToString(time: Int): String {
		return DateTools.format(Date.fromTime(time), '%Y/%m/%d %H:%M:%S');
	}
	static function singleForm(
		address: Address<Action>,
		value: String,
		placeholder: String,
		buttonText: String,
		onInput: String -> Action,
		onClick: Dynamic -> Action
	): Dynamic {
		var input = d.h("div", { style: { flex: 1, padding: "0 5px" } }, [
			d.h("input.form-control",
				{
					value: value,
					placeholder: placeholder,
					oninput: function(e) {
						address.send(onInput(e.target.value));
					}
				},
				[]
			)
		]);
		var button = d.h("div", { style: { width: "100px", padding: "0 5px", textAlign: "center" } }, [
			d.h("button.btn.btn-success",
				{
					style: { display: "block", width: "100%" },
					onclick: function(e) {
						address.send(onClick(e));
					}
				},
				[ buttonText ]
			)
		]);
		return d.h("div", { style: { display: "flex" } }, [ input, button ]);
	}
}
