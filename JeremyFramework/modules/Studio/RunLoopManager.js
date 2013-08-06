/**
 * @author JeremyJeong
 */
var __RunLoopManager = {
	init : function() {
		console.log('Init: JeremyStudio.RunLoopManager');
		__RunLoopManager.type = 'RunLoopManager';
	},
	update : function() {
		J('STU')('Scene').update();
		J('STU')('Context').update();
		J('STU')('Render').update();
		requestAnimFrame(__RunLoopManager.update);
	},
	start : function(runLoopOption) {
		__RunLoopManager.update();
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('RunLoopManager', __RunLoopManager);
		target.addInterface('RunLoop', {
			start: __RunLoopManager.start
		});
	}
})(); 