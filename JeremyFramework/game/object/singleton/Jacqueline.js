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
	kPositionY : 32,
	kTimeForMove : 1000 / 100, // (msec)
	state : {
		isMoving : false,
		direction : undefined,
		isOnExit : false,
		hasKey : false,
		isDead : false
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
	setHasKey : function(hasKey) {
		return this.state.hasKey = hasKey;
	},
	setOnExit : function(isOnExit) {
		return this.state.isOnExit = isOnExit;
	},
	setDead : function(isDead) {
		return this.state.isDead = isDead;
	},
	getPosition : function() {
		return this.position;
	},
	isMoving : function() {
		return this.state.isMoving;
	},
	isOnExit : function() {
		return this.state.isOnExit;
	},
	hasKey : function() {
		return this.state.hasKey;
	},
	isDead : function() {
		return this.state.isDead;
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
			y : this.kPositionY,
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
		this.updateDirection();
		this.updateMoving();
		this.updateExit();
		this.updateKey();
		this.updateDead();
	},
	updateMoving : function() {
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
	updateExit : function() {
		var isOnExit = false, currentLevel = J('STU')('Data').get('currentLevel'), thisPos = J('STU')('Data').get('MapHelper').positionToLocation(this.position);
		currentLevel.exits.forEach(function(elem) {
			isOnExit = isOnExit || ((elem.posX == thisPos.posX) && (elem.posY == thisPos.posY));
		});
		this.setOnExit(isOnExit);
	},
	updateKey : function() {
		if (this.hasKey()) {
			J('STU')('Data').set('QuestGetKeyClear', true);
			return;
		}
		// TODO : Level이 Key를 가지도록 바꿔야함
		var hasKey = false, keyPos = J('STU')('Data').get('KEY').position, thisPos = this.position;

		this.setHasKey((keyPos.x === thisPos.x) && (keyPos.z === thisPos.z));
	},
	updateDead : function() {
		var MONSTER = J('STU')('Data').get('MONSTER'), CANDLE = J('STU')('Data').get('CANDLE');
		if (this.currentCell.posX == MONSTER.currentCell.posX && this.currentCell.posY == MONSTER.currentCell.posY) {
			this.setDead(true);
			console.log('Dead');
		}
		if (CANDLE.hasNoHeat()) {
			this.setDead(true);
			console.log('Dead');
		}
	},
	updatePosition : function() {
		var k = J('STU')('Data').get('k'), INPUT = J('STU')('Data').get('INPUT');
		if (this.isMoving()) {
			switch(this.getDirection()) {
				case this.eDirection.kDirectionLeft:
					this.move(INPUT.eKeyCode.kArrowLeft, 0, +1, 'z', +k.boxSize);
					break;
				case this.eDirection.kDirectionRight:
					this.move(INPUT.eKeyCode.kArrowRight, 0, -1, 'z', -k.boxSize);
					break;
				case this.eDirection.kDirectionUp:
					this.move(INPUT.eKeyCode.kArrowUp, -1, 0, 'x', -k.boxSize);
					break;
				case this.eDirection.kDirectionDown:
					this.move(INPUT.eKeyCode.kArrowDown, +1, 0, 'x', +k.boxSize);
					break;
			}
		}
	},
	updateDirection : function() {
		var k = J('STU')('Data').get('k');
		switch(this.getDirection()) {
			case this.eDirection.kDirectionLeft:
				this.getRenderable().setRotationFromAxisAngle(k.up, 2 * Math.PI);
				break;
			case this.eDirection.kDirectionRight:
				this.getRenderable().setRotationFromAxisAngle(k.up, -Math.PI);
				break;
			case this.eDirection.kDirectionUp:
				this.getRenderable().setRotationFromAxisAngle(k.up, -Math.PI / 2);
				break;
			case this.eDirection.kDirectionDown:
				this.getRenderable().setRotationFromAxisAngle(k.up, Math.PI / 2);
				break;
		}
	},
	setPositionByCurrentCell : function() {
		var k = J('STU')('Data').get('k');
		this.setPosition(J('MAT')('Vec4')({
			x : k.cubePaddingX + k.boxSize * this.currentCell.posX,
			y : this.kPositionY,
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
			INPUT.setKeyBeingUsed(keyCode, true);
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
			if (!this.nextCell) {
				INPUT.unlockArrowKey();
				INPUT.setKeyBeingUsed(keyCode, false);
				return;
			}
			if (this.nextCell.type == "1") {
				INPUT.unlockArrowKey();
				INPUT.setKeyBeingUsed(keyCode, false);
				return;
			}
			this.movementTimer.tick();
			if (this.movementTimer.isSleeping) {
				INPUT.unlockArrowKey();
				INPUT.setKeyBeingUsed(keyCode, false);
			}
		}
	}
});
