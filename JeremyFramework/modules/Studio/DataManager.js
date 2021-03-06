var __DataManager = {
	init : function() {
		console.log('Init: JeremyStudio.DataManager');
		__DataManager.type = 'DataManager';
		__DataManager.data = {};
	},
	getData : function(attr) {
		return __DataManager.data[attr];
	},
	setData : function(attr, value) {
		return __DataManager.data[attr] = value;
	},
	updateData : function(attr, updateCB) {
		return __DataManager.setData(attr, updateCB(__DataManager.getData(attr)));
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('DataManager', __DataManager);
		target.addInterface('Data', {
			get : __DataManager.getData,
			set : __DataManager.setData,
			update : __DataManager.updateData
		});
	}
})();
