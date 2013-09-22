/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Playing',
	initCB : function() {
		// {
		// canvas: J('STU')('Layer').layer('game').getCanvas()
		// }
		this.R3D = {
			camera : new THREE.PerspectiveCamera(45, 730 / 440, 1, 10000),
			scene : new THREE.Scene(),
			renderer : new THREE.CanvasRenderer(),
			geometry : {},
			material : {},
			mesh : {}
		};
		this.R3D.camera.position.z = 1000;
		this.R3D.renderer.setSize(730, 440);
		this.R3D.geometry.geoCube = new THREE.CubeGeometry(200, 200, 200);
		this.R3D.material.matCube = new THREE.MeshBasicMaterial({
			color : 0xff0000,
			wireframe : true
		});
		this.R3D.mesh.mesCube = new THREE.Mesh(this.R3D.geometry.geoCube, this.R3D.material.matCube);
		this.R3D.scene.add(this.R3D.mesh.mesCube);
		// $('#game').remove();
		$('#jeremy').append(this.R3D.renderer.domElement);

		this.INPUT = J('STU')('Data').set('INPUT', J('STU')('Object').get(true, 'InputManager').initialize());
		this.GAME = J('STU')('Data').set('GAME', J('STU')('Object').get(true, 'GameManager').initialize());
		this.JACQUELINE = J('STU')('Object').get(true, 'Jacqueline');
		this.JACQUELINE.initialize(this.JACQUELINE.eDirection.kDirectionDown, 0, 0);
		// var mySwitch = J('STU')('Object').create('Switch', {
		// name : 'testSwitch',
		// actionCB : function(argo) {
		// console.log(argo.text);
		// },
		// actionArgo : {
		// text : "this is test switch"
		// }
		// });
		// mySwitch.doAction();

	},
	updateCB : function() {
		this.INPUT.update();
		this.JACQUELINE.update();
		this.GAME.update();

		this.R3D.mesh.mesCube.rotation.x += 0.01;
		this.R3D.mesh.mesCube.rotation.y += 0.02;

		this.R3D.renderer.render(this.R3D.scene, this.R3D.camera);
	},
	destroyCB : function() {
	}
}));
