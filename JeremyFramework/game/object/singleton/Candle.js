/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'Candle', {
	state : {
		isOn : false
	},
	timer : null,
	setOn : function(isOn) {
		this.state.isOn = isOn;
	},
	isOn : function() {
		return this.state.isOn;
	},
	initialize : function() {
		this.setOn(true);
	},
	update : function() {
		this.updateState();
	},
	updateState : function() {
	}
});
