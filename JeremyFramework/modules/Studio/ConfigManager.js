/**
 * @author Jeremy
 */
var __ConfigManager = {
	init : function() {
		console.log('Init: JeremyStudio.ConfigManager');
		__ConfigManager.type = 'ConfigManager';
		__ConfigManager.configs = {};
		__ConfigManager.load();
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
				__ConfigManager.configIterator = configQueue.iterator();
				__ConfigManager.loadConfig();
			}
		});
	},
	loadConfig : function() {
		var config = null;
		if (__ConfigManager.configIterator.hasMoreElement()) {
			config = __ConfigManager.configIterator.next();
			J('STD')('Request').request({
				method : 'get',
				url : config.path,
				dataType : 'json',
				onSuccess : function(res) {
					__ConfigManager.addConfig(config.name, res);
					__ConfigManager.loadConfig();
				}
			});
		} else {
			delete __ConfigManager.configIterator;
		}
	},
	addConfig : function(name, config) {
		__ConfigManager.configs[name] = config;
	},
	getConfig : function(name) {
		return __ConfigManager.configs[name];
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('ConfigManager', __ConfigManager);
		target.addInterface('Config', {
			get : __ConfigManager.getConfig
		});
	}
})();
