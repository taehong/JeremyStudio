/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'GameManager', {
	/*
	 * Attributes
	 */
	state : {
		isPlaying : false, // True : Keep play, False : Game Over
		isWin : false,
		isLose : false
	},
	scoredStars : 0,
	timer : null,
	playTimer : null,
	currentLevel : null,
	/*
	 * Setters
	 */
	setPlaying : function(isPlaying) {
		this.state.isPlaying = isPlaying;
	},
	setWin : function(isWin) {
		this.state.isWin = isWin;
	},
	setLose : function(isLose) {
		this.state.isLose = isLose;
	},
	/*
	 * Getters
	 */
	isWin : function() {
		return this.state.isWin;
	},
	isPlaying : function() {
		return this.state.isPlaying;
	},
	isLose : function() {
		return this.state.isLose;
	},
	/*
	 * Methods
	 */
	initialize : function() {
		this.setWin(false);
		this.setLose(false);
		this.setPlaying(true);
		this.timer = J('LIB')('Timer')({
			unit : 1000,
			onTick : function(argo, timer) {
				document.title = timer.count + 'sec';
			},
			argo : {

			}
		});
		this.playTimer = J('LIB')('Timer')({
			unit : 100
		});
		return this;
	},
	update : function() {
		if (this.isPlaying()) {
			this.timer.tick();
			this.playTimer.tick();
		}
		this.updateState();
	},
	updateState : function() {
		var JACQUELINE = J('STU')('Data').get('JACQUELINE'), CANDLE = J('STU')('Data').get('CANDLE');
		if (JACQUELINE.hasKey() && JACQUELINE.isOnExit())
			this.setWin(true);
		if (CANDLE.hasNoHeat() || JACQUELINE.isDead())
			this.setLose(true);
		if (this.isWin() || this.isLose())
			this.setPlaying(false);
	}
});
