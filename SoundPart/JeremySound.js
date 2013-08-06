var soundSources = [];
function JeremySound() {
    _JeremySound = this;
}
JeremySound.prototype.initWithConfig = function (config) {
    var src = config.src;
    this.addSourceUrl(src);
    console.log("Sound Loading : ", src);
};
JeremySound.prototype.addSourceUrl = function (src) {
	soundSources.push(src);
};