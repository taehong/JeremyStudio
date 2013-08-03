/**
 * @author Jeremy
 */
var __ContextManager = {
	init : function() {
		console.log('Init: JeremyStudio.ContextManager');
		__ContextManager.type = 'ContextManager';
		__ContextManager.contexts = {};
		__ContextManager.loadContexts(Jeremy.getConfig('scene'));
	},
	loadContexts : function(config) {
		config.scenes.forEach(function(item) {
			__ContextManager.loadContext(item.context);
		});
	},
	loadContext : function(contextConfig) {
		$.ajax({
			type : "GET",
			url : contextConfig.url,
			dataType : "script"
		}).done(function(data) {
			console.log('SceneContext Loaded : ' + contextConfig.name);
		});
	},
	addContext : function(name, context) {
		__ContextManager.contexts[name] = context;
	},
	getContext : function(name) {
		return __ContextManager.contexts[name];
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('ContextManager', __ContextManager);
		target.addInterface('Context', {
			add : __ContextManager.addContext,
			get : __ContextManager.getContext
		});
	}
})();