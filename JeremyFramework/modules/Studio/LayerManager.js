/**
 * @author JeremyJeong
 */
var __LayerManager = {
	init : function() {
		console.log('Init: JeremyStudio.LayerManager');
		__LayerManager.type = 'LayerManager';
		__LayerManager.layers = {};
		__LayerManager.initLayers(Jeremy.getConfig('layer'));
	},
	update : function() {

	},
	initLayers : function(config) {
		var c = config.common, l = config.layers, lName = null;
		l.forEach(function(layer) {
			__LayerManager.addLayer(c.selector, layer.id, layer.context, c.width, c.height, layer.zIndex, c.top, c.left);
		});
	},
	addLayer : function(selector, id, ctxMode, width, height, zIndex, top, left) {
		__LayerManager.layers[id] = J('LIB')('Canvas')({
			str_selector : selector,
			str_id : id,
			str_ctxMode : ctxMode,
			num_Width : width,
			num_Height : height,
			num_zIndex : zIndex,
			px_Top : top,
			px_Left : left
		});
	},
	getLayer : function(layerName) {
		return __LayerManager.layers[layerName];
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('LayerManager', __LayerManager);
		target.addInterface('Layer', {
			layer : __LayerManager.getLayer
		});
	}
})(); 