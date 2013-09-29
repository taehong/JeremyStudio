/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'InputManager', {
	/*
	 * Attributes
	 */
	eKeyCode : {
		kArrowLeft : 37,
		kArrowUp : 38,
		kArrowRight : 39,
		kArrowDown : 40,
		kSpacebar : 32,
		kEscape : 27
	},
	eKeyType : {
		kArrowLeft : 0,
		kArrowUp : 1,
		kArrowRight : 2,
		kArrowDown : 3,
		kSpacebar : 4,
		kEscape : 5
	},
	state : {
		arrowLeft : {
			pressed : false,
			isBeingUsed : false,
			when : 0
		},
		arrowUp : {
			pressed : false,
			isBeingUsed : false,
			when : 0
		},
		arrowRight : {
			pressed : false,
			isBeingUsed : false,
			when : 0
		},
		arrowDown : {
			pressed : false,
			isBeingUsed : false,
			when : 0
		},
		spacebar : {
			pressed : false,
			isBeingUsed : false,
			when : 0
		},
		escape : {
			pressed : false,
			isBeingUsed : false,
			when : 0
		},
	},
	lock : {
		arrow : false
	},
	/*
	 * Setters
	 */
	setArrowLeftPressed : function(pressed) {
		if (this.lock.arrow)
			return console.log('Locked : Arrow Key');
		this.state.arrowLeft.pressed = pressed;
		this.state.arrowLeft.when = (new Date()).getTime();
	},
	setArrowUpPressed : function(pressed) {
		if (this.lock.arrow)
			return console.log('Locked : Arrow Key');
		this.state.arrowUp.pressed = pressed;
		this.state.arrowUp.when = (new Date()).getTime();
	},
	setArrowRightPressed : function(pressed) {
		if (this.lock.arrow)
			return console.log('Locked : Arrow Key');
		this.state.arrowRight.pressed = pressed;
		this.state.arrowRight.when = (new Date()).getTime();
	},
	setArrowDownPressed : function(pressed) {
		if (this.lock.arrow)
			return console.log('Locked : Arrow Key');
		this.state.arrowDown.pressed = pressed;
		this.state.arrowDown.when = (new Date()).getTime();
	},
	setSpacebarPressed : function(pressed) {
		this.state.spacebar.pressed = pressed;
		this.state.spacebar.when = (new Date()).getTime();
	},
	setEscapePressed : function(pressed) {
		this.state.escape.pressed = pressed;
		this.state.escape.when = (new Date()).getTime();
	},
	setKeyPressed : function(keyCode, pressed) {
		switch(keyCode) {
			case this.eKeyCode.kArrowLeft:
				this.setArrowLeftPressed(pressed);
				break;
			case this.eKeyCode.kArrowUp:
				this.setArrowUpPressed(pressed);
				break;
			case this.eKeyCode.kArrowRight:
				this.setArrowRightPressed(pressed);
				break;
			case this.eKeyCode.kArrowDown:
				this.setArrowDownPressed(pressed);
				break;
			case this.eKeyCode.kSpacebar:
				this.setSpacebarPressed(pressed);
				break;
			case this.eKeyCode.kEscape:
				this.setEscapePressed(pressed);
				break;
		}
	},
	setArrowLeftBeingUsed : function(isBeingUsed) {
		this.state.arrowLeft.isBeingUsed = isBeingUsed;
	},
	setArrowUpBeingUsed : function(isBeingUsed) {
		this.state.arrowUp.isBeingUsed = isBeingUsed;
	},
	setArrowRightBeingUsed : function(isBeingUsed) {
		this.state.arrowRight.isBeingUsed = isBeingUsed;
	},
	setArrowDownBeingUsed : function(isBeingUsed) {
		this.state.arrowDown.isBeingUsed = isBeingUsed;
	},
	setSpacebarBeingUsed : function(isBeingUsed) {
		this.state.spacebar.isBeingUsed = isBeingUsed;
	},
	setEscapeBeingUsed : function(isBeingUsed) {
		this.state.escape.isBeingUsed = isBeingUsed;
	},
	setKeyBeingUsed : function(keyCode, isBeingUsed) {
		switch(keyCode) {
			case this.eKeyCode.kArrowLeft:
				this.setArrowLeftBeingUsed(isBeingUsed);
				break;
			case this.eKeyCode.kArrowUp:
				this.setArrowUpBeingUsed(isBeingUsed);
				break;
			case this.eKeyCode.kArrowRight:
				this.setArrowRightBeingUsed(isBeingUsed);
				break;
			case this.eKeyCode.kArrowDown:
				this.setArrowDownBeingUsed(isBeingUsed);
				break;
			case this.eKeyCode.kSpacebar:
				this.setSpacebarBeingUsed(isBeingUsed);
				break;
			case this.eKeyCode.kEscape:
				this.setEscapeBeingUsed(isBeingUsed);
				break;
		}
	},
	/*
	 * Getters
	 */
	isArrowLeftPressed : function() {
		return this.state.arrowLeft.pressed;
	},
	isArrowUpPressed : function() {
		return this.state.arrowUp.pressed;
	},
	isArrowRightPressed : function() {
		return this.state.arrowRight.pressed;
	},
	isArrowDownPressed : function() {
		return this.state.arrowDown.pressed;
	},
	isSpacebarPressed : function() {
		return this.state.spacebar.pressed;
	},
	isEscapePressed : function() {
		return this.state.escape.pressed;
	},
	isAnyArrowKeyPressed : function() {
		return this.isArrowLeftPressed() || this.isArrowUpPressed() || this.isArrowRightPressed() || this.isArrowDownPressed();
	},
	isArrowLeftBeingUsed : function() {
		return this.state.arrowLeft.isBeingUsed;
	},
	isArrowUpBeingUsed : function() {
		return this.state.arrowUp.isBeingUsed;
	},
	isArrowRightBeingUsed : function() {
		return this.state.arrowRight.isBeingUsed;
	},
	isArrowDownBeingUsed : function() {
		return this.state.arrowDown.isBeingUsed;
	},
	isSpacebarBeingUsed : function() {
		return this.state.spacebar.isBeingUsed;
	},
	isEscapeBeingUsed : function() {
		return this.state.escape.isBeingUsed;
	},
	isAnyArrowKeyBeingUsed : function() {
		return this.isArrowLeftBeingUsed() || this.isArrowUpBeingUsed() || this.isArrowRightBeingUsed() || this.isArrowDownBeingUsed();
	},
	isKeyBeingUsed : function(keyCode) {
		var isBeingUsed = false;
		switch(keyCode) {
			case this.eKeyCode.kArrowLeft:
				isBeingUsed = this.isArrowLeftBeingUsed();
				break;
			case this.eKeyCode.kArrowUp:
				isBeingUsed = this.isArrowUpBeingUsed();
				break;
			case this.eKeyCode.kArrowRight:
				isBeingUsed = this.isArrowRightBeingUsed();
				break;
			case this.eKeyCode.kArrowDown:
				isBeingUsed = this.isArrowDownBeingUsed();
				break;
			case this.eKeyCode.kSpacebar:
				isBeingUsed = this.isSpacebarBeingUsed();
				break;
			case this.eKeyCode.kEscape:
				isBeingUsed = this.isEscapeBeingUsed();
				break;
		}
		return isBeingUsed;
	},
	getRecentlyPressedKeyType : function() {
		var recentlyPressedKey = {
			when : 0
		}, recentlyPressedKeyType = undefined;
		if (this.isArrowLeftPressed())
			if (this.state.arrowLeft.when > recentlyPressedKey.when) {
				recentlyPressedKey = this.state.arrowLeft;
				recentlyPressedKeyType = this.eKeyType.kArrowLeft;
			}
		if (this.isArrowUpPressed())
			if (this.state.arrowUp.when > recentlyPressedKey.when) {
				recentlyPressedKey = this.state.arrowUp;
				recentlyPressedKeyType = this.eKeyType.kArrowUp;
			}
		if (this.isArrowRightPressed())
			if (this.state.arrowRight.when > recentlyPressedKey.when) {
				recentlyPressedKey = this.state.arrowRight;
				recentlyPressedKeyType = this.eKeyType.kArrowRight;
			}
		if (this.isArrowDownPressed())
			if (this.state.arrowDown.when > recentlyPressedKey.when) {
				recentlyPressedKey = this.state.arrowDown;
				recentlyPressedKeyType = this.eKeyType.kArrowDown;
			}
		if (this.isSpacebarPressed())
			if (this.state.spacebar.when > recentlyPressedKey.when) {
				recentlyPressedKey = this.state.spacebar;
				recentlyPressedKeyType = this.eKeyType.kSpacebar;
			}
		if (this.isEscapePressed())
			if (this.state.escape.when > recentlyPressedKey.when) {
				recentlyPressedKey = this.state.escape;
				recentlyPressedKeyType = this.eKeyType.kEscape;
			}
		return recentlyPressedKeyType;
	},
	/*
	 * Methods
	 */
	initialize : function() {
		var EVENT = J('STU')('Event');
		EVENT.set('onKeyDown', window, 'keydown', function(e) {
			// DataManager에 값을 셋팅
			J('STU')('Data').set('newDownKeyCode', e.keyCode);
		});
		EVENT.set('onKeyUp', window, 'keyup', function(e) {
			J('STU')('Data').set('newUpKeyCode', e.keyCode);
		});
		EVENT.bind('onKeyDown');
		EVENT.bind('onKeyUp');
		return this;
	},
	update : function() {
		// DataManager에서 값을 읽어와서 변경~!
		var DATA = J('STU')('Data'), downKeyCode = null, upKeyCode = null;
		if ( downKeyCode = DATA.get('newDownKeyCode')) {
			this.setKeyPressed(downKeyCode, true);
			DATA.set('newDownKeyCode', null);
		}
		if ( upKeyCode = DATA.get('newUpKeyCode')) {
			if (this.isKeyBeingUsed(upKeyCode))
				return;
			this.setKeyPressed(upKeyCode, false);
			DATA.set('newUpKeyCode', null);
		}
	},
	lockArrowKey : function() {
		this.lock.arrow = true;
	},
	unlockArrowKey : function() {
		this.lock.arrow = false;
	}
}); 