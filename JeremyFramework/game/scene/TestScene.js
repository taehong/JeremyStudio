/**
 * @Context SplashScreenDigitalMedia
 * @author Jeremy Jeong
 */
J('STU')('Context').add('TestScene', J('LIB')('SceneContext')({
	initCB : function() {
		this.timer = J('LIB')('Timer')({
			unit : 2000,
			timerCB : function(argo) {
				console.log(J('STU')('Scene').getCurr());
				console.log(J('STU')('Scene').getPrev());
				console.log(J('STU')('Scene').getNext());
				console.log(J('STU')('Context').current());
			},
			argo : {
			}
		});
	},
	updateCB : function() {
		this.timer.update();
	},
	destroyCB : function() {
	}
}));