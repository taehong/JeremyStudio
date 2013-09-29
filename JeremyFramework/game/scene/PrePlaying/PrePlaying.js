/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'PrePlaying',
	initCB : function() {
		this.colladaLoader = THREE.ColladaLoader();
		J('STU')('Data').set('PrePlaying_loadCount', 5);

		this.colladaLoader.load('game/asset/model/Monster.dae', function(collada) {
			var mesh = collada.scene.children[0];
			mesh.castShadow = true;
			mesh.setRotationFromAxisAngle(new THREE.Vector3(1, 0, 0), Math.PI / 2);
			mesh.scale.set(3.3, 3.3, 3.3);
			J('STU')('Data').set('modelMonster', mesh);
			J('STU')('Data').update('PrePlaying_loadCount', function(loadCount) {
				return --loadCount;
			});
		});
		this.colladaLoader.load('game/asset/model/Key.dae', function(collada) {
			var mesh = collada.scene.children[0];
			mesh.castShadow = true;
			J('STU')('Data').set('modelKey', mesh);
			J('STU')('Data').update('PrePlaying_loadCount', function(loadCount) {
				return --loadCount;
			});
		});

		this.colladaLoader.load('game/asset/model/Jacqueline.dae', function(collada) {
			var mesh = collada.scene.children[0];
			mesh.scale.set(1.75, 1.75, 1.75);
			mesh.castShadow = true;
			J('STU')('Data').set('modelJacqueline', mesh);
			J('STU')('Data').update('PrePlaying_loadCount', function(loadCount) {
				return --loadCount;
			});
		});
		this.colladaLoader.load('game/asset/model/ground.dae', function(collada) {
			var mesh = collada.scene.children[0];
			mesh.setRotationFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
			mesh.scale.set(15, 15, 15);
			mesh.receiveShadow = true;
			J('STU')('Data').set('modelGround', mesh);
			J('STU')('Data').update('PrePlaying_loadCount', function(loadCount) {
				return --loadCount;
			});
		});
		this.colladaLoader.load('game/asset/model/WallCube.dae', function(collada) {
			var mesh = collada.scene.children[0];
			mesh.scale.set(15, 15, 35);
			mesh.setRotationFromAxisAngle(new THREE.Vector3(1, 0, 0), -Math.PI / 2);
			mesh.castShadow = true;
			mesh.receiveShadow = true;
			J('STU')('Data').set('modelWall', mesh);
			J('STU')('Data').update('PrePlaying_loadCount', function(loadCount) {
				return --loadCount;
			});
		});
	},
	updateCB : function() {
		if (J('STU')('Data').get('PrePlaying_loadCount') === 0) {
			J('STU')('Scene').playNext();
		}
	},
	destroyCB : function() {
	}
}));
