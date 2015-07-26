(function (console) { "use strict";
var $estr = function() { return js_Boot.__string_rec(this,''); };
Math.__name__ = true;
var chat_Action = { __ename__ : true, __constructs__ : ["ConnectionFormInput","Connect","MqttInfoResponse","ResponseError","Connected","PostArrived","PostFormInput","Post"] };
chat_Action.ConnectionFormInput = function(f) { var $x = ["ConnectionFormInput",0,f]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.Connect = ["Connect",1];
chat_Action.Connect.toString = $estr;
chat_Action.Connect.__enum__ = chat_Action;
chat_Action.MqttInfoResponse = function(info) { var $x = ["MqttInfoResponse",2,info]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.ResponseError = function(err) { var $x = ["ResponseError",3,err]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.Connected = ["Connected",4];
chat_Action.Connected.toString = $estr;
chat_Action.Connected.__enum__ = chat_Action;
chat_Action.PostArrived = function(post) { var $x = ["PostArrived",5,post]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.PostFormInput = function(f) { var $x = ["PostFormInput",6,f]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
chat_Action.Post = function(time) { var $x = ["Post",7,time]; $x.__enum__ = chat_Action; $x.toString = $estr; return $x; };
var chat_Task = { __ename__ : true, __constructs__ : ["RequestMqtt","MqttConnect","MqttSend"] };
chat_Task.RequestMqtt = ["RequestMqtt",0];
chat_Task.RequestMqtt.toString = $estr;
chat_Task.RequestMqtt.__enum__ = chat_Task;
chat_Task.MqttConnect = function(info) { var $x = ["MqttConnect",1,info]; $x.__enum__ = chat_Task; $x.toString = $estr; return $x; };
chat_Task.MqttSend = function(post) { var $x = ["MqttSend",2,post]; $x.__enum__ = chat_Task; $x.toString = $estr; return $x; };
var chat_Main = function() { };
chat_Main.__name__ = true;
chat_Main.main = function() {
	var app = lib_elm_App.create({ model : chat_Models.init(), update : chat_Update.update, view : chat_View.view});
	app.main().stream().assign(function(html) {
	});
	app.task().stream().assign(function(task) {
		chat_Tasks.exec(app.address(),task);
	});
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
var chat_Tasks = function() { };
chat_Tasks.__name__ = true;
chat_Tasks.exec = function(address,task) {
};
var chat_Update = function() { };
chat_Update.__name__ = true;
chat_Update.update = function(action,model) {
	return { model : model, tasks : []};
};
var chat_View = function() { };
chat_View.__name__ = true;
chat_View.view = function(address,model) {
	return "hello";
};
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
String.__name__ = true;
Array.__name__ = true;
lib_Bacons.Bacon = window.Bacon;
chat_Main.main();
})(typeof console != "undefined" ? console : {log:function(){}});
