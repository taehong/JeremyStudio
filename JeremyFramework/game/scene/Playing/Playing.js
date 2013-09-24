/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Playing',
	initCB : function() {
		this.LEVEL = J('STU')('Data').set('LEVEL', J('STU')('Object').get(true, 'LevelManager').initialize());
		this.INPUT = J('STU')('Data').set('INPUT', J('STU')('Object').get(true, 'InputManager').initialize());
		this.GAME = J('STU')('Data').set('GAME', J('STU')('Object').get(true, 'GameManager').initialize());
		this.JACQUELINE = J('STU')('Object').get(true, 'Jacqueline');
		this.JACQUELINE.initialize(this.JACQUELINE.eDirection.kDirectionDown, 0, 0);

		var k = {
			width : 730,
			height : 440,
			viewportSize : 100,
			cameraNear : 0.000001,
			cameraFar : 100000,
			boxSize : 10,
			cubePaddingX : 55,
			cubePaddingZ : 55,
			vecOrigin : new THREE.Vector3(0, 0, 0)
		};
		// {
		// canvas: J('STU')('Layer').layer('game').getCanvas()
		// }
		this.sampleMap = [1, 1, 1, 1, 1, 0, 0, 1, 1, 0, 0, 1, 1, 1, 1, 1];
		J('STU')('Data').set('R3D', this.R3D = {
			// camera : new THREE.PerspectiveCamera(45, 730 / 440, 1, 10000),
			camera : new THREE.OrthographicCamera(-k.width / k.height * k.viewportSize, k.width / k.height * k.viewportSize, k.viewportSize, -k.viewportSize, k.cameraNear, k.cameraFar),
			scene : new THREE.Scene(),
			renderer : new THREE.WebGLRenderer(),
			light : {},
			geometry : {},
			material : {},
			mesh : {}
		});
		this.R3D.camera.position.z = this.R3D.camera.position.y = this.R3D.camera.position.x = k.viewportSize;
		this.R3D.camera.lookAt(k.vecOrigin);
		this.R3D.renderer.setSize(k.width, k.height);
		this.R3D.material.matCubeB = new THREE.MeshBasicMaterial({
			color : 0x0000ff,
			wireframe : false
		});
		this.R3D.material.matCubeG = new THREE.MeshBasicMaterial({
			color : 0x00ff00,
			wireframe : false
		});
		this.R3D.geometry.geoCube = new THREE.CubeGeometry(k.boxSize, k.boxSize / 2, k.boxSize);
		this.R3D.mesh.mesCubes = [];
		// for (var j = 0; j < Math.sqrt(this.sampleMap.length); j++) {
		// for (var i = 0; i < Math.sqrt(this.sampleMap.length); i++) {
		// if (this.sampleMap[j * Math.sqrt(this.sampleMap.length) + i] === 1) {
		// var aCube = new THREE.Mesh(this.R3D.geometry.geoCube, this.R3D.material.matCube);
		// aCube.position.x = i * k.boxSize;
		// aCube.position.z = j * k.boxSize;
		// this.R3D.mesh.mesCubes.push(aCube);
		// }
		// }
		// }
		this.isDone = {
			initLevel : false
		};
		this.initLevel = function(level) {
			var R3D = this.R3D;
			level.cellList.forEach(function(elem) {
				var x = elem.posX, z = elem.posY, type = elem.type, aCube = null, geo = null, mat = null, elev = 0;
				if (true) {
					geo = R3D.geometry.geoCube;
				}
				switch(type) {
					case ""+1:
						mat = R3D.material.matCubeB;
						elev = k.boxSize/2;
						break;
					case ""+2:
						mat = R3D.material.matCubeG;
						break;
				}
				aCube = new THREE.Mesh(geo, mat);
				aCube.position.x = x * k.boxSize - k.cubePaddingX;
				aCube.position.z = z * k.boxSize - k.cubePaddingZ;
				aCube.position.y = elev;
				R3D.mesh.mesCubes.push(aCube);
			});
			this.isDone.initLevel = true;
			R3D.mesh.mesCubes.forEach(function(elem) {
				J('STU')('Data').get('R3D').scene.add(elem);
			});
		};

		// $('#game').remove();
		$('#jeremy').append(this.R3D.renderer.domElement);

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
		this.LEVEL.update();
		if (!this.LEVEL.isDone())
			return;
		if (!this.isDone.initLevel)
			this.initLevel(this.LEVEL.getProcessedLevel('튜토리얼1'));
		this.INPUT.update();
		this.JACQUELINE.update();
		this.GAME.update();
		this.R3D.renderer.render(this.R3D.scene, this.R3D.camera);
	},
	destroyCB : function() {
	}
}));
