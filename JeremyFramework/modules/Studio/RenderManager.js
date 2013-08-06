/**
 * @author Jeremy
 */
/*
 * TODO: 모든 렌더링기능을 수행한다.
 * 1. 2D 렌더링 - Renderer2D
 * 2. 3D 렌더링 - Renderer3D
 * 3. 오디오 렌더링 - Soundbox
 */
var __RenderManager = {
	init : function() {
		console.log('Init: JeremyStudio.RenderManager');
		this.type = 'RenderManager';
	},
	update : function() {
		J('STU')('R2D').update();
		// J('STU')('R3D').update();
		// J('STU')('Sound').update();
	}
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyStudio') : undefined);
	if (target) {
		target.addModule('RenderManager', __RenderManager);
		target.addInterface('Render', {
			update : __RenderManager.update
		});
	}
})();