/**
 * @author JeremyJeong
 */
function JeremyAsset(type, name, item) {
    this.type = type;
    this.name = name;
    this.item = item;
};
JeremyAsset.prototype.getItem = function () {
    return this.item;
};