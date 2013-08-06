/**
 * @Context SplashScreenDigitalMedia
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'TestScene',
	initCB : function() {
		this.timer = J('LIB')('Timer')({
			unit : 2000,
			timerCB : function(argo) {
				console.log('playNext');
				J('STU')('Scene').playNext();
			},
			argo : {
			}
		});
	},
	updateCB : function() {
		this.timer.update();
	},
	destroyCB : function() {
		this.timer = null;
	}
})); 