(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
function $extend(from, fields) {
	function Inherit() {} Inherit.prototype = from; var proto = new Inherit();
	for (var name in fields) proto[name] = fields[name];
	if( fields.toString !== Object.prototype.toString ) proto.toString = fields.toString;
	return proto;
}
var DateTools = function() { };
DateTools.__name__ = true;
DateTools.__format_get = function(d,e) {
	switch(e) {
	case "%":
		return "%";
	case "C":
		return StringTools.lpad(Std.string(Std["int"](d.getFullYear() / 100)),"0",2);
	case "d":
		return StringTools.lpad(Std.string(d.getDate()),"0",2);
	case "D":
		return DateTools.__format(d,"%m/%d/%y");
	case "e":
		return Std.string(d.getDate());
	case "F":
		return DateTools.__format(d,"%Y-%m-%d");
	case "H":case "k":
		return StringTools.lpad(Std.string(d.getHours()),e == "H"?"0":" ",2);
	case "I":case "l":
		var hour = d.getHours() % 12;
		return StringTools.lpad(Std.string(hour == 0?12:hour),e == "I"?"0":" ",2);
	case "m":
		return StringTools.lpad(Std.string(d.getMonth() + 1),"0",2);
	case "M":
		return StringTools.lpad(Std.string(d.getMinutes()),"0",2);
	case "n":
		return "\n";
	case "p":
		if(d.getHours() > 11) return "PM"; else return "AM";
		break;
	case "r":
		return DateTools.__format(d,"%I:%M:%S %p");
	case "R":
		return DateTools.__format(d,"%H:%M");
	case "s":
		return Std.string(Std["int"](d.getTime() / 1000));
	case "S":
		return StringTools.lpad(Std.string(d.getSeconds()),"0",2);
	case "t":
		return "\t";
	case "T":
		return DateTools.__format(d,"%H:%M:%S");
	case "u":
		var t = d.getDay();
		if(t == 0) return "7"; else if(t == null) return "null"; else return "" + t;
		break;
	case "w":
		return Std.string(d.getDay());
	case "y":
		return StringTools.lpad(Std.string(d.getFullYear() % 100),"0",2);
	case "Y":
		return Std.string(d.getFullYear());
	default:
		throw new js__$Boot_HaxeError("Date.format %" + e + "- not implemented yet.");
	}
};
DateTools.__format = function(d,f) {
	var r = new StringBuf();
	var p = 0;
	while(true) {
		var np = f.indexOf("%",p);
		if(np < 0) break;
		r.addSub(f,p,np - p);
		r.add(DateTools.__format_get(d,HxOverrides.substr(f,np + 1,1)));
		p = np + 2;
	}
	r.addSub(f,p,f.length - p);
	return r.b;
};
DateTools.format = function(d,f) {
	return DateTools.__format(d,f);
};
var HxOverrides = function() { };
HxOverrides.__name__ = true;
HxOverrides.substr = function(s,pos,len) {
	if(pos != null && pos != 0 && len != null && len < 0) return "";
	if(len == null) len = s.length;
	if(pos < 0) {
		pos = s.length + pos;
		if(pos < 0) pos = 0;
	} else if(len < 0) len = s.length + len - pos;
	return s.substr(pos,len);
};
Math.__name__ = true;
var Std = function() { };
Std.__name__ = true;
Std.string = function(s) {
	return js_Boot.__string_rec(s,"");
};
Std["int"] = function(x) {
	return x | 0;
};
var StringBuf = function() {
	this.b = "";
};
StringBuf.__name__ = true;
StringBuf.prototype = {
	add: function(x) {
		this.b += Std.string(x);
	}
	,addSub: function(s,pos,len) {
		if(len == null) this.b += HxOverrides.substr(s,pos,null); else this.b += HxOverrides.substr(s,pos,len);
	}
};
var StringTools = function() { };
StringTools.__name__ = true;
StringTools.lpad = function(s,c,l) {
	if(c.length <= 0) return s;
	while(s.length < l) s = c + s;
	return s;
};
var chat_Action = { __ename__ : true, __constructs__ : ["Init","ConnectionFormInput","Connect","MqttInfoResponse","ResponseError","Connected","PostArrived","PostFormInput","Post"] };
chat_Action.Init = ["Init",0];
chat_Action.Init.toString = $estr;
chat_Action.Init.__enum__ = chat_Action;
chat_Action.ConnectionFormInput = function(f) { var $x = ["ConnectionFormInput",1,f]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.Connect = ["Connect",2];
chat_Action.Connect.toString = $estr;
chat_Action.Connect.__enum__ = chat_Action;
chat_Action.MqttInfoResponse = function(info) { var $x = ["MqttInfoResponse",3,info]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.ResponseError = function(err) { var $x = ["ResponseError",4,err]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.Connected = ["Connected",5];
chat_Action.Connected.toString = $estr;
chat_Action.Connected.__enum__ = chat_Action;
chat_Action.PostArrived = function(post) { var $x = ["PostArrived",6,post]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.PostFormInput = function(f) { var $x = ["PostFormInput",7,f]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.Post = function(time) { var $x = ["Post",8,time]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
var chat_Task = { __ename__ : true, __constructs__ : ["RequestMqtt","MqttConnect","MqttSend"] };
chat_Task.RequestMqtt = ["RequestMqtt",0];
chat_Task.RequestMqtt.toString = $estr;
chat_Task.RequestMqtt.__enum__ = chat_Task;
chat_Task.MqttConnect = function(info) { var $x = ["MqttConnect",1,info]; $x.__enum__ = chat_Task; $x.toString = $estr; return $x; };
chat_Task.MqttSend = function(post) { var $x = ["MqttSend",2,post]; $x.__enum__ = chat_Task; $x.toString = $estr; return $x; };
var chat_Main = function() { };
chat_Main.__name__ = true;
chat_Main.main = function() {
	var view = new chat_View(window.document.querySelector("body > template"));
	var app = lib_elm_App.create({ model : chat_Models.init(), update : chat_Update.update, view : $bind(view,view.view)});
	lib_elm_App.renderToBody(app.main());
	var exec = new chat_TaskExecutor();
	app.task().stream().assign(function(task) {
		exec.exec(app.address(),task);
	});
	app.address().send(chat_Action.Init);
};
var chat_Model = { __ename__ : true, __constructs__ : ["NotConnected","Connecting","Connected"] };
chat_Model.NotConnected = function(state) { var $x = ["NotConnected",0,state]; $x.__enum__ = chat_Model; $x.toString = $estr; return $x; };
chat_Model.Connecting = function(state) { var $x = ["Connecting",1,state]; $x.__enum__ = chat_Model; $x.toString = $estr; return $x; };
chat_Model.Connected = function(state) { var $x = ["Connected",2,state]; $x.__enum__ = chat_Model; $x.toString = $estr; return $x; };
var chat_Models = function() { };
chat_Models.__name__ = true;
chat_Models.init = function() {
	return chat_Model.NotConnected({ form : { name : ""}});
};
var chat_TaskExecutor = function() {
};
chat_TaskExecutor.__name__ = true;
chat_TaskExecutor.prototype = {
	exec: function(address,task) {
		switch(task[1]) {
		case 0:
			var info = { };
			address.send(chat_Action.MqttInfoResponse(info));
			break;
		case 1:
			var info1 = task[2];
			haxe_Timer.delay(function() {
				address.send(chat_Action.Connected);
			},1000);
			break;
		case 2:
			var post = task[2];
			address.send(chat_Action.PostArrived(post));
			break;
		}
	}
};
var chat_Update = function() { };
chat_Update.__name__ = true;
chat_Update.update = function(action,model) {
	{
		var _g_model = model;
		var _g_action = action;
		switch(_g_model[1]) {
		case 0:
			switch(_g_action[1]) {
			case 1:
				var state = _g_model[2];
				var f = _g_action[2];
				var next = chat_Model.NotConnected(lib_Util.copy(state,{ form : f(state.form)}));
				return chat_Update.result(next,[]);
			case 2:
				var state1 = _g_model[2];
				switch(_g_model[2].form.name) {
				case "":
					return chat_Update.result(model,[]);
				default:
					var next1 = chat_Model.Connecting({ name : state1.form.name});
					return chat_Update.result(next1,[chat_Task.RequestMqtt]);
				}
				break;
			default:
				return chat_Update.result(model,[]);
			}
			break;
		case 1:
			switch(_g_action[1]) {
			case 4:
				var next2 = chat_Model.NotConnected({ form : { name : ""}});
				return chat_Update.result(next2,[]);
			case 3:
				var state2 = _g_model[2];
				var info = _g_action[2];
				return chat_Update.result(model,[chat_Task.MqttConnect(info)]);
			case 5:
				var state3 = _g_model[2];
				var next3 = chat_Model.Connected({ name : state3.name, form : { content : ""}, posts : []});
				return chat_Update.result(next3,[]);
			default:
				return chat_Update.result(model,[]);
			}
			break;
		case 2:
			switch(_g_action[1]) {
			case 7:
				var state4 = _g_model[2];
				var f1 = _g_action[2];
				var next4 = chat_Model.Connected(lib_Util.copy(state4,{ form : f1(state4.form)}));
				return chat_Update.result(next4,[]);
			case 8:
				var state5 = _g_model[2];
				switch(_g_model[2].form.content) {
				case "":
					return chat_Update.result(model,[]);
				default:
					var time = _g_action[2];
					var next5 = chat_Model.Connected(lib_Util.copy(state5,{ form : lib_Util.copy(state5.form,{ content : ""})}));
					var post = { user : state5.name, time : time, content : state5.form.content};
					return chat_Update.result(next5,[chat_Task.MqttSend(post)]);
				}
				break;
			case 6:
				var state6 = _g_model[2];
				var post1 = _g_action[2];
				var next6 = chat_Model.Connected(lib_Util.copy(state6,{ posts : lib_Util.cons(post1,state6.posts)}));
				return chat_Update.result(next6,[]);
			default:
				return chat_Update.result(model,[]);
			}
			break;
		}
	}
};
chat_Update.result = function(next,tasks) {
	return { model : next, tasks : tasks};
};
var chat_State = { __ename__ : true, __constructs__ : ["None","Post"] };
chat_State.None = ["None",0];
chat_State.None.toString = $estr;
chat_State.None.__enum__ = chat_State;
chat_State.Post = function(post) { var $x = ["Post",1,post]; $x.__enum__ = chat_State; $x.toString = $estr; return $x; };
var lib_VirtualDoms = function() { };
lib_VirtualDoms.__name__ = true;
lib_VirtualDoms.instance = function() {
	return window.virtualDom;
};
lib_VirtualDoms.fromHtml = function(html) {
	return window.vdomVirtualize.fromHTML(html);
};
lib_VirtualDoms.text = function(str) {
	var d = lib_VirtualDoms.instance();
	return d.h("",[str]).children[0];
};
lib_VirtualDoms.copy = function(dom,properties,children) {
	var d = lib_VirtualDoms.instance();
	var _g = dom.type;
	switch(_g) {
	case "VirtualText":
		return lib_VirtualDoms.text(dom.text);
	default:
		var p;
		if(properties == null) p = dom.properties; else p = properties;
		var c;
		if(children == null) c = dom.children; else c = children;
		return d.h(dom.tagName,p,c);
	}
};
var chat_View = function(template) {
	this.tdom = lib_VirtualDoms.fromHtml("<div>" + template.innerHTML + "</div>");
};
chat_View.__name__ = true;
chat_View.timeToString = function(time) {
	return DateTools.format((function($this) {
		var $r;
		var d = new Date();
		d.setTime(time);
		$r = d;
		return $r;
	}(this)),"%Y/%m/%d %H:%M:%S");
};
chat_View.prototype = {
	view: function(address,model) {
		return this.traverse(this.tdom,model,chat_State.None,address)[0];
	}
	,traverse: function(dom,model,state,address) {
		var _g1 = this;
		if(dom.properties == null || dom.properties.dataset == null) return this.withChildren(dom,{ },model,state,address);
		var binds = dom.properties.dataset;
		var show;
		{
			var _g = binds.state;
			if(_g == null) show = true; else switch(_g) {
			case "NotConnected":
				switch(model[1]) {
				case 0:
					var s = model[2];
					show = true;
					break;
				default:
					show = false;
				}
				break;
			case "Connecting":
				switch(model[1]) {
				case 1:
					var s1 = model[2];
					show = true;
					break;
				default:
					show = false;
				}
				break;
			case "Connected":
				switch(model[1]) {
				case 2:
					var s2 = model[2];
					show = true;
					break;
				default:
					show = false;
				}
				break;
			default:
				show = false;
			}
		}
		if(!show) return [];
		var rows;
		{
			var _g2 = binds.rows;
			if(_g2 != null) switch(_g2) {
			case "posts":
				switch(model[1]) {
				case 2:
					switch(state[1]) {
					case 0:
						var s3 = model[2];
						rows = s3.posts.map(function(p) {
							return _g1.traverse(dom,model,chat_State.Post(p),address);
						});
						break;
					default:
						rows = null;
					}
					break;
				default:
					rows = null;
				}
				break;
			default:
				rows = null;
			} else rows = null;
		}
		if(rows != null) return lib_Util.flatten(rows);
		var ext = { properties : lib_Util.copy(dom.properties,{ })};
		{
			var _g3 = binds.input;
			if(_g3 != null) switch(_g3) {
			case "user.name":
				switch(model[1]) {
				case 0:
					var s4 = model[2];
					ext.properties.value = s4.form.name;
					ext.properties.oninput = function(e) {
						var value = e.target.value;
						var f = function(form) {
							return { name : value};
						};
						address.send(chat_Action.ConnectionFormInput(f));
					};
					break;
				default:
				}
				break;
			case "post.content":
				switch(model[1]) {
				case 2:
					var s5 = model[2];
					ext.properties.value = s5.form.content;
					ext.properties.oninput = function(e1) {
						var value1 = e1.target.value;
						var f1 = function(form1) {
							return { content : value1};
						};
						address.send(chat_Action.PostFormInput(f1));
					};
					break;
				default:
				}
				break;
			default:
			} else {
			}
		}
		var _g4 = binds.click;
		if(_g4 != null) switch(_g4) {
		case "connect":
			ext.properties.onclick = function(e2) {
				address.send(chat_Action.Connect);
			};
			break;
		case "post":
			ext.properties.onclick = function(e3) {
				address.send(chat_Action.Post(e3.timeStamp));
			};
			break;
		default:
		} else {
		}
		var text;
		{
			var _g5 = binds.text;
			if(_g5 != null) switch(_g5) {
			case "user":
				switch(model[1]) {
				case 2:
					var s6 = model[2];
					text = "user: " + s6.name;
					break;
				default:
					text = null;
				}
				break;
			case "post.user":
				switch(model[1]) {
				case 2:
					switch(state[1]) {
					case 1:
						var p1 = state[2];
						text = p1.user;
						break;
					default:
						text = null;
					}
					break;
				default:
					text = null;
				}
				break;
			case "post.content":
				switch(model[1]) {
				case 2:
					switch(state[1]) {
					case 1:
						var p2 = state[2];
						text = p2.content;
						break;
					default:
						text = null;
					}
					break;
				default:
					text = null;
				}
				break;
			case "post.time":
				switch(model[1]) {
				case 2:
					switch(state[1]) {
					case 1:
						var p3 = state[2];
						text = chat_View.timeToString(p3.time);
						break;
					default:
						text = null;
					}
					break;
				default:
					text = null;
				}
				break;
			default:
				text = null;
			} else text = null;
		}
		if(text != null) ext.children = [lib_VirtualDoms.text(text)];
		return this.withChildren(dom,ext,model,state,address);
	}
	,withChildren: function(dom,ext,model,state,address) {
		var _g = this;
		if(dom.children == null) return [lib_VirtualDoms.copy(dom,lib_Util.copy(dom.properties,ext.properties))];
		if(ext.children != null) return [lib_VirtualDoms.copy(dom,lib_Util.copy(dom.properties,ext.properties),ext.children)];
		var children = lib_Util.flatten(dom.children.map(function(child) {
			return _g.traverse(child,model,state,address);
		}));
		return [lib_VirtualDoms.copy(dom,lib_Util.copy(dom.properties,ext.properties),children)];
	}
};
var haxe_Timer = function(time_ms) {
	var me = this;
	this.id = setInterval(function() {
		me.run();
	},time_ms);
};
haxe_Timer.__name__ = true;
haxe_Timer.delay = function(f,time_ms) {
	var t = new haxe_Timer(time_ms);
	t.run = function() {
		t.stop();
		f();
	};
	return t;
};
haxe_Timer.prototype = {
	stop: function() {
		if(this.id == null) return;
		clearInterval(this.id);
		this.id = null;
	}
	,run: function() {
	}
};
var js__$Boot_HaxeError = function(val) {
	Error.call(this);
	this.val = val;
	this.message = String(val);
	if(Error.captureStackTrace) Error.captureStackTrace(this,js__$Boot_HaxeError);
};
js__$Boot_HaxeError.__name__ = true;
js__$Boot_HaxeError.__super__ = Error;
js__$Boot_HaxeError.prototype = $extend(Error.prototype,{
});
var js_Boot = function() { };
js_Boot.__name__ = true;
js_Boot.__string_rec = function(o,s) {
	if(o == null) return "null";
	if(s.length >= 5) return "<...>";
	var t = typeof(o);
	if(t == "function" && (o.__name__ || o.__ename__)) t = "object";
	switch(t) {
	case "object":
		if(o instanceof Array) {
			if(o.__enum__) {
				if(o.length == 2) return o[0];
				var str2 = o[0] + "(";
				s += "\t";
				var _g1 = 2;
				var _g = o.length;
				while(_g1 < _g) {
					var i1 = _g1++;
					if(i1 != 2) str2 += "," + js_Boot.__string_rec(o[i1],s); else str2 += js_Boot.__string_rec(o[i1],s);
				}
				return str2 + ")";
			}
			var l = o.length;
			var i;
			var str1 = "[";
			s += "\t";
			var _g2 = 0;
			while(_g2 < l) {
				var i2 = _g2++;
				str1 += (i2 > 0?",":"") + js_Boot.__string_rec(o[i2],s);
			}
			str1 += "]";
			return str1;
		}
		var tostr;
		try {
			tostr = o.toString;
		} catch( e ) {
			if (e instanceof js__$Boot_HaxeError) e = e.val;
			return "???";
		}
		if(tostr != null && tostr != Object.toString && typeof(tostr) == "function") {
			var s2 = o.toString();
			if(s2 != "[object Object]") return s2;
		}
		var k = null;
		var str = "{\n";
		s += "\t";
		var hasp = o.hasOwnProperty != null;
		for( var k in o ) {
		if(hasp && !o.hasOwnProperty(k)) {
			continue;
		}
		if(k == "prototype" || k == "__class__" || k == "__super__" || k == "__interfaces__" || k == "__properties__") {
			continue;
		}
		if(str.length != 2) str += ", \n";
		str += s + k + " : " + js_Boot.__string_rec(o[k],s);
		}
		s = s.substring(1);
		str += "\n" + s + "}";
		return str;
	case "function":
		return "<function>";
	case "string":
		return o;
	default:
		return String(o);
	}
};
var lib_Bacons = function() { };
lib_Bacons.__name__ = true;
lib_Bacons.bus = function() {
	var bacon = lib_Bacons.Bacon;
	return new bacon.Bus();
};
var lib_MqttClient = function(client) {
	this.client = client;
};
lib_MqttClient.__name__ = true;
lib_MqttClient.connect = function(info,onConnect,onMessageArrived) {
	var client = lib_MqttClient.createClient(info);
	client.onMessageArrived = function(message) {
		onMessageArrived(message.payloadString);
	};
	client.connect({ timeout : 3, userName : info.username, password : info.password, onSuccess : function() {
		onConnect(new lib_MqttClient(client));
	}});
};
lib_MqttClient.createClient = function(info) {
	var f = function(x) { return new window.Paho.MQTT.Client(x.host, x.port, x.clientId); }
	return f(info);
};
lib_MqttClient.createMesasge = function(message) {
	var f = function(x) { return new window.Paho.MQTT.Message(x); }
	return f(message);
};
lib_MqttClient.prototype = {
	subscribe: function(destination,onSuccess) {
		this.client.subscribe(destination,{ qos : 0, onSuccess : onSuccess});
	}
	,send: function(destination,message) {
		if(this.client == null) return;
		var m = lib_MqttClient.createMesasge(message);
		m.destinationName = destination;
		m.qos = 0;
		m.retained = false;
		this.client.send(m);
	}
};
var lib_Util = function() { };
lib_Util.__name__ = true;
lib_Util.copy = function(x,ext) {
	var jq = $;
	return jq.extend({ },x,ext);
};
lib_Util.ajax = function(option) {
	var jq = $;
	jq.ajax(option);
};
lib_Util.cons = function(a,b) {
	return Array.prototype.concat(a, b);
};
lib_Util.flatten = function(xss) {
	return Array.prototype.concat.apply([], xss);
};
var lib_elm_App = function(main,address,task) {
	this.main_ = main;
	this.address_ = address;
	this.task_ = task;
};
lib_elm_App.__name__ = true;
lib_elm_App.create = function(option) {
	var actions = lib_elm_Signal.mailbox();
	var initM = { model : option.model, tasks : []};
	var next = function(current,action) {
		return option.update(action,current.model);
	};
	var modelWithTask = lib_elm_Signal.fromStream(actions.signal().stream().scan(initM,next).toEventStream());
	var model = lib_elm_Signal.fromStream(modelWithTask.stream().map(function(x) {
		return x.model;
	}).skipDuplicates());
	var task = lib_elm_Signal.fromStream(modelWithTask.stream().flatMap(function(x1) {
		return lib_Bacons.Bacon.fromArray(x1.tasks);
	}));
	var main = lib_elm_Signal.fromStream(model.stream().map(function(m) {
		return option.view(actions.address(),m);
	}));
	return new lib_elm_App(main,actions.address(),task);
};
lib_elm_App.renderToBody = function(main) {
	var d = lib_VirtualDoms.instance();
	var root = null;
	var prev = null;
	main.stream().assign(function(html) {
		if(root == null) {
			root = d.create(html);
			window.document.body.appendChild(root);
			prev = html;
			return;
		}
		var ps = d.diff(prev,html);
		root = d.patch(root,ps);
		prev = html;
	});
};
lib_elm_App.prototype = {
	main: function() {
		return this.main_;
	}
	,address: function() {
		return this.address_;
	}
	,task: function() {
		return this.task_;
	}
};
var lib_elm_Signal = function(stream) {
	this.stream_ = stream;
};
lib_elm_Signal.__name__ = true;
lib_elm_Signal.fromStream = function(stream) {
	return new lib_elm_Signal(stream);
};
lib_elm_Signal.mailbox = function() {
	var bus = lib_Bacons.bus();
	return lib_elm_Mailbox.fromBus(bus);
};
lib_elm_Signal.prototype = {
	stream: function() {
		return this.stream_;
	}
};
var lib_elm_Address = function(send) {
	this.send_ = send;
};
lib_elm_Address.__name__ = true;
lib_elm_Address.fromBus = function(bus) {
	return new lib_elm_Address(function(x) {
		bus.push(x);
	});
};
lib_elm_Address.prototype = {
	send: function(x) {
		this.send_(x);
	}
	,forwardTo: function(f) {
		var _g = this;
		return new lib_elm_Address(function(x) {
			_g.send(f(x));
		});
	}
};
var lib_elm_Mailbox = function(signal,address) {
	this.signal_ = signal;
	this.address_ = address;
};
lib_elm_Mailbox.__name__ = true;
lib_elm_Mailbox.fromBus = function(bus) {
	return new lib_elm_Mailbox(lib_elm_Signal.fromStream(bus),lib_elm_Address.fromBus(bus));
};
lib_elm_Mailbox.prototype = {
	signal: function() {
		return this.signal_;
	}
	,address: function() {
		return this.address_;
	}
};
var $_, $fid = 0;
function $bind(o,m) { if( m == null ) return null; if( m.__id__ == null ) m.__id__ = $fid++; var f; if( o.hx__closures__ == null ) o.hx__closures__ = {}; else f = o.hx__closures__[m.__id__]; if( f == null ) { f = function(){ return f.method.apply(f.scope, arguments); }; f.scope = o; f.method = m; o.hx__closures__[m.__id__] = f; } return f; }
String.__name__ = true;
Array.__name__ = true;
Date.__name__ = ["Date"];
if(Array.prototype.map == null) Array.prototype.map = function(f) {
	var a = [];
	var _g1 = 0;
	var _g = this.length;
	while(_g1 < _g) {
		var i = _g1++;
		a[i] = f(this[i]);
	}
	return a;
};
chat_View.d = lib_VirtualDoms.instance();
lib_Bacons.Bacon = window.Bacon;
chat_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
