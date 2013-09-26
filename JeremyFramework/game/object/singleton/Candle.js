/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'Candle', {
	state : {
		isOn : false
	},
	renderable : undefined,
	timer : null,
	setOn : function(isOn) {
		this.state.isOn = isOn;
	},
	isOn : function() {
		return this.state.isOn;
	},
	getRenderable : function() {
		return this.renderable;
	},
	initialize : function(argo) {
		this.setOn(true);
		this.renderable = argo.renderable;
		this.renderable.castShadow = true;
		// this.renderable.shadowCameraVisible = true;

		this.renderable.shadowMapWidth = 1024;
		this.renderable.shadowMapHeight = 1024;

		this.renderable.shadowCameraNear = 0.1;
		this.renderable.shadowCameraFar = 300;
		this.renderable.shadowCameraFov = 80;
		return this;
	},
	update : function() {
		this.updateState();
	},
	updateState : function() {
		this.updatePosition();
		this.updateOnOff();
	},
	updatePosition : function() {
		var posJACQUELINE = J('STU')('Data').get('JACQUELINE').getPosition();
		this.renderable.position.set(posJACQUELINE.x - 10, posJACQUELINE.y + 75, posJACQUELINE.z - 1);
		this.renderable.target.position.set(posJACQUELINE.x, posJACQUELINE.y, posJACQUELINE.z);
	},
	updateOnOff : function() {
		var INPUT = J('STU')('Data').get('INPUT');
		if (INPUT.isSpacebarPressed()) {
			this.setOn(false);
		} else {
			this.setOn(true);
		}
		if (this.isOn()) {
			this.renderable.visible = true;
		} else {
			this.renderable.visible = false;
		}
	}
});
