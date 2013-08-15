function JeremySprite(argo) {
    this.atlas = argo.atlas;
    this.data = argo.data;
    this.frameSequence = null;
    this.currentFrame = 0;
    this.isLooping = false;
    this.isPingpong = false;
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
JeremySprite.prototype.setFrameSequence = function(argo) {
    var sequence = argo.sequence, frameSequece = [], thisSprite = this;
    sequence.forEach(function(elem) {
        frameSequece.push(thisSprite.getFrameIndex(elem));
    });
    this.frameSequence = frameSequece;
    this.isLooping = argo.loop;
    this.isPingpong = argo.pingpong;
    this.currentFrame = 0;
    return this;
};
JeremySprite.prototype.drawFrame = function(ctx, posX, posY, pivot) {
    var frameData = this.getNextFrameData(), frame = frameData.frame, x, y;
    switch(pivot) {
        case JeremySprite.ePivotType.kCenter:
            x = posX - frame.w / 2;
            y = posX - frame.h / 2;
            break;
        case JeremySprite.ePivotType.kLeftTop:
            x = posX;
            y = posY;
            break;
    }
    ctx.drawImage(this.atlas.getImage(), frame.x, frame.y, frame.w, frame.h, x, y, frame.w, frame.h);
    // TODO: Doing
};
JeremySprite.prototype.getCurrentFrameData = function() {
    var frameData = this.data.frames[this.frameSequence[this.currentFrame]];
    return frameData;
};
JeremySprite.prototype.getNextFrameData = function() {
    var frameData = this.getCurrentFrameData();
    this.currentFrame = (this.currentFrame + 1) % this.frameSequence.length;
    // TODO: Looping, PingPong;
    return frameData;
};
(function() {
    var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
    if (target) {
        target.addModule('JeremySprite', JeremySprite);
    }
})();
