/**
 * @author Jeremy
 */
var __ConfigManager = {
	init : function() {
		console.log('Init: JeremyStudio.ConfigManager');
		this.type = 'ConfigManager';
		this.load();
	},
	load: function() {
		J('STD')('Request').request({
			method : 'get',
			url : 'game/config.json',
			dataType : 'json',
			onSuccess : function (res) {
				__ConfigManager.configFiles = [];
			}
		});
	},
	loadConfig : function(res) {
		var url = null;
		if (!res) {
			url = 'game/config.json'
		} else if (!res.index) {
			res.index = 0;
			url = res.path + res.files[res.index++];
		}
		J('STD')('Request').request({
			method : 'get',
			url : url,
			dataType : 'json',
			onSuccess : __ConfigManager.loadConfig
		});
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('ConfigManager', __ConfigManager);
		target.addInterface('Config', {

		});
	}
})();
