/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
	name : 'Playing',
	initCB : function() {
		this.Jacqueline = J('STU')('Object').get(true, 'Jacqueline');
		console.log(this.Jacqueline);
	},
	updateCB : function() {
	},
	destroyCB : function() {
	}
})); 