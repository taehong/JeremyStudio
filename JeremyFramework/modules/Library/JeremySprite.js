function JeremySprite(argo) {
	this.atlas = argo.atlas;
	this.data = argo.data;
	this.sequence = argo.sequence;
	this.currentSequence = null;
	this.currentFrameIndex = 0;
	this.timer = new JeremyTimer();
}

JeremySprite.ePivotType = {
	kLeftTop : 0,
	kCenter : 1
};
JeremySprite.prototype.getWidth = function() {
	if (!this.width) {
		return this.width = this.data.frames[0].sourceSize.w;
	} else {
		return this.width;
	}
};
JeremySprite.prototype.getHeight = function() {
	if (!this.height) {
		return this.height = this.data.frames[0].sourceSize.h;
	} else {
		return this.height;
	}
};
JeremySprite.prototype.getFrameIndex = function(frameName) {
	var frameIndex = -1, frames = this.data.frames;
	frames.forEach(function(elem, index) {
		if (elem.filename.split('.')[0] === frameName) {
			frameIndex = index;
		}
	});
	return frameIndex;
};
JeremySprite.prototype.getCurrentFrameData = function() {
	var frameData = this.data.frames[this.getFrameIndex(this.currentSequence.frames[this.currentFrameIndex])];
	return frameData;
};
JeremySprite.prototype.getNextFrameData = function() {
	this.tickTimer();
	// time passed as duration
	if (this.timer.count > 0) {
		this.currentFrameIndex = (this.currentFrameIndex + 1) % this.currentSequence.frames.length;
		this.resetTimer();
	}
	// TODO: Looping, PingPong;
	return this.getCurrentFrameData();
};
JeremySprite.prototype.getSequence = function(name) {
	var sequence = this.sequence[name];
	if (sequence) {
		return sequence;
	} else
		return undefined;
};
JeremySprite.prototype.setCurrentSequence = function(name) {
	var sequence = this.getSequence(name);
	if (sequence) {
		this.currentSequence = sequence;
		this.initTimer();
	}
	return this;
};
JeremySprite.prototype.drawFrame = function(ctx, posX, posY, pivot) {
	var l = {
		frame : this.getNextFrameData().frame,
		x : 0,
		y : 0
	};
	switch(pivot) {
		case JeremySprite.ePivotType.kCenter:
			l.x = posX - l.frame.w / 2;
			l.y = posY - l.frame.h / 2;
			break;
		case JeremySprite.ePivotType.kLeftTop:
			l.x = posX;
			l.y = posY;
			break;
	}
	ctx.drawImage(this.atlas.getImage(), l.frame.x, l.frame.y, l.frame.w, l.frame.h, l.x, l.y, l.frame.w, l.frame.h);
	// TODO: Doing
};
JeremySprite.prototype.initTimer = function() {
	this.timer.unit = this.currentSequence.durations[this.currentFrameIndex];
};
JeremySprite.prototype.tickTimer = function() {
	this.timer.tick();
};
JeremySprite.prototype.resetTimer = function() {
	this.timer.reset();
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremySprite', JeremySprite);
	}
})();
