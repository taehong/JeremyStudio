function JeremySound() {
	//soundbox = new JeremyStudio.Soundbox();
    _JeremySound = this;
    this.context = 
    this.sources = [];
    this.sourceName = [];
}
JeremySound.prototype.initWithConfig = function (config) {
    var  src = config.src, srcName;
    if(srcName === 'endFlag') {
    bufferLoader = new BufferLoader(soundbox.context, this.sources, soundbox.onLoad());
    bufferLoader.load();
    };
    this.addSourceName(srcName);
    this.addSourceUrl(src);
};
JeremySound.prototype.addSourceUrl = function (src) {
	this.sources.push(src);
};
JeremySound.prototype.addSourceName = function (srcName) {
    this.sourceName.push(srcName);
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremySound', JeremySound);
	}
})();