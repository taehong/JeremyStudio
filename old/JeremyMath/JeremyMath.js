/**
 * @author Taehong Jeremy Jeong
 */
var JeremyMath = {
	modules: {},
	create: function (name, argo) {
		var Constructor = JeremyMath.modules["Jeremy" + name];
		return new Constructor(argo);
	}
};