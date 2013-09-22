/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Playing',
	initCB : function() {
		J('STU')('Data').set('INPUT', J('STU')('Object').get(true, 'InputManager').initialize());
		J('STU')('Data').set('GAME', J('STU')('Object').get(true, 'GameManager').initialize());
		this.jacqueline = J('STU')('Object').get(true, 'Jacqueline');
		this.jacqueline.initialize(this.jacqueline.eDirection.kDirectionDown, 0, 0);
		var mySwitch = J('STU')('Object').create('Switch', {
			name : 'testSwitch',
			actionCB : function(argo) {
				console.log(argo.text);
			},
			actionArgo : {
				text : "this is test switch"
			}
		});
		mySwitch.doAction();
		
	},
	updateCB : function() {
		var GAME = J('STU')('Data').get('GAME');
		GAME.update();
	},
	destroyCB : function() {
	}
}));
