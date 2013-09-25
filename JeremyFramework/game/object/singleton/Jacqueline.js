/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'Jacqueline', {
	eDirection : {
		kDirectionLeft : 0,
		kDirectionUp : 1,
		kDirectionRight : 2,
		kDirectionDown : 3
	},
	kTimeForMove : 800, // (msec)
	state : {
		isMoving : false,
		direction : undefined
	},
	currentCell : undefined,
	position : undefined,
	renderable : undefined,
	setPosition : function(position) {
		return this.position = position;
	},
	setMoving : function(isMoving) {
		return this.state.isMoving = isMoving;
	},
	setDirection : function(direction) {
		return this.state.direction = direction;
	},
	getPosition : function() {
		return this.position;
	},
	isMoving : function() {
		return this.state.isMoving;
	},
	getDirection : function() {
		return this.state.direction;
	},
	getRenderable : function() {
		return this.renderable;
	},
	initialize : function(argo) {
		var k = J('STU')('Data').get('k');
		this.setDirection(argo.direction);
		this.renderable = argo.renderable;
		this.currentCell = argo.initialCell;
		this.setPosition(J('MAT')('Vec4')({
			x : k.cubePaddingX + k.boxSize * this.currentCell.posX,
			y : 15,
			z : k.cubePaddingX + k.boxSize * this.currentCell.posY,
			w : 1
		}));
		return this;
	},
	update : function() {
		this.updateState();
		this.updatePosition();
		this.updateRenderable();
	},
	updateState : function() {
		var INPUT = J('STU')('Data').get('INPUT');
		if (INPUT.isAnyArrowKeyPressed()) {
			this.setMoving(true);
			switch(INPUT.getRecentlyPressedKeyType()) {
				case this.eDirection.kDirectionLeft:
					this.setDirection(this.eDirection.kDirectionLeft);
					break;
				case this.eDirection.kDirectionRight:
					this.setDirection(this.eDirection.kDirectionRight);
					break;
				case this.eDirection.kDirectionUp:
					this.setDirection(this.eDirection.kDirectionUp);
					break;
				case this.eDirection.kDirectionDown:
					this.setDirection(this.eDirection.kDirectionDown);
					break;
			}
		} else {
			this.setMoving(false);
		}
	},
	updatePosition : function() {
		if (this.isMoving()) {
			switch(this.getDirection()) {
				case this.eDirection.kDirectionLeft:
					this.getPosition().z += 1;
					break;
				case this.eDirection.kDirectionRight:
					this.getPosition().z -= 1;
					break;
				case this.eDirection.kDirectionUp:
					this.getPosition().x -= 1;
					break;
				case this.eDirection.kDirectionDown:
					this.getPosition().x += 1;
					break;
			}
		}
	},
	updateRenderable : function() {
		this.renderable.position.x = this.getPosition().x;
		this.renderable.position.y = this.getPosition().y;
		this.renderable.position.z = this.getPosition().z;
	},
	move : function() {

	}
});
