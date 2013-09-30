/**
 * @author Jeremy
 */
J('STU')('Object').set('Singleton', 'MapHelper', {
	/*
	 * Attributes
	 */
	eCollidingCellTypeList : ["1"], //wall, etc.
	state : {
	},
	/*
	* Setters
	*/
	/*
	* Getters
	*/
	/*
	* Methods
	*/
	// initialize : function() {
	// return this;
	// },
	// update : function() {
	// this.updateState();
	// },
	// updateState : function() {
	// },
	getCell : function(cellList, posX, posY) {
		var theCell = null, aCell = null, index, length;
		for ( index = 0, length = cellList.length; index < length; index++) {
			aCell = cellList[index];
			if (aCell.posX == posX) {
				if (aCell.posY == posY) {
					theCell = aCell;
					break;
				}
			} else
				continue;
		}
		return theCell;
	},
	checkCollision : function(cell) {
		var cellType = cell.type, isCollided = false;
		this.eCollidingCellTypeList.forEach(function(elem) {
			if (cellType === elem)
				isCollided = true;
		});
		return isCollided;
	},
	locationToPosition : function(location) {
		var k = J('STU')('Data').get('k'), position = J('MAT')('Vec4')({
			x : k.cubePaddingX + k.boxSize * location.posX,
			y : 15,
			z : k.cubePaddingZ + k.boxSize * location.posY,
			w : 1
		});
		return position;
	},
	positionToLocation : function(position) {
		var k = J('STU')('Data').get('k');
		return {
			posX : (position.x - k.cubePaddingX) / k.boxSize,
			posY : (position.z - k.cubePaddingZ) / k.boxSize
		};
	},
	CellLocation : function(posX, posY) {
		this.posX = posX;
		this.posY = posY;
		// TODO: 추후에 리팩토링을 통해 position과 location의 차이를 정리할 것!
		this.getCurrentCell = function() {
			return this;
		};
	}
});
