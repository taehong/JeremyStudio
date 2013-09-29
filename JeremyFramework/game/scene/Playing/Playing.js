/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Playing',
	initCB : function() {
		/*
		* TODO : Subsentences
		*/
		// this.jack_sentence = J('STU')('Data').set('SUBSENTENCE', J('STU')('Object').get(true, 'Subsentence')).initialize({
		// font : '30px',
		// style : '#ffffff',
		// //etc..
		// }, ["a", "b", "c"]);

		/************ Game *************/
		/*
		* Renderable2Ds
		*/
		// Renderable : the vignette effect
		this.effectVignette = J('LIB')('Renderable2D')({
			layer : 'effect',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, 0, 0);
			},
			argo : {
				img : J('STU')('Asset').get('image', 'maskImgVignette').getImage()
			}
		});
		// Renderable : the noise effect
		this.effectNoise = J('LIB')('Renderable2D')({
			layer : 'effect',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.8;
				ctx.drawImage(argo.img, 0, 0);
				ctx.globalAlpha = 1.0;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'maskImgNoise').getImage()
			}
		});
		// Renderable : the scanline effect
		this.effectScanline = J('LIB')('Renderable2D')({
			layer : 'effect',
			drawCB : function(ctx, argo) {
				ctx.globalAlpha = 0.4;
				ctx.drawImage(argo.img, 0, 0);
				ctx.globalAlpha = 1.0;
			},
			argo : {
				img : J('STU')('Asset').get('image', 'maskImgScanline').getImage()
			}
		});
		J('STU')('R2D').add(this.effectVignette);
		J('STU')('R2D').add(this.effectNoise);
		J('STU')('R2D').add(this.effectScanline);
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
			vecOrigin : new THREE.Vector3(0, 0, 0),
			up : new THREE.Vector3(0, 1, 0)
		};
		J('STU')('Data').set('k', k);
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

		// this.R3D.scene.add(this.KEY.getRenderable());

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
						aCube = J('STU')('Data').get('modelWall').clone();
						// Wall
						// mat = R3D.material.matCubeB;
						// elev = k.boxSize / 2;
						// aCube = new THREE.Mesh(geo, mat);
						// aCube.castShadow = true;
						break;
					case ""+2:
						aCube = J('STU')('Data').get('modelGround').clone();
						// Ground
						// mat = R3D.material.matCubeG;
						// aCube = new THREE.Mesh(geo, mat);
						// aCube.receiveShadow = true;
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
			// var ground = J('STU')('Data').get('modelGround');
			// ground.position.set(90, 15, 0);
			// R3D.scene.add(ground);
		};
		/*
		 * Key
		 */
		this.KEY = J('STU')('Data').set('KEY', J('STU')('Object').get(true, 'Key').initialize({
			location : {
				posX : 5,
				posY : 2
			},
			renderable : J('STU')('Data').get('modelKey')
		}));
		this.R3D.scene.add(this.KEY.getRenderable());
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
		this.R3D.light.Candle = new THREE.SpotLight(0xFFBB00);
		this.R3D.light.CandleOff = new THREE.SpotLight(0x007733);
		this.CANDLE = J('STU')('Data').set('CANDLE', J('STU')('Object').get(true, 'Candle').initialize({
			renderable : this.R3D.light.Candle,
			offRenderable : this.R3D.light.CandleOff
		}));
		this.R3D.scene.add(this.CANDLE.getRenderable());
		this.R3D.scene.add(this.CANDLE.getOffRenderable());
		
		// $('#game').remove();
		$('#jeremy').append(this.R3D.renderer.domElement);

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
				renderable : J('STU')('Data').get('modelJacqueline'),
				initialCell : this.MapHelper.getCell(currentLevel.cellList, 2, 13)
			});
		}
		this.GAME.update();
		this.INPUT.update();
		this.CANDLE.update();
		this.JACQUELINE.update();
		this.KEY.update();
		//this.MONSTER.update();
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

		var monster = J('STU')('Data').get('modelMonster');
		monster.position.set(90, 30, 0);
		this.R3D.scene.add(monster);
		this.R3D.renderer.render(this.R3D.scene, this.R3D.camera);
	},
	destroyCB : function() {
	}
}));
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