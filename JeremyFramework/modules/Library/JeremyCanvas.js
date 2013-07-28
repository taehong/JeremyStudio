// JeremyCanvas needs jQuery.
// @param str_selector, str_id, str_ctxMode, num_Width, num_Height, num_zIndex, px_Top, px_Left
function JeremyCanvas(argo) {
    this.id = argo.str_id;
    this.width = argo.num_Width;
    this.height = argo.num_Height;
    this.top = argo.px_Top;
    this.left = argo.px_Left;
    this.zIndex = argo.num_zIndex;

    var canvasElementStr = '<canvas id=\"' + this.id + '\" width=\"' + this.width + '\" height=\"' + this.height + '\"' + 'style=\"' +
        'position : absolute;' +
        ' left: ' + this.left + ';' +
        ' top: ' + this.top + ';' +
        'z-index : ' + this.zIndex + '\"' + '>canvas</canvas>';
    $(argo.str_selector).append(canvasElementStr);

    this.canvas = window.document.getElementById(this.id);
    this.canvas.ondblclick = function (e) {e.preventDefault();};
    this.context = this.canvas.getContext(argo.str_ctxMode);
}
JeremyCanvas.prototype.setWidth = function (newWidth) {
    this.width = newWidth;

    var SELECTOR = "#" + this.id;
    $(SELECTOR).attr("width", this.width);

    return this.width;
};
JeremyCanvas.prototype.setHeight = function (newHeight) {
    this.height = newHeight;

    var SELECTOR = "#" + this.id;
    $(SELECTOR).attr("height", this.height);

    return this.height;
};
JeremyCanvas.prototype.getCanvas = function () {
    return this.canvas;
};
JeremyCanvas.prototype.getContext = function () {
    return this.context;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyCanvas', JeremyCanvas);
	}
})();