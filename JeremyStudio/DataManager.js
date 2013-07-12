var __DataManager = null;
JeremyStudio.DataManager = {
	init: function () {
    	console.log('Init: JeremyStudio.DataManager');
        __DataManager = this;
        this.type = 'DataManager';
        this.data = {};
    }, 
    getData: function (attr) {
    	return __DataManager.data[attr];
    },
    setData: function (attr, value) {
    	__DataManager.data[attr] = value;
    }
};