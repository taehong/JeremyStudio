/**
 * @author Jeremy
 */
var __JeremyLibrary = {
	modules : {},
	addModule : function(name, module) {
		__JeremyLibrary.modules[name] = module;
	},
	getConstructorOf : function(name) {
		var creator = __JeremyLibrary.modules["Jeremy" + name];
		return creator;
	}
};
function __JL(name) {
	var creator = __JeremyLibrary.getConstructorOf(name);
	return function(argo) {
		return new creator(argo);
	};
};
if (Jeremy) {
	Jeremy.addComponent('JeremyLibrary', __JeremyLibrary);
	Jeremy.addInterface('JL', __JL);
}