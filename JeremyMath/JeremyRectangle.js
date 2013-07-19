/**
 * @author Jeremy Jeong
 */
function JeremyRectangle(x, y, w, h) {
    this.left = x;
    this.top = y;
    this.right = x + w;
    this.bottom = y + h;
}
JeremyRectangle.prototype.isIntersectingWith = function (rectangle) {
    var isIntersecting = false,
        leftTopTest = this.isContaining(rectangle.leftTop()),
        rightTopTest = this.isContaining(rectangle.rightTop()),
        leftBottomTest = this.isContaining(rectangle.leftBottom()),
        rightBottomTest = this.isContaining(rectangle.rightBottom());
    if (leftTopTest || rightTopTest || leftBottomTest || rightBottomTest) {
        isIntersecting = true;
    }
    return isIntersecting;
};
JeremyRectangle.prototype.isContaining = function (point) {
    var isContaining = false,
        horizontalTest = (this.left <= point.x && this.right >= point.x),
        verticalTest = (this.top <= point.y && this.bottom >= point.y);
    if (horizontalTest && verticalTest) {
        isContaining = true;
    }
    return isContaining;
};
JeremyRectangle.prototype.leftTop = function () {
    return new JeremyVector3(this.left, this.top, 1);
};
JeremyRectangle.prototype.rightTop = function () {
    return new JeremyVector3(this.right, this.top, 1);
};
JeremyRectangle.prototype.leftBottom = function () {
    return new JeremyVector3(this.left, this.bottom, 1);
};
JeremyRectangle.prototype.rightBottom = function () {
    return new JeremyVector3(this.right, this.bottom, 1);
};