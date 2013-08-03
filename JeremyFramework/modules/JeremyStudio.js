/**
 * @author Jeremy
 */
var __JeremyStudio = {
	init : function() {
		console.log('Init : JeremyStudio');
		__JeremyStudio.modules.RequestManager.init();
		__JeremyStudio.modules.ConfigManager.init();
		__JeremyStudio.modules.LayerManager.init();
		__JeremyStudio.modules.AssetManager.init();
		__JeremyStudio.modules.SceneManager.init();
		__JeremyStudio.modules.ContextManager.init();
		__JeremyStudio.modules.EventManager.init();
		__JeremyStudio.modules.DataManager.init();
	},
	modules : {},
	interfaces : {},
	addModule : function(name, module) {
		__JeremyStudio.modules[name] = module;
	},
	// getModule : function(name) {
	// return __JeremyStudio.modules[name];
	// },
	addInterface : function(name, interface) {
		__JeremyStudio.interfaces[name] = interface;
	},
	getInterface : function(name) {
		return __JeremyStudio.interfaces[name];
	}
};
function __JS(name) {
	return __JeremyStudio.getInterface(name);
};
if (Jeremy) {
	Jeremy.addComponent('JeremyStudio', __JeremyStudio);
	Jeremy.addInterface('JS', __JS);
}