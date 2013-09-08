/**
 * @author Jeremy
 */
var Heroine = {
	renderable : J('LIB')('Renderable2D')({
		layer : 'game',
		drawCB : function(ctx, argo) {
			var characterPos = J('STU')('Data').get('characterPos');
			argo.sprite.drawFrame(ctx, characterPos.x, characterPos.y, argo.pivot);
		},
		argo : {
			sprite : J('STU')('Asset').get('sprite', 'GirlSprite').setCurrentSequence('walkFront'),
			pivot : JeremySprite.ePivotType.kCenter
		}
	}),
	attribute : {
		position : {
			x : 0,
			y : 0
		},
		direction : undefined
	},
	state : {
		direction : ['front', 'left', 'right', 'rear']
	},
	action : {
		/*
		 * argo.state : a name of state
		 * argo.value : a value contained in the state
		 */
		setState : function(argo) {
			var state, value;
			// There's no such state
			if (!( state = this.state[argo.state]))
				return false;
			// There's no such value
			if (-1 === ( value = state.indexOf(argo.value)))
				return false;
			// Set state (the string value)
			this.attribute[argo.state] = state[value];
			return true;
		}
	},
	init: function() {
		
	},	
	update : function() {
		// J('STU')('Data').set('characterPos', this.getAttribute('position'));
	},
	doAction : function(action, argo) {
		var theAction = this.getAction(action);
		if (theAction !== null) {
			return theAction(argo);
		} else {
			return false;
		}
	},
	getAction : function(action) {
		var theAction = this.action[action];
		return (theAction !== undefined ? theAction : null);
	}
};
