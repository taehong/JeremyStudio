/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Playing',
	initCB : function() {
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
	},
	destroyCB : function() {
	}
}));
