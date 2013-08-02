/**
 * @author Jeremy
 */
var __SceneManager = {
	init : function() {
		console.log('Init: JeremyStudio.ConfigManager');
		__SceneManager.type = 'ConfigManager';
		__SceneManager.configs = {};
		__SceneManager.load();
	},
	load : function() {
		J('STD')('Request').request({
			method : 'get',
			url : 'game/config.json',
			dataType : 'json',
			onSuccess : function(res) {
				var path = null, configQueue = J('LIB')('Queue')();
				res.files.forEach(function(item) {
					path = res.path + item;
					configQueue.enqueue({
						name : item.split('.')[0],
						path : path
					});
				});
				__SceneManager.configIterator = configQueue.iterator();
				__SceneManager.loadConfig();
			}
		});
	},
	loadConfig : function() {
		var config = null;
		if (__SceneManager.configIterator.hasMoreElement()) {
			config = __SceneManager.configIterator.next();
			J('STD')('Request').request({
				method : 'get',
				url : config.path,
				dataType : 'json',
				onSuccess : function(res) {
					__SceneManager.addConfig(config.name, res);
					__SceneManager.loadConfig();
				}
			});
		} else {
			delete __SceneManager.configIterator;
		}
	},
	addConfig : function(name, config) {
		__SceneManager.configs[name] = config;
	},
	getConfig : function(name) {
		return __SceneManager.configs[name];
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('SceneManager', __SceneManager);
		target.addInterface('Scene', {
			get : __SceneManager.getConfig
		});
	}
})();