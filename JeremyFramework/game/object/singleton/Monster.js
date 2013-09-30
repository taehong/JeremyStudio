/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'Monster', {
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
	},
	initialCell : undefined,
	currentCell : undefined,
	nextCell : undefined,
	movementTimer : undefined,
	position : undefined,
	renderable : undefined,
	vision : [],
	sensedLights : [],
	selectedLight : undefined,
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
		this.initialCell = this.currentCell = argo.location;
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
		// this.updatePosition();
		// this.updateRenderable();
		this.see();
		this.senseLight();
		this.selectLight();
		this.returnToInitialCell();
	},
	updateState : function() {
		this.updateDirection();
		this.updateMoving();
	},
	updateMoving : function() {
		if (1) {
			this.setMoving(true);
			switch(1) {
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
		var lightDist;

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
			}
		}
	},
	senseLight : function() {
		var lights = [], vision = this.vision, sensedLights = [];
		lights.push(J('STU')('Data').get('CANDLE'));
		for (var visionIdx = 0, visionNum = vision.length; visionIdx < visionNum; visionIdx++) {
			for (var lightIdx = 0, lightNum = lights.length; lightIdx < lightNum; lightIdx++) {
				var samePosX = vision[visionIdx].posX == lights[lightIdx].getCurrentCell().posX;
				var samePosY = vision[visionIdx].posY == lights[lightIdx].getCurrentCell().posY;
				var lightIsOn = lights[lightIdx].isOn();
				if (samePosX && samePosY && lightIsOn)
					sensedLights.push(lights[lightIdx]);
			}
		}
		this.sensedLights = sensedLights;
	},
	see : function() {
		var MapHelper = J('STU')('Data').get('MapHelper'), currCell = this.currentCell, dir = {
			N : new MapHelper.CellLocation(+currCell.posX - 1, +currCell.posY - 1),
			NE : new MapHelper.CellLocation(+currCell.posX + 0, +currCell.posY - 1),
			E : new MapHelper.CellLocation(+currCell.posX + 1, +currCell.posY - 1),
			SE : new MapHelper.CellLocation(+currCell.posX + 1, +currCell.posY + 0),
			S : new MapHelper.CellLocation(+currCell.posX + 1, +currCell.posY + 1),
			SW : new MapHelper.CellLocation(+currCell.posX + 0, +currCell.posY + 1),
			W : new MapHelper.CellLocation(+currCell.posX - 1, +currCell.posY + 1),
			NW : new MapHelper.CellLocation(+currCell.posX - 1, +currCell.posY + 0)
		};
		this.vision = [];
		this.castRay(dir.N, -1, -1);
		this.castRay(dir.NE, 0, -1);
		this.castRay(dir.E, +1, -1);
		this.castRay(dir.SE, +1, 0);
		this.castRay(dir.S, +1, +1);
		this.castRay(dir.SW, 0, +1);
		this.castRay(dir.W, -1, +1);
		this.castRay(dir.NW, -1, 0);
	},
	castRay : function(cellLoc, nextDX, nextDY) {
		var MapHelper = J('STU')('Data').get('MapHelper'), currentLevel = J('STU')('Data').get('currentLevel'), cell = MapHelper.getCell(currentLevel.cellList, +cellLoc.posX, +cellLoc.posY);
		if (!MapHelper.checkCollision(cell)) {
			this.vision.push(cellLoc);
			return this.castRay(new MapHelper.CellLocation(+cellLoc.posX + nextDX, +cellLoc.posY + nextDY), nextDX, nextDY);
		} else {
			return;
		}
	},
	selectLight : function() {
		var selectedLight = undefined, lights = this.sensedLights;
		for (var lightIdx = 0, lightNum = lights.length; lightIdx < lightNum; lightIdx++) {
			// 촛불의 우선순위가 높다
			if (lights[lightIdx].kLightType === "Candle") {
				selectedLight = lights[lightIdx];
				break;
			} else {
				// 첫 램프를 선택
				if (selectedLight === undefined)
					selectedLight = lights[lightIdx];
				// 이미 선택된 램프와의 거리
				var prevLightDist = Math.abs(selectedLight.getCurrentCell().posX - this.currentCell.posX) + Math.abs(selectedLight.getCurrentCell().posY - this.currentCell.posY);
				// 새로운 램프와의 거리
				var nextLightDist = Math.abs(lights[lightIdx].getCurrentCell().posX - this.currentCell.posX) + Math.abs(lights[lightIdx].getCurrentCell().posY - this.currentCell.posY);
				// 새로운 램프가 더 가까우면 그것을 선택
				if (prevLightDist < nextLightDist) {
					selectedLight = lights[lightIdx];
				} // 같거나 작다면 먼저 선택된 것으로 유지
			}
		}
		this.selectedLight = selectedLight;
	},
	returnToInitialCell : function() {
		if (this.selectedLight == undefined)
			this.selectedLight = this.initialCell;
	}
});
