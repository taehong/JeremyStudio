/**
 * @author Jeremy
 */
var __JeremyMathematics = {
	modules : {},
	addModule : function(name, module) {
		__JeremyMathematics.modules[name] = module;
	},
	getConstructorOf : function(name) {
		var creator = __JeremyMathematics.modules["Jeremy" + name];
		return creator;
	}
};
function __JM(name) {
	var creator = __JeremyMathematics.getConstructorOf(name);
	return function(argo) {
		return new creator(argo);
	};
};
if (Jeremy) {
	Jeremy.addComponent('JeremyMathematics', __JeremyMathematics);
	Jeremy.addInterface('JM', __JM);
}