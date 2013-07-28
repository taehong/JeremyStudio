/**
 * @author Jeremy
 */
var __JeremyMath = {
	modules : {},
	addModule : function(name, module) {
		__JeremyMath.modules[name] = module;
	},
	getConstructorOf : function(name) {
		var creator = __JeremyMath.modules["Jeremy" + name];
		return creator;
	}
};
function __JM(name) {
	var creator = __JeremyMath.getConstructorOf(name);
	return function(argo) {
		return new creator(argo);
	};
};
if (Jeremy) {
	Jeremy.addComponent('JeremyMath', __JeremyMath);
	Jeremy.addInterface('JM', __JM);
}