/**
 * @author JeremyJeong
 */
function JeremyButton(argo) {
	/* Internal State */
	this.currentState = JeremyButton.eButtonState.kIdle;
	/* Properties from argo */
	this.name = argo.name;
	this.posX = argo.posX;
	this.posY = argo.posY;
	this.actionCB = argo.actionCB;
	this.actionArgo = argo.actionArgo;
	this.updateCB = argo.updateCB;
	this.updateArgo = argo.updateArgo;
	this.assets = argo.assets;
	/* Collider */
	this.collider = J('STU')('Collision').create({
		aabb : J('MAT')('AABB2')({
			center : J('MAT')('Vec3')({
				x : argo.posX + this.assets.idle.width / 2,
				y : argo.posY + this.assets.idle.height / 2,
				w : 1
			}),
			half : J('MAT')('Vec3')({
				x : this.assets.idle.width / 2,
				y : this.assets.idle.height / 2,
				w : 0
			})
		})
	});
	/* Renderable */
	this.renderable = J('LIB')('Renderable2D')({
		layer : 'gui',
		drawCB : function(ctx, argo) {
			var image, state = J('STU')('Data').get(argo.buttonStateKey);
			switch (state) {
				case JeremyButton.eButtonState.kIdle:
					image = argo.idle;
					ctx.drawImage(image.getImage(), argo.posX, argo.posY);
					break;
				case JeremyButton.eButtonState.kMouseOver:
					image = argo.mouseover;
					ctx.drawImage(image.getImage(), argo.posX, argo.posY);
					break;
				case JeremyButton.eButtonState.kMouseDown:
					image = argo.mousedown;
					ctx.drawImage(image.getImage(), argo.posX-5, argo.posY-3);
					break;
			}
		},
		argo : {
			idle : this.assets.idle,
			mouseover : this.assets.mouseover,
			mousedown : this.assets.mousedown,
			buttonStateKey : 'Button' + this.name + 'State',
			posX : this.posX,
			posY : this.posY
		}
	});
	// console.log('JeremyButton >> ', this.name, this.collider);
}

JeremyButton.eButtonState = {
	kIdle : 0,
	kMouseOver : 1,
	kMouseDown : 2
};
JeremyButton.prototype.update = function() {
	var mousePos = J('STU')('Data').get('mousePos'), collider = J('STU')('Collision').search(this.collider),
		innerTest = false, clickTest = false;
	if (collider.isSelected(mousePos)) {
		innerTest = true;
		if (J('STU')('Data').get('mouseClick')) {
			clickTest = true;
			console.log("clicked!");
		}
	}
	if (clickTest) {
		this.currentState = JeremyButton.eButtonState.kMouseDown;
	} else if (innerTest) {
		this.currentState = JeremyButton.eButtonState.kMouseOver;
	} else {
		this.currentState = JeremyButton.eButtonState.kIdle;
	}
	J('STU')('Data').set('Button' + this.name + 'State', this.currentState);
	if (this.updateCB) {
		this.updateCB(this.updateArgo, this);
	}
};
JeremyButton.prototype.destroy = function() {
	J('STU')('R2D').remove(this.renderable);
	this.renderable = null;
	this.collider = null;
};

JeremyButton.prototype.show = function() {
	J('STU')('R2D').add(this.renderable);
};
JeremyButton.prototype.hide = function() {
	J('STU')('R2D').remove(this.renderable);
};
JeremyButton.prototype.getCurrentState = function() {
	return this.currentState;
};
JeremyButton.prototype.doAction = function() {
	this.actionCB(this.actionArgo);
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyButton', JeremyButton);
	}
})();
