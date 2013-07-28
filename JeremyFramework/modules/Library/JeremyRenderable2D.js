/**
 * @author JeremyJeong
 */
// @param layer, drawCB, argo
function JeremyRenderable2D (argo) {
	this.layer = argo.layer;
	this.drawFunc = argo.drawCB;
	this.argo = argo.argo;
}
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyRenderable2D', JeremyRenderable2D);
	}
})();