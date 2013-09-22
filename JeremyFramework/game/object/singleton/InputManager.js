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
			when : 0
		},
		arrowUp : {
			pressed : false,
			when : 0
		},
		arrowRight : {
			pressed : false,
			when : 0
		},
		arrowDown : {
			pressed : false,
			when : 0
		},
		spacebar : {
			pressed : false,
			when : 0
		},
		escape : {
			pressed : false,
			when : 0
		},
	},
	/*
	 * Setters
	 */
	setArrowLeftPressed : function(pressed) {
		this.state.arrowLeft.pressed = pressed;
		this.state.arrowLeft.when = (new Date()).getTime();
		console.log('InputManager >> setPressed >> left');
	},
	setArrowUpPressed : function(pressed) {
		this.state.arrowUp.pressed = pressed;
		this.state.arrowUp.when = (new Date()).getTime();
		console.log('InputManager >> setPressed >> up');
	},
	setArrowRightPressed : function(pressed) {
		this.state.arrowRight.pressed = pressed;
		this.state.arrowRight.when = (new Date()).getTime();
		console.log('InputManager >> setPressed >> right');
	},
	setArrowDownPressed : function(pressed) {
		this.state.arrowDown.pressed = pressed;
		this.state.arrowDown.when = (new Date()).getTime();
		console.log('InputManager >> setPressed >> down');
	},
	setSpacebarPressed : function(pressed) {
		this.state.spacebar.pressed = pressed;
		this.state.spacebar.when = (new Date()).getTime();
		console.log('InputManager >> setPressed >> spacebar');
	},
	setEscapePressed : function(pressed) {
		this.state.escape.pressed = pressed;
		this.state.escape.when = (new Date()).getTime();
		console.log('InputManager >> setPressed >> escape');
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
			this.setKeyPressed(upKeyCode, false);
			DATA.set('newUpKeyCode', null);
		}
	}
});
