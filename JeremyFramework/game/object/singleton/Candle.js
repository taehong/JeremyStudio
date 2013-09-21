/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'Candle', {
	state : {
		isOn : false
	},
	setOn : function(isOn) {
		this.state.isOn = isOn;
	},
	isOn : function() {
		return this.state.isOn;
	},
	initialize : function(isOn) {
		this.setOn(isOn);
	},
	update : function() {
		this.updateState();
	},
	updateState : function() {
	}
}); 