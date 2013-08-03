/**
 * @author JeremyJeong
 */
// @param layer, drawCB, argo
function JeremyRenderable2D (argo) {
	this.layer = argo.layer;
	this.drawFunc = argo.drawCB;
	this.argo = argo.argo;
}