/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Playing',
	initCB : function() {
		this.gameManager = J('STU')('Object').get(true, 'GameManager').initialize();
		this.jacqueline = J('STU')('Object').get(true, 'Jacqueline');
		this.jacqueline.initialize(this.jacqueline.eDirection.kDirectionDown, 0, 0);
		console.log(this.jacqueline);
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
		this.gameManager.update();
	},
	destroyCB : function() {
	}
}));
J('STU')('Event').set('onKeyDown', '#jeremy', 'keydown', function(e) {
	J('STU')('Data').set('keyCode', e.keyCode);
	J('STU')('Data').set('isNewKey', e.keyCode);
});
J('STU')('Event').bind('onKeyDown');