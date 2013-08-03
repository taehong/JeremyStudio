/**
 * @author Jeremy
 */
var Jeremy = {
	init : function() {
		console.log('Init: Jeremy');
		Jeremy.type = 'Jeremy';
		Jeremy.configs = {};
		// Jeremy.load();
		// Jeremy.components.JeremyStudio.init();
	},
	components : {},
	interfaces : {},
	isDefinedComponent : function(name) {
		return (Jeremy.components[name] != undefined ? true : false);
	},
	isDefinedInterface : function(name) {
		return (Jeremy.interfaces[name] != undefined ? true : false);
	},
	getComponent : function(name) {
		return Jeremy.components[name];
	},
	addComponent : function(name, component) {
		Jeremy.components[name] = component;
	},
	getInterface : function(name) {
		return Jeremy.interfaces[name];
	},
	addInterface : function(name, interface) {
		Jeremy.interfaces[name] = interface;
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
		Jeremy.request({
			method : 'get',
			url : 'game/config.json',
			dataType : 'json',
			onSuccess : function(res) {
				var path = null, configQueue = new JeremyQueue();
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
		if (Jeremy.configIterator.hasMoreElement()) {
			config = Jeremy.configIterator.next();
			Jeremy.request({
				method : 'get',
				url : config.path,
				dataType : 'json',
				onSuccess : function(res) {
					Jeremy.addConfig(config.name, res);
					Jeremy.loadConfig();
				}
			});
		} else {
			delete Jeremy.configIterator;
		}
	},
	addConfig : function(name, config) {
		Jeremy.configs[name] = config;
	},
	getConfig : function(name) {
		return Jeremy.configs[name];
	}
}, eJeremyComponentType = {
	JeremyStudio : 'STU',
	JeremyLibrary : 'LIB',
	JeremyDataStructure : 'DAT',
	JeremyMathematics : 'MAT'
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