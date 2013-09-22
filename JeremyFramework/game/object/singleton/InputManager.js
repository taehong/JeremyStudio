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
		pressedArrowLeft : false,
		pressedArrowUp : false,
		pressedArrowRight : false,
		pressedArrowDown : false,
		pressedSpacebar : false,
		pressedEscape : false,
	},
	/*
	 * Setters
	 */
	setPressedArrowLeft : function(pressed) {
		this.state.pressedArrowLeft = pressed;
		// console.log('InputManager >> setPressed >> left');
	},
	setPressedArrowUp : function(pressed) {
		this.state.pressedArrowUp = pressed;
		// console.log('InputManager >> setPressed >> up');
	},
	setPressedArrowRight : function(pressed) {
		this.state.pressedArrowRight = pressed;
		// console.log('InputManager >> setPressed >> right');
	},
	setPressedArrowDown : function(pressed) {
		this.state.pressedArrowDown = pressed;
		// console.log('InputManager >> setPressed >> down');
	},
	setPressedSpacebar : function(pressed) {
		this.state.pressedSpacebar = pressed;
		// console.log('InputManager >> setPressed >> spacebar');
	},
	setPressedEscape : function(pressed) {
		this.state.pressedEscape = pressed;
		// console.log('InputManager >> setPressed >> escape');
	},
	setPressedKeyCode : function(keyCode, pressed) {
		switch(keyCode) {
			case this.eKeyCode.kArrowLeft:
				this.setPressedArrowLeft(pressed);
				break;
			case this.eKeyCode.kArrowUp:
				this.setPressedArrowUp(pressed);
				break;
			case this.eKeyCode.kArrowRight:
				this.setPressedArrowRight(pressed);
				break;
			case this.eKeyCode.kArrowDown:
				this.setPressedArrowDown(pressed);
				break;
			case this.eKeyCode.kSpacebar:
				this.setPressedSpacebar(pressed);
				break;
			case this.eKeyCode.kEscape:
				this.setPressedEscape(pressed);
				break;
		}
	},
	/*
	 * Getters
	 */
	isPressedArrowLeft : function() {
		return this.state.pressedArrowLeft;
	},
	isPressedArrowUp : function() {
		return this.state.pressedArrowUp;
	},
	isPressedArrowRight : function() {
		return this.state.pressedArrowRight;
	},
	isPressedArrowDown : function() {
		return this.state.pressedArrowDown;
	},
	isPressedSpacebar : function() {
		return this.state.pressedSpacebar;
	},
	isPressedEscape : function() {
		return this.state.pressedEscape;
	},
	/*
	 * Methods
	 */
	initialize : function() {
		J('STU')('Event').set('onKeyDown', window, 'keydown', function(e) {
			var INPUT = J('STU')('Data').get('INPUT');
			INPUT.setPressedKeyCode(e.keyCode, true);
		});
		J('STU')('Event').set('onKeyUp', window, 'keyup', function(e) {
			var INPUT = J('STU')('Data').get('INPUT');
			INPUT.setPressedKeyCode(e.keyCode, false);
		});
		J('STU')('Event').bind('onKeyDown');
		J('STU')('Event').bind('onKeyUp');
		return this;
	},
	update : function() {
	}
});
