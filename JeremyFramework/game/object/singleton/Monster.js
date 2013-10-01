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
		direction : undefined
	},
	moveLock : false,
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
		this.selectedLight = this.initialCell = this.currentCell = argo.location;
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
		this.see();
		this.senseLight();
		this.selectLight();
		// TODO : 되돌아가는 코드
		// this.returnToInitialCell();
	},
	updateState : function() {
		this.updateDirection();
		this.updateMoving();
	},
	updateMoving : function() {
		if (this.selectedLight.getCurrentCell) {
			this.kTimeForMove = 1000 / 100;
			var lightCell = this.selectedLight.getCurrentCell();
		} else {
			// TODO : 되돌아가는 코드
			// Return
			this.kTimeForMove = 1000 / 50;
			var lightCell = this.selectedLight;
		}
		var thisCell = this.currentCell;
		var lightDistX = lightCell.posX - thisCell.posX;
		var lightDistY = lightCell.posY - thisCell.posY;
		if (lightDistX == 0 && lightDistY == 0) {
			this.setMoving(false);
		} else {
			this.setMoving(true);
			if (lightDistX == 0) {
				// X거리가 0이면 Y로 움직인다
				if (lightDistY > 0) {
					this.setDirection(this.eDirection.kDirectionLeft);
				} else {
					this.setDirection(this.eDirection.kDirectionRight);
				}
			} else if (lightDistY == 0) {
				// Y거리가 0이면 X로 움직인다
				if (lightDistX > 0) {
					this.setDirection(this.eDirection.kDirectionDown);
				} else {
					this.setDirection(this.eDirection.kDirectionUp);
				}
			} else {
				// X방향과 Y방향 중 하나를 선택해야 한다.
				// 절대값이 작은 쪽으로 먼저 움직이도록 한다.
				if (Math.abs(lightDistX) > Math.abs(lightDistY)) {
					if (lightDistY > 0) {
						this.setDirection(this.eDirection.kDirectionLeft);
					} else {
						this.setDirection(this.eDirection.kDirectionRight);
					}
				} else if (Math.abs(lightDistX) < Math.abs(lightDistY)) {
					if (lightDistX > 0) {
						this.setDirection(this.eDirection.kDirectionDown);
					} else {
						this.setDirection(this.eDirection.kDirectionUp);
					}
				} else {
					// 절대값이 같으므로 둘 중에 아무 방향으로나 움직인다.
					if (Math.random() >= 0.5) {
						if (lightDistY > 0) {
							this.setDirection(this.eDirection.kDirectionLeft);
						} else {
							this.setDirection(this.eDirection.kDirectionRight);
						}
					} else {
						if (lightDistX > 0) {
							this.setDirection(this.eDirection.kDirectionDown);
						} else {
							this.setDirection(this.eDirection.kDirectionUp);
						}
					}
				}
			}
		}
	},
	updatePosition : function() {
		var k = J('STU')('Data').get('k');
		if (this.isMoving()) {
			switch(this.getDirection()) {
				case this.eDirection.kDirectionLeft:
					this.move(0, +1, 'z', +k.boxSize);
					console.log('왼쪽');
					break;
				case this.eDirection.kDirectionRight:
					this.move(0, -1, 'z', -k.boxSize);
					console.log('오른쪽');
					break;
				case this.eDirection.kDirectionUp:
					this.move(-1, 0, 'x', -k.boxSize);
					console.log('위쪽');
					break;
				case this.eDirection.kDirectionDown:
					this.move(+1, 0, 'x', +k.boxSize);
					console.log('아래쪽');
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
		this.getRenderable().rotateX(Math.PI / 2);
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
	move : function(dX, dY, dir, amount) {
		var MapHelper = J('STU')('Data').get('MapHelper'), k = J('STU')('Data').get('k');
		if (!this.moveLock) {
			this.moveLock = true;
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
			if (this.nextCell.type == "1")
				return this.moveLock = false;
			this.movementTimer.tick();
			if (this.movementTimer.isSleeping) {
				this.moveLock = false;
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

		this.castRay(dir.N, -1, 0);
		this.castRay(dir.N, -1, -1);
		this.castRay(dir.N, 0, -1);

		this.castRay(dir.NE, 0, -1);

		this.castRay(dir.E, 0, -1);
		this.castRay(dir.E, +1, -1);
		this.castRay(dir.E, +1, 0);

		this.castRay(dir.SE, +1, 0);

		this.castRay(dir.S, +1, 0);
		this.castRay(dir.S, +1, +1);
		this.castRay(dir.S, 0, +1);

		this.castRay(dir.SW, 0, +1);

		this.castRay(dir.W, 0, +1);
		this.castRay(dir.W, -1, +1);
		this.castRay(dir.W, -1, 0);

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
		if (this.selectedLight == undefined) {
			this.selectedLight = this.initialCell;
		}
	}
});
