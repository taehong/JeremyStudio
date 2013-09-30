/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'Candle', {
	kLightType : 'Candle',
	kDeltaHeatOn : 2,
	kDeltaHeatOff : -0.3,
	kDeltaHeatMoving : 2, // On --> 나누기, Off --> 곱하기
	state : {
		isOn : false,
		heat : 100 // Percentage
	},
	renderable : undefined,
	offRenderable : undefined,
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
	getOffRenderable : function() {
		return this.offRenderable;
	},
	hasNoHeat : function() {
		return this.state.heat === 0;
	},
	getHeat : function () {
		return this.state.heat;
	},
	getCurrentCell : function() {
		return J('STU')('Data').get('JACQUELINE').currentCell;
	},	
	initialize : function(argo) {
		this.setOn(true);
		this.renderable = argo.renderable;
		this.offRenderable = argo.offRenderable;
		this.renderable.castShadow = true;
		// this.renderable.shadowCameraVisible = true;

		this.renderable.shadowMapWidth = 1024;
		this.renderable.shadowMapHeight = 1024;

		this.renderable.shadowCameraNear = 0.1;
		this.renderable.shadowCameraFar = 500;
		this.renderable.shadowCameraFov = 80;
		// J('STU')('R2D').add(J('LIB')('Renderable2D')({
		// layer:'effect',
		// drawCB : function(ctx, argo) {
		// var CANDLE = J('STU')('Data').get('CANDLE');
		// ctx.
		// },
		// argo:null
		// }));
		return this;
	},
	update : function() {
		this.updateState();
		this.updatePosition();
	},
	updateState : function() {
		this.updateOnOff();
		this.updateHeat();
	},
	updatePosition : function() {
		var JACQUELINE = J('STU')('Data').get('JACQUELINE'), posJACQUELINE = JACQUELINE.getPosition(), dirJACQUELINE = JACQUELINE.getDirection();
		var k = J('STU')('Data').get('k');
		if (this.isOn()) {
			JACQUELINE.getRenderable().castShadow = true;
			this.renderable.visible = true;
			this.offRenderable.visible = false;
			switch(dirJACQUELINE) {
				case JACQUELINE.eDirection.kDirectionLeft:
					this.renderable.position.set(posJACQUELINE.x, 15+(posJACQUELINE.y + 75) * this.getHeat() / 100, posJACQUELINE.z + 50);
					this.renderable.target.position.set(posJACQUELINE.x, posJACQUELINE.y, posJACQUELINE.z + 25);
					break;
				case JACQUELINE.eDirection.kDirectionRight:
					this.renderable.position.set(posJACQUELINE.x, 15+(posJACQUELINE.y + 75) * this.getHeat() / 100, posJACQUELINE.z - 50);
					this.renderable.target.position.set(posJACQUELINE.x, posJACQUELINE.y, posJACQUELINE.z - 25);
					break;
				case JACQUELINE.eDirection.kDirectionUp:
					this.renderable.position.set(posJACQUELINE.x - 50, 15+(posJACQUELINE.y + 75) * this.getHeat() / 100, posJACQUELINE.z);
					this.renderable.target.position.set(posJACQUELINE.x - 25, posJACQUELINE.y, posJACQUELINE.z);
					break;
				case JACQUELINE.eDirection.kDirectionDown:
					this.renderable.position.set(posJACQUELINE.x + 50, 15+(posJACQUELINE.y + 75) * this.getHeat() / 100, posJACQUELINE.z);
					this.renderable.target.position.set(posJACQUELINE.x + 25, posJACQUELINE.y, posJACQUELINE.z);
					break;
			}
		} else {
			JACQUELINE.getRenderable().castShadow = false;
			this.offRenderable.visible = true;
			this.renderable.visible = false;
			this.offRenderable.position.set(posJACQUELINE.x, 15+(posJACQUELINE.y + 75) * this.getHeat() / 100, posJACQUELINE.z);
			this.offRenderable.target.position.set(posJACQUELINE.x, posJACQUELINE.y, posJACQUELINE.z);
		}
	},
	updateOnOff : function() { 
		var INPUT = J('STU')('Data').get('INPUT');
		if (INPUT.isSpacebarPressed()) {
			this.setOn(false);
		} else {
			this.setOn(true);
		}
	},
	updateHeat : function() {
		var JACQUELINE = J('STU')('Data').get('JACQUELINE'), dH = 0, isOn = 0x00, isMoving = 0x00;
		isOn = (this.isOn() ? 0x01 : 0x00);
		isMoving = (JACQUELINE.isMoving() ? 0x10 : 0x00);
		switch(isOn + isMoving) {
			case 0x00:
				dH = this.kDeltaHeatOff;
				break;
			case 0x01:
				dH = this.kDeltaHeatOn;
				break;
			case 0x10:
				dH = this.kDeltaHeatOff * this.kDeltaHeatMoving;
				break;
			case 0x11:
				dH = this.kDeltaHeatOn / this.kDeltaHeatMoving;
				break;
		}
		this.state.heat += dH;
		if (this.state.heat >= 100)
			this.state.heat = 100;
		if (this.state.heat <= 0)
			this.state.heat = 0;
	}
});
