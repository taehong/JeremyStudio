// JeremyCanvas needs jQuery.

function JeremyCanvas(str_selector, str_id, str_ctxMode, num_Width, num_Height, num_zIndex, px_Top, px_Left) {
    this.id = str_id;
    this.width = num_Width;
    this.height = num_Height;
    this.top = px_Top;
    this.left = px_Left;
    this.zIndex = num_zIndex;

    var canvasElementStr = '<canvas id=\"' + this.id + '\" width=\"' + this.width + '\" height=\"' + this.height + '\"' + 'style=\"' +
        'position : absolute;' +
        ' left: ' + this.left + ';' +
        ' top: ' + this.top + ';' +
        'z-index : ' + this.zIndex + '\"' + '>canvas</canvas>';
    $(str_selector).append(canvasElementStr);

    this.canvas = window.document.getElementById(this.id);
    this.canvas.ondblclick = function (e) {e.preventDefault();};
    this.context = this.canvas.getContext(str_ctxMode);
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