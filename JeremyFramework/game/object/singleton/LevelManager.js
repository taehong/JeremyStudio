/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'LevelManager', {
	/*
	 * Attributes
	 */
	state : {
		isDone : false
	},
	levelConfig : null,
	level : {
	},
	/*
	 * Setters
	 */
	setDone : function(isDone) {
		this.state.isDone = isDone;
	},
	/*
	 * Getters
	 */
	isDone : function() {
		return this.state.isDone;
	},
	/*
	 * Methods
	 */
	initialize : function() {
		J('STU')('Data').set('LEVEL', this);
		this.levelConfig = {
			count : 1,
			config : [{
				name : "1-1",
				path : "game/asset/level/1-1.json"
			}]
		};
		this.loadCount = this.levelConfig.count;
		this.levelConfig.config.forEach(function(elem) {
			J('STU')('Data').get('LEVEL').loadLevel(elem);
		});
		return this;
	},
	update : function() {
		this.updateState();
	},
	updateState : function() {
		if (this.loadCount === 0) {
			this.setDone(true);
		}
	},
	loadLevel : function(levelConfig) {
		$.ajax({
			type : "GET",
			url : levelConfig.path
		}).done(function(data) {
			var LEVEL = J('STU')('Data').get('LEVEL');
			LEVEL.addLevel(levelConfig.name, data);
			LEVEL.loadCount--;
			console.log('Level Loaded : ' + levelConfig.name);
		});
	},
	addLevel : function(levelName, levelData) {
		this.level[levelName] = levelData;
	}
}); 