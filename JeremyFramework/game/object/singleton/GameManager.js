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
	numberOfStars : 0,
	gameTimer : null,
	/*
	 * Setters
	 */
	setPlaying : function(isPlaying) {
		this.state.isPlaying = isPlaying;
	},
	setWin : function(isWin) {
		this.state.isOn = isWin;
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
		this.gameTimer = J('LIB')('Timer')(0, function(argo, timer) {

		}, {

		});
		this.setPlaying(true);
		return this;
	},
	update : function() {
		this.updateState();
	},
	updateState : function() {
		this.gameTimer.tick();
		// TODO : 승리조건의 검사
		// TODO : 패배조건의 검사
		if (this.isWin || this.isLose)
			this.setPlaying(false);
	}
});
