var __GLGER = null;
JeremyStudio.GLGERenderer = {
	init : function() {
		console.log("init: JeremyStudio.GLGERenderer");
		__GLGER = this;
		this.type = "GLGERenderer";
		this.doc = new GLGE.Document();
		this.doc.onLoad = __GLGER.onDocumentLoad;
		this.doc.load("Resources/map/simple-map.xml");

		this.canvas = null;
		this.renderer = null;
		this.scene = null;
		this.camera = null;
		this.lights = {};
		this.objects = {};
	},
	onDocumentLoad : function() {
		JeremyStudio.GLGERenderer.canvas = document.getElementById("game");
		JeremyStudio.GLGERenderer.renderer = new GLGE.Renderer(JeremyStudio.GLGERenderer.canvas);
		JeremyStudio.GLGERenderer.scene = JeremyStudio.GLGERenderer.doc.getElement("mainscene");
		JeremyStudio.GLGERenderer.renderer.setScene(JeremyStudio.GLGERenderer.scene);
		JeremyStudio.GLGERenderer.initCamera();
		window.dispatchEvent(JeremyStudioDidLoad);
	},
	initCamera : function() {
		var cam = __GLGER.doc.getElement("maincamera");
		cam.setLoc(1, 1, 1);
		cam.Lookat([0, 0, 0]);
		__GLGER.camera = cam;
	},
	addObject : function(name, obj) {
		__GLGER.objects[name] = obj;
		this.scene.addCollada(obj);
	},
	render : function() {
		JeremyStudio.GLGERenderer.renderer.render();
		JeremyStudio.GLGERenderer.scene.updateMatrix();
	},
	update : function() {
		JeremyStudio.GLGERenderer.render();
	}
};