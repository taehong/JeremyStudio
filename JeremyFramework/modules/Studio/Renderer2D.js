var __Renderer2D = {
	init : function() {
		console.log('Init: JeremyStudio.Renderer2D');
		this.type = 'Renderer2D';
		this.renderQueue = {};
	},
	initRenderQueue : function() {
		
	},
	context : function(layer) {
		return J('STD')('Layer').layer(layer).getContext();
	},
	canvas : function(layer) {
		return J('STD')('Layer').layer(layer).getCanvas();
	},
	clear : function(layer) {
		var canvas = __Renderer2D.canvas(layer), ctx = __Renderer2D.context(layer);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},
	render : function(layer, drawfunc, argo) {
		var ctx = __Renderer2D.context(layer);
		drawfunc(ctx, argo);
	},
	renderLayer : function(layer) {
		var queue = __Renderer2D.getRenderQueue(layer), renderable = null, i = 0, length = queue.length;
		for ( i = 0; i < length; i += 1) {
			renderable = queue[i];
			if (renderable) {
				__Renderer2D.render(renderable.layer, renderable.drawFunc, renderable.argo);
			}
		}
	},
	update : function() {
		var layerName = null;
		// Clear Each Layers
		for (layerName in __Renderer2D.layers) {
			__Renderer2D.clear(layerName);
		}
		// Render Each Layers
		for (layerName in __Renderer2D.layers) {
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
	getRenderQueue : function(layer) {
		return __Renderer2D.renderQueue[layer];
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
			remove : __Renderer2D.removeRenderable
		});
	}
})(); 