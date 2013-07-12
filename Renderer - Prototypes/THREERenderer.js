var __THREERenderer = null;
JeremyStudio.THREERenderer = {
	init : function() {
		console.log('Init : JeremyStudio.THREERenderer');
		__THREERenderer = this;
		this.type = 'THREERenderer';
		this.camera = null;
		this.scene = new THREE.Scene();
		this.renderer = this.initRenderer();
		var config = JeremyStudio.LayerConfig;
		this.initLayers(config);
	},
	initRenderer: function () {
		var renderer = new THREE.WebGLRenderer();
		renderer.getContext().enable(renderer.getContext().STENCIL_TEST);
		renderer.getContext().stencilOp(renderer.getContext().KEEP, renderer.getContext().KEEP, renderer.getContext().INVERT);
		return renderer;
	},
	initLayers: function(config) {
		var c = config.layerConfig3D,
			l = c.layer,
			container = null,
			canvas = null;
		this.renderer.setSize(config.width, config.height);
		container = $('#GameArea');
		canvas = this.renderer.domElement;
		canvas.id = l.game.id;
		container.append(canvas);
		$('#game').css('left', config.left).css('top', config.top).css('position', 'absolute').css('z-index', l.game.zIndex);
		//css('background-color', 'black').
		console.log(container, canvas);
		
		// TODO :  Many layer		
	},
	render : function() {
		this.renderer.render(this.scene, this.camera);
	},
	update : function() {
		this.render();
	},
	addRenderable3D : function(renderable) {
		this.scene.add(renderable);
	},
	removeRenderable3D : function(renderable) {
		this.scene.remove(renderable);
	},
	setCamera : function(cam) {
		this.camera = cam;
	}
};