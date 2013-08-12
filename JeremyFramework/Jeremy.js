/**
 * @author Jeremy
 */
var Jeremy = {
	components : {},
	interfaces : {},
	configs : {},
	option : null,
	init : function(option) {
		console.log('Init: Jeremy');
		Jeremy.type = 'Jeremy';
		Jeremy.option = option;
		Jeremy.load();
	},
	request : function(argo) {
		var ajaxArgo = {
			type : argo.method,
			url : argo.url,
			dataType : argo.dataType
		};
		if (argo.data) {
			ajaxArgo.data = argo.data;
		}
		$.ajax(ajaxArgo).done(function(res) {
			argo.onSuccess(res);
		}).fail(function(jqXHR, textStatus) {
			console.log("Request failed: " + textStatus);
			if (argo.onFailure) {
				argo.onFailure(jqXHR, textStatus);
			}
		});
	},
	load : function() {
		$.event.trigger({
			type : eJeremyEventType.onLoadConfigs,
			time : new Date()
		});
		$.event.trigger({
			type : eJeremyEventType.onInitModules,
			time : new Date()
		});
		$('#jeremy').bind(eJeremyEventType.onLoadConfigs, function(e) {
			delete Jeremy.configIterator;
			$('#jeremy').unbind(eJeremyEventType.onLoadConfigs);
			Jeremy.initModules();
		});
		$('#jeremy').bind(eJeremyEventType.onInitModules, function(e) {
			delete Jeremy.moduleIterator;
			$('#jeremy').unbind(eJeremyEventType.onInitModules);
			Jeremy.run();
		});
		Jeremy.loadConfigs();
	},
	loadConfigs : function() {
		Jeremy.request({
			method : 'get',
			url : 'game/config.json',
			dataType : 'json',
			onSuccess : function(res) {
				var path = null, configQueue = new J('DAT')('Queue')();
				res.files.forEach(function(item) {
					path = res.path + item;
					configQueue.enqueue({
						name : item.split('.')[0],
						path : path
					});
				});
				Jeremy.configIterator = configQueue.iterator();
				Jeremy.loadConfig();
			}
		});
	},
	loadConfig : function() {
		var config = null;
		if (Jeremy.configIterator.hasNext()) {
			config = Jeremy.configIterator.next();
			Jeremy.request({
				method : 'get',
				url : config.path,
				dataType : 'json',
				onSuccess : function(res) {
					console.log('Config Loaded : ' + config.name);
					Jeremy.addConfig(config.name, res);
					Jeremy.loadConfig();
				}
			});
		} else {
			$('#jeremy').trigger(eJeremyEventType.onLoadConfigs);
		}
	},
	initModules : function() {
		var jeremyStudio = Jeremy.getComponent('JeremyStudio'), modules = jeremyStudio.modules, moduleName = null, moduleQueue = new J('DAT')('Queue')();
		for (moduleName in modules) {
			moduleQueue.enqueue(modules[moduleName]);
		}
		Jeremy.moduleIterator = moduleQueue.iterator();
		while (Jeremy.moduleIterator.hasNext()) {
			Jeremy.moduleIterator.next().init();
		}
		$('#jeremy').trigger(eJeremyEventType.onInitModules);
	},
	run : function() {
		J('STU')('Scene').play(Jeremy.option.firstScene);
		J('STU')('RunLoop').start(Jeremy.option.runLoopOption);
	}
}, eJeremyComponentType = {
	JeremyStudio : 'STU',
	JeremyLibrary : 'LIB',
	JeremyDataStructure : 'DAT',
	JeremyMathematics : 'MAT'
}, eJeremyEventType = {
	onLoadConfigs : 'onLoadConfigs',
	onInitModules : 'onInitModules'
};
Jeremy.isDefinedComponent = function(name) {
	return (Jeremy.components[name] != undefined ? true : false);
};
Jeremy.isDefinedInterface = function(name) {
	return (Jeremy.interfaces[name] != undefined ? true : false);
};
Jeremy.getComponent = function(name) {
	return Jeremy.components[name];
};
Jeremy.addComponent = function(name, component) {
	Jeremy.components[name] = component;
};
Jeremy.getInterface = function(name) {
	return Jeremy.interfaces[name];
};
Jeremy.addInterface = function(name, interface) {
	Jeremy.interfaces[name] = interface;
};
Jeremy.addConfig = function(name, config) {
	Jeremy.configs[name] = config;
};
Jeremy.getConfig = function(name) {
	return Jeremy.configs[name];
};
function J(key) {
	var value;
	switch (key) {
		case eJeremyComponentType.JeremyStudio:
			value = Jeremy.getInterface('JS');
			break;
		case eJeremyComponentType.JeremyLibrary:
			value = Jeremy.getInterface('JL');
			break;
		case eJeremyComponentType.JeremyMathematics:
			value = Jeremy.getInterface('JM');
			break;
		case eJeremyComponentType.JeremyDataStructure:
			value = Jeremy.getInterface('JD');
			break;
	}
	return value;
}