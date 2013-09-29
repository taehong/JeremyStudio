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
	kTimeForMove : 1000 / 100, // (msec)
	state : {
		isMoving : false,
		direction : undefined
	},
	currentCell : undefined,
	nextCell : undefined,
	movementTimer : undefined,
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
		var k = J('STU')('Data').get('k'), INPUT = J('STU')('Data').get('INPUT');
		if (this.isMoving()) {
			switch(this.getDirection()) {
				case this.eDirection.kDirectionLeft:
					this.move(INPUT.eKeyCode.kArrowLeft, 0, +1, 'z', +k.boxSize);
					console.log('왼쪽');
					break;
				case this.eDirection.kDirectionRight:
					this.move(INPUT.eKeyCode.kArrowRight, 0, -1, 'z', -k.boxSize);
					console.log('오른쪽');
					break;
				case this.eDirection.kDirectionUp:
					this.move(INPUT.eKeyCode.kArrowUp, -1, 0, 'x', -k.boxSize);
					console.log('위쪽');
					break;
				case this.eDirection.kDirectionDown:
					this.move(INPUT.eKeyCode.kArrowDown, +1, 0, 'x', +k.boxSize);
					console.log('아래쪽');
					break;
			}
		}
	},
	setPositionByCurrentCell : function() {
		var k = J('STU')('Data').get('k');
		this.setPosition(J('MAT')('Vec4')({
			x : k.cubePaddingX + k.boxSize * this.currentCell.posX,
			y : 15,
			z : k.cubePaddingX + k.boxSize * this.currentCell.posY,
			w : 1
		}));
	},
	updateRenderable : function() {
		this.renderable.position.x = this.getPosition().x;
		this.renderable.position.y = this.getPosition().y;
		this.renderable.position.z = this.getPosition().z;
	},
	move : function(keyCode, dX, dY, dir, amount) {
		var INPUT = J('STU')('Data').get('INPUT'), MapHelper = J('STU')('Data').get('MapHelper'), k = J('STU')('Data').get('k');
		if (!INPUT.isKeyBeingUsed(keyCode)) {
			INPUT.setKeyBeingUsed(keyCode,true);
			INPUT.lockArrowKey();
			this.nextCell = MapHelper.getCell(J('STU')('Data').get('currentLevel').cellList, +(this.currentCell.posX) + dX, +(this.currentCell.posY) + dY);
			this.movementTimer = J('LIB')('Timer')({
				unit : this.kTimeForMove,
				onTick : function(argo, timer) {
					var w = argo.walker;
					if (timer.count < timer.unit) {
						w.getPosition()[argo.dir] += argo.amount / timer.unit;
						console.log(argo.amount / timer.unit);
					} else {
						timer.sleep();
						w.currentCell = w.nextCell;
						w.nextCell = undefined;
						w.setPositionByCurrentCell();
					}
				},
				argo : {
					walker : this,
					amount : amount,
					dir : dir
				}
			});
		} else {
			this.movementTimer.tick();
			if (this.movementTimer.isSleeping) {
				INPUT.setKeyBeingUsed(keyCode, false);
			}
		}
	}
});
