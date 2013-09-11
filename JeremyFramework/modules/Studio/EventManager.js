var __EventManager = {
	init : function() {
		console.log('Init: JeremyStudio.EventManager');
		__EventManager.type = 'EventManager';
		__EventManager.events = {};
	},
	setEvent : function(name, sender, event, callback) {
		return __EventManager.events[name] = {
			sender : sender,
			event : event,
			callback : callback
		};
	},
	getEvent : function(name) {
		var eventObj = __EventManager.events[name];
		if (eventObj) {
			return eventObj;
		} else {
			throw new Error('getEvent : Undefined Event');
		}
	},
	bindEvent : function(name) {
		var eventObj = __EventManager.getEvent(name);
		if (eventObj) {
			$(eventObj.sender).bind(eventObj.event, eventObj.callback);
		} else {
			throw new Error('bindEvent : Undefined Event');
		}
	},
	unbindEvent : function(name) {
		var eventObj = __EventManager.getEvent(name);
		if (eventObj) {
			$(eventObj.sender).unbind(eventObj.event, eventObj.callback);
		} else {
			throw new Error('unbindEvent : Undefined Event');
		}
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('EventManager', __EventManager);
		target.addInterface('Event', {
			get : __EventManager.getEvent,
			set : __EventManager.setEvent,
			bind : __EventManager.bindEvent,
			unbind : __EventManager.unbindEvent
		});
	}
})(); 