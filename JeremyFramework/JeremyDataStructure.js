/**
 * @author Jeremy
 */
var __JeremyDataStructure = {
	modules : {},
	addModule : function(name, module) {
		__JeremyDataStructure.modules[name] = module;
	},
	getConstructorOf : function(name) {
		var creator = __JeremyDataStructure.modules["Jeremy" + name];
		return creator;
	}
};
function __JD(name) {
	var creator = __JeremyDataStructure.getConstructorOf(name);
	return function(argo) {
		return new creator(argo);
	};
};
if (Jeremy) {
	Jeremy.addComponent('JeremyDataStructure', __JeremyDataStructure);
	Jeremy.addInterface('JD', __JD);
}