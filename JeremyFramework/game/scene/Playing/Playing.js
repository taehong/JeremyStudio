/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Playing',
	initCB : function() {
		/*
		 * Managers
		 */
		this.LEVEL = J('STU')('Data').set('LEVEL', J('STU')('Object').get(true, 'LevelManager').initialize());
		this.INPUT = J('STU')('Data').set('INPUT', J('STU')('Object').get(true, 'InputManager').initialize());
		this.GAME = J('STU')('Data').set('GAME', J('STU')('Object').get(true, 'GameManager').initialize());
		/*
		 * Helpers
		 */
		this.MapHelper = J('STU')('Data').set('MapHelper', J('STU')('Object').get(true, 'MapHelper'));
		/*
		 * R3D : Three.js
		 */
		var k = {
			width : 730,
			height : 440,
			viewportSize : 100,
			cameraNear : 0.000001,
			cameraFar : 100000,
			boxSize : 30,
			cubePaddingX : -60,
			cubePaddingZ : -60,
			vecOrigin : new THREE.Vector3(0, 0, 0)
		};
		J('STU')('Data').set('k', k);
		// {
		// canvas: J('STU')('Layer').layer('game').getCanvas()
		// }
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
		this.R3D.camera.position.z = k.viewportSize / 2.0;
		this.R3D.camera.position.y = k.viewportSize * 1.3;
		this.R3D.camera.position.x = k.viewportSize * 1.3;
		this.R3D.camera.lookAt(k.vecOrigin);
		this.R3D.renderer.setSize(k.width, k.height);
		this.R3D.renderer.shadowMapEnabled = true;

		this.R3D.material.matCubeR = new THREE.MeshLambertMaterial({
			color : 0xff0000,
			wireframe : false
		});
		this.R3D.material.matCubeB = new THREE.MeshLambertMaterial({
			color : 0x0000ff,
			wireframe : false
		});
		this.R3D.material.matCubeG = new THREE.MeshLambertMaterial({
			color : 0x00ff00,
			wireframe : false
		});
		this.R3D.geometry.geoCube = new THREE.CubeGeometry(k.boxSize, k.boxSize / 2, k.boxSize);
		this.R3D.mesh.mesCubes = [];
		this.isDone = {
			initLevel : false
		};
		/*
		 * Level
		 */
		this.initLevel = function(level) {
			var R3D = this.R3D;
			level.cellList.forEach(function(elem) {
				var x = elem.posX, z = elem.posY, type = elem.type, aCube = null, geo = null, mat = null, elev = 0;
				if (true) {
					geo = R3D.geometry.geoCube;
				}
				switch(type) {
					case ""+1:
						// Wall
						mat = R3D.material.matCubeB;
						elev = k.boxSize / 2;
						aCube = new THREE.Mesh(geo, mat);
						aCube.castShadow = true;
						break;
					case ""+2:
						// Ground
						mat = R3D.material.matCubeG;
						aCube = new THREE.Mesh(geo, mat);
						aCube.receiveShadow = true;
						break;
				}
				aCube.position.x = x * k.boxSize + k.cubePaddingX;
				aCube.position.z = z * k.boxSize + k.cubePaddingZ;
				aCube.position.y = elev;
				R3D.mesh.mesCubes.push(aCube);
			});
			this.isDone.initLevel = true;
			R3D.mesh.mesCubes.forEach(function(elem) {
				J('STU')('Data').get('R3D').scene.add(elem);
			});
		};
		/*
		* Jacqueline
		*/
		// Create Jacqueline
		this.JACQUELINE = J('STU')('Data').set('JACQUELINE', J('STU')('Object').get(true, 'Jacqueline'));
		// Create a mesh for Jacqueline
		this.R3D.mesh.Jacqueline = new THREE.Mesh(this.R3D.geometry.geoCube, this.R3D.material.matCubeR);
		this.R3D.mesh.Jacqueline.receiveShadow = true;
		this.R3D.mesh.Jacqueline.castShadow = true;
		// Initialize Jacqueline
		this.initJacqueline = function(argo) {
			var R3D = this.R3D, JACQUELINE = this.JACQUELINE;
			JACQUELINE.initialize(argo);
			R3D.scene.add(JACQUELINE.getRenderable());
		};
		/*
		 * Candle
		 */
		this.R3D.light.Candle = new THREE.SpotLight(0xFFFFFF);
		this.CANDLE = J('STU')('Object').get(true, 'Candle').initialize({
			renderable : this.R3D.light.Candle
		});
		this.R3D.scene.add(this.CANDLE.getRenderable());
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
		if (!this.isDone.initLevel) {
			var currentLevel = J('STU')('Data').set('currentLevel', this.LEVEL.getProcessedLevel('튜토리얼1'));
			this.initLevel(currentLevel);
			this.initJacqueline({
				direction : this.JACQUELINE.eDirection.kDirectionDown,
				renderable : this.R3D.mesh.Jacqueline,
				initialCell : this.MapHelper.getCell(currentLevel.cellList, 1, 13)
			});
		}
		this.INPUT.update();
		this.JACQUELINE.update();
		this.CANDLE.update();
		this.GAME.update();

		/*
		 * TODO : CameraHelper
		 */
		var posJACQUELINE = this.JACQUELINE.getPosition();
		var k = J('STU')('Data').get('k');
		this.R3D.camera.position.z = posJACQUELINE.z + k.viewportSize / 2.0;
		this.R3D.camera.position.y = posJACQUELINE.y + k.viewportSize * 2.0;
		this.R3D.camera.position.x = posJACQUELINE.x + k.viewportSize * 1.3;
		this.R3D.camera.lookAt(new THREE.Vector3(posJACQUELINE.x, posJACQUELINE.y, posJACQUELINE.z));
		
		/*
		 * TODO : Changing Cams : Zoom in, Zoom out
		 */
		this.R3D.renderer.render(this.R3D.scene, this.R3D.camera);
	},
	destroyCB : function() {
	}
}));
