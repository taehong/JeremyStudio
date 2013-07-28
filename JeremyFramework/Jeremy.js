/**
 * @author Jeremy
 */
var Jeremy = {
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
	}
}, eJeremyComponentType = {
	JeremyStudio : 'STD',
	JeremyLibrary : 'LIB',
	JeremyMath : 'MAT'
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
		case eJeremyComponentType.JeremyMath:
			value = Jeremy.getInterface('JM');
			break;
	}
	return value;
}