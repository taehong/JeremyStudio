/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'Jacqueline', {
	eDirection : {
		kDirectionLeft : 0,
		kDirectionRight : 1,
		kDirectionUp : 2,
		kDirectionDown : 3
	},
	state : {
		isMoving : false,
		direction : undefined
	},
	position : undefined,
	setPosition : function(posX, posY) {
		return this.position = J('MAT')('Vec3')({
			x : posX,
			y : posY,
			w : 1
		});
	},
	getPosition : function() {
		return this.position;
	},
	setMoving : function(isMoving) {
		return this.state.isMoving = isMoving;
	},
	isMoving : function() {
		return this.state.isMoving;
	},
	setDirection : function(direction) {
		return this.state.direction = direction;
	},
	getDirection : function() {
		return this.state.direction;
	},
	initialize : function(direction, posX, posY) {
		this.setPosition(posX, posY);
		this.setDirection(direction);
		return this;
	},
	update : function() {
		this.updateState();
	},
	updateState : function() {
		var isMoving = false, direction = undefined;
		if (isMoving) {
			this.setMoving(true);
		} else {
			this.setMoving(false);
		}
		switch(direction) {
			case this.eDirection.kDirectionLeft:
				this.setDirection(this.eDirection.kDirectionLeft);
				break;
			case this.eDirection.kDirectionLeft:
				this.setDirection(this.eDirection.kDirectionRight);
				break;
			case this.eDirection.kDirectionLeft:
				this.setDirection(this.eDirection.kDirectionUp);
				break;
			case this.eDirection.kDirectionLeft:
				this.setDirection(this.eDirection.kDirectionDown);
				break;
		}
	}
});
