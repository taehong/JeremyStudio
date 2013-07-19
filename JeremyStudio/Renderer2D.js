var __Renderer2D;
JeremyStudio.Renderer2D = {
	init : function() {
		console.log('Init: JeremyStudio.Renderer2D');
		__Renderer2D = this;
		this.type = 'Renderer2D';
		this.layers = {};
		this.renderQueue = {};

		var config = JeremyStudio.LayerConfig;
		this.initLayers(config);
	},
	initLayers : function(config) {
		var c = config.layerConfig2D;
		var l = c.layer;
		for (var lName in l) {
			this.addLayer(c.target, l[lName].id, '2d', config.width, config.height, l[lName].zIndex, config.top, config.left);
			this.addRenderQueue(l[lName].id);
		}
	},
	context : function(layer) {
		return this.layers[layer].getContext();
	},
	canvas : function(layer) {
		return this.layers[layer].getCanvas();
	},
	clearLayer : function(layer) {
		var canvas = __Renderer2D.canvas(layer), ctx = __Renderer2D.context(layer);
		ctx.clearRect(0, 0, canvas.width, canvas.height);
	},
	render : function(layer, drawfunc, argv) {
		var ctx = __Renderer2D.context(layer);
		drawfunc(ctx, argv);
	},
	renderLayer : function(layer) {
		var queue = this.getRenderQueue(layer), renderable = null, i = 0, length = queue.length;
		for ( i = 0; i < length; i += 1) {
			renderable = queue[i];
			if (renderable) {
				this.render(renderable.layer, renderable.drawFunc, renderable.argo);
			}
		}
	},
	update : function() {
		var layerName = null;
		// Clear Each Layers
		for (layerName in __Renderer2D.layers) {
			this.clearLayer(layerName);
		}
		// Render Each Layers
		for (layerName in __Renderer2D.layers) {
			this.renderLayer(layerName);
		}
	},
	addLayer : function(str_selector, str_id, str_ctxMode, num_Width, num_Height, num_zIndex, px_Top, px_Left) {
		__Renderer2D.layers[str_id] = new JeremyCanvas(str_selector, str_id, str_ctxMode, num_Width, num_Height, num_zIndex, px_Top, px_Left);
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