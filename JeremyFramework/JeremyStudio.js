/**
 * @author Jeremy
 */
var __JeremyStudio = {
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