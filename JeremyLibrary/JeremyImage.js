var __JeremyImage = null;
// @param src, className, id
function JeremyImage(argo) {
	__JeremyImage = this;
	this.source = argo.src;
	this.loaded = false;
	this.image = new Image();
	this.image.addEventListener("load", __JeremyImage.loadCompleted(this), false);
	this.image.addEventListener("error", __JeremyImage.loadFailed(this), false);
	this.width = 0;
	this.height = 0;
	if (className) {
		this.image.className = this.className = argo.className;
	} else {
		this.className = "";
	}
	if (id) {
		this.image.id = this.id = argo.id;
	} else {
		this.id = "";
	}
	this.loadSource();
}
JeremyImage.prototype.loadSource = function() {
	console.log("Image Loading : ", this.source);
	this.image.src = this.source;
	return this.image;
};
JeremyImage.prototype.loadCompleted = function(target) {
	return function(e) {
		target.loaded = true;
		target.width = this.width;
		target.height = this.height;
		console.log("Image Loaded : ", target);
	};
};
JeremyImage.prototype.loadFailed = function(target) {
	return function(e) {
		console.log("Image Loading failed : ", target);
		target.loadSource();
	};
};
JeremyImage.prototype.isLoaded = function() {
	return this.loaded;
};
JeremyImage.prototype.setSource = function(src) {
	console.log("Changing Image Source of : ", this);
	this.source = src;
	this.loadSource();
};
JeremyImage.prototype.getSource = function() {
	return this.source;
};
JeremyImage.prototype.getImage = function() {
	if (this.loaded) {
		return this.image;
	} else {
		return this.loadSource();
	}
};
JeremyImage.prototype.getWidth = function() {
	return this.width;
};
JeremyImage.prototype.getHeight = function() {
	return this.height;
};
JeremyImage.prototype.getClassName = function() {
	return this.className;
};
JeremyImage.prototype.getId = function() {
	return this.id;
};