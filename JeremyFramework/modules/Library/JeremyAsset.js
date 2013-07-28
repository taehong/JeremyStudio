/**
 * @author JeremyJeong
 */
// @param type, name, item
function JeremyAsset(argo) {
    this.type = argo.type;
    this.name = argo.name;
    this.item = argo.item;
};
JeremyAsset.prototype.getItem = function () {
    return this.item;
};
(function() {
	var target = (Jeremy != undefined ? Jeremy.getComponent('JeremyLibrary') : undefined);
	if (target) {
		target.addModule('JeremyAsset', JeremyAsset);
	}
})();