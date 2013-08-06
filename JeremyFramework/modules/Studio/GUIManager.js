/**
 * @author Administrator
 */
var __GUIManager = {
	init : function() {
		console.log('Init: JeremyStudio.GUIManager');
		__GUIManager.type = 'GUIManager';
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('GUIManager', __GUIManager);
		target.addInterface('GUI', {
		});
	}
})();