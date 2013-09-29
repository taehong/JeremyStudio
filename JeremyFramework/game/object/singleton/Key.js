/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'Key', {
	angle : 0,
	position : undefined, // JeremyVec4
	renderable : undefined,
	setPosition : function(vec4) {
		this.position = vec4;
	},
	getRenderable : function() {
		return this.renderable;
	},
	initialize : function(argo) {
		var MapHelper = J('STU')('Data').get('MapHelper');
		this.setPosition(MapHelper.locationToPosition(argo.location));
		this.renderable = argo.renderable;
		this.renderable.position.set(this.position.x, this.position.y, this.position.z);
		console.log(this.position);
		return this;
	},
	update : function() {
		if (!this.renderable.visible)
			return;
		var JACQUELINE = J('STU')('Data').get('JACQUELINE');
		if (JACQUELINE.hasKey()) {
			this.renderable.visible = false;
		} else {
			this.renderable.rotateX(Math.PI / 90);
		}
	}
});
