var __Renderer2D = {
	init : function() {
		console.log('Init: JeremyStudio.Renderer2D');
		this.type = 'Renderer2D';
		this.renderQueue = {};
		__Renderer2D.initRenderQueue(Jeremy.getConfig('layer'));
	},
	initRenderQueue : function(config) {
		config.layers.forEach(function(layer) {
			__Renderer2D.addRenderQueue(layer.id);
			console.log('RenderQueue Ready : ' + layer.id);
		});
	},
	context : function(layerName) {
		return J('STU')('Layer').layer(layerName).getContext();
	},
	canvas : function(layerName) {
		return J('STU')('Layer').layer(layerName).getCanvas();
	},
	clear : function(layerName) {
		var canvas = __Renderer2D.canvas(layerName), ctx = __Renderer2D.context(layerName);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},
	render : function(layerName, drawfunc, argo) {
		var ctx = __Renderer2D.context(layerName);
		drawfunc(ctx, argo);
	},
	renderLayer : function(layerName) {
		var queue = __Renderer2D.getRenderQueue(layerName), renderable = null, i = 0, length = queue.length;
		for ( i = 0; i < length; i += 1) {
			renderable = queue[i];
			if (renderable) {
				__Renderer2D.render(renderable.layer, renderable.drawFunc, renderable.argo);
			}
		}
	},
	update : function() {
		var layerName = null, layers = J('STU')('Layer').layers;
		// Clear Each Layers
		for (layerName in layers) {
			__Renderer2D.clear(layerName);
		}
		// Render Each Layers
		for (layerName in layers) {
			__Renderer2D.renderLayer(layerName);
		}
	},
	addRenderQueue : function(layerName) {
		var queueName = layerName;
		__Renderer2D.renderQueue[queueName] = [];
	},
	addRenderable : function(renderable) {
		var queue = __Renderer2D.getRenderQueue(renderable.layer), index = queue.indexOf(renderable);
		if (index === -1) {
			queue.push(renderable);
		}
	},
	removeRenderable : function(renderable) {
		var queue = __Renderer2D.getRenderQueue(renderable.layer), index = queue.indexOf(renderable);
		if (index !== -1) {
			queue[index] = null;
		}
	},
	getRenderQueue : function(layerName) {
		return __Renderer2D.renderQueue[layerName];
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('Renderer2D', __Renderer2D);
		target.addInterface('R2D', {
			canvas : __Renderer2D.canvas,
			context : __Renderer2D.context,
			clear : __Renderer2D.clear,
			add : __Renderer2D.addRenderable,
			remove : __Renderer2D.removeRenderable,
			update: __Renderer2D.update
		});
	}
})();