/**
 * @author JeremyJeong
 */
function JeremyRenderable2D (layer, drawCB, argo) {
	this.layer = layer;
	this.drawFunc = drawCB;
	this.argo = argo;
}