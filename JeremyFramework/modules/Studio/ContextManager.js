/**
 * @author Jeremy
 */
var __ContextManager = {
	currentContext : null,
	needUpdate : false,
	isPlaying : false,
	loadCounter : 0,
	init : function() {
		console.log('Init: JeremyStudio.ContextManager');
		__ContextManager.type = 'ContextManager';
		__ContextManager.contexts = {};
		__ContextManager.loadContexts(Jeremy.getConfig('scene'));
	},
	update : function() {
		if (__ContextManager.loadCounter !== 0) {
			return;
		}
		if (__ContextManager.needUpdate) {
			if (__ContextManager.getCurrentContext()) {
				__ContextManager.getCurrentContext().destroy();
			}
			__ContextManager.changeCurrentContext();
			__ContextManager.getCurrentContext().init();
			__ContextManager.needUpdate = false;
		}
		__ContextManager.getCurrentContext().update();
	},
	loadContexts : function(config) {
		config.scenes.forEach(function(item) {
			__ContextManager.loadContext(item.context);
		});
	},
	loadContext : function(contextConfig) {
		__ContextManager.loadCounter++;
		$.ajax({
			type : "GET",
			url : contextConfig.url,
			dataType : "script"
		}).done(function(data) {
			__ContextManager.loadCounter--;
			console.log('SceneContext Loaded : ' + contextConfig.name);
		});
	},
	addContext : function(context) {
		__ContextManager.contexts[context.name] = context;
	},
	getContext : function(name) {
		return __ContextManager.contexts[name];
	},
	changeCurrentContext : function() {
		var currScene = J('STU')('Scene').getCurr();
		__ContextManager.currentContext = __ContextManager.getContext(currScene.context.name);
	},
	getCurrentContext : function() {
		return __ContextManager.currentContext;
	},
	setNeedUpdate : function() {
		__ContextManager.needUpdate = true;
	},
	setPlaying : function(isPlaying) {
		__ContextManager.isPlaying = isPlaying;
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('ContextManager', __ContextManager);
		target.addInterface('Context', {
			add : __ContextManager.addContext,
			get : __ContextManager.getContext,
			current : __ContextManager.getCurrentContext,
			update : __ContextManager.update,
			setNeedUpdate : __ContextManager.setNeedUpdate,
			setPlaying : __ContextManager.setPlaying
		});
	}
})();