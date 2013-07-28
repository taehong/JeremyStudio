function JeremySprite() {
    _JeremySprite = this;
    this.frames = [];
    this.currentFrame = 0;
}
JeremySprite.prototype.initWithConfig = function (config) {
    var frames = config.frames, frameName, frame;
    for (frameName in frames) {
        frame = new JeremyImage(frames[frameName].src, 'character');
        this.addFrame(frame);
    }
};
JeremySprite.prototype.addFrame = function (frame) {
    this.frames.push(frame);
};
JeremySprite.prototype.nextFrame = function () {
    var returnFrame = this.frames[this.currentFrame];
    this.currentFrame += 1;
    if (this.currentFrame > this.frames.length - 1) {
        this.currentFrame = 0;
    }
    return returnFrame.getImage();
};