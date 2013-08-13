/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
    name : 'EditorMain',
    initCB : function() {
        this.itemImgs = {
            key : J('STU')('Asset').get('image', 'itemImgKey'),
            button : J('STU')('Asset').get('image', 'itemImgButton'),
            monster : J('STU')('Asset').get('image', 'itemImgMonster'),
            start : J('STU')('Asset').get('image', 'itemImgStart'),
            end : J('STU')('Asset').get('image', 'itemImgEnd')
        };
        this.renderables = {};
        this.renderables.key = J('LIB')('Renderable2D')({
            layer : 'gui',
            drawCB : function(ctx, argo) {
                ctx.drawImage(argo.img().getImage(), argo.posX, argo.posY, argo.width, argo.height);
            },
            argo : {
                img : function() {
                    return J('STU')('Asset').get('image', 'itemImgKey');
                },
                posX : 10,
                posY : 10,
                width : 50,
                height : 50
            }
        });
        this.renderables.button = J('LIB')('Renderable2D')({
            layer : 'gui',
            drawCB : function(ctx, argo) {
                ctx.drawImage(argo.img().getImage(), argo.posX, argo.posY, argo.width, argo.height);
            },
            argo : {
                img : function() {
                    return J('STU')('Asset').get('image', 'itemImgButton');
                },
                posX : 400,
                posY : 200,
                width : 50,
                height : 50
            }
        });
        this.renderables.monster = J('LIB')('Renderable2D')({
            layer : 'gui',
            drawCB : function(ctx, argo) {
                var pos = argo.pos() || {
                    x : 0,
                    y : 0
                };
                ctx.drawImage(argo.img().getImage(), pos.x, pos.y, argo.width, argo.height);
            },
            argo : {
                img : function() {
                    return J('STU')('Asset').get('image', 'itemImgMonster');
                },
                pos : function() {
                    return J('STU')('Data').get('mousePos')
                },
                width : 50,
                height : 50
            }
        });
        J('STU')('R2D').add(this.renderables.key);
        J('STU')('R2D').add(this.renderables.button);
        J('STU')('R2D').add(this.renderables.monster);
        $('#jeremy').bind('click', function(e) {
            J('STU')('Data').set('clickPos', {
                x : e.offsetX,
                y : e.offsetY
            });
            J('STU')('Data').set('isNewClick', true);
        });
        $('#jeremy').bind('mousemove', function(e) {
            J('STU')('Data').set('mousePos', {
                x : e.offsetX,
                y : e.offsetY
            });
            console.log({
                x : e.offsetX,
                y : e.offsetY
            });
        });

        function isometricProjection(ctx) {
            var vMargin = 0, hMargin = 0, cWidth = 720, cHeight = 480, tileSize = kCellWidth, tileNum = s, sqrt2 = Math.sqrt(2), toRadian = Math.PI / 180;
            vMargin = cWidth / 2;
            hMargin = (cHeight - tileSize * (sqrt2 / 2) * tileNum) / 2;
            // change projection to isometric view
            ctx.translate( kVerticalMargin = vMargin, kHorizontalMargin = hMargin);
            ctx.scale(1, 0.5);
            ctx.rotate(45 * toRadian);
        };
    },
    updateCB : function() {
        if (J('STU')('Data').get('isNewClick')) {
            J('STU')('R2D').add(J('LIB')('Renderable2D')({
                layer : 'gui',
                drawCB : function(ctx, argo) {
                    var pos = argo.pos;
                    ctx.drawImage(argo.img().getImage(), pos.x, pos.y, argo.width, argo.height);
                },
                argo : {
                    img : function() {
                        return J('STU')('Asset').get('image', 'itemImgButton');
                    },
                    pos : J('STU')('Data').get('clickPos'),
                    width : 50,
                    height : 50
                }
            }));
            J('STU')('Data').set('isNewClick', false);
        }
    },
    destroyCB : function() {
        J('STU')('R2D').remove(this.renderables.key);
        J('STU')('R2D').remove(this.renderables.button);
        J('STU')('R2D').remove(this.renderables.monster);
    }
}));
/*
 function Cell(posX, posY, type, item) {
 this.init = function(posX, posY, type, item) {
 this.posX = posX;
 this.posY = posY;
 this.type = type;
 this.item = item;
 };
 this.update = function() {
 posX = this.posX;
 posY = this.posY;
 this.draw(posX, posY);
 };
 this.draw = function(posX, posY) {
 ctx.strokeRect(posX * kCellWidth, posY * kCellHeight, kCellWidth, kCellHeight);
 };
 this.fill = function(posX, posY) {
 ctx.fillRect(posX * kCellWidth + 1, posY * kCellHeight + 1, kCellWidth - 2, kCellHeight - 2);
 };
 this.init(posX, posY, type, item);
 }

 var canvas, ctx;
 var img = [];
 var kCellWidth, kCellHeight;
 var kVerticalMargin = 0, kHorizontalMargin = 0;
 var icanvas = document.getElementById('itemcanvas');
 var ictx = icanvas.getContext('2d');
 var s;
 var imagenumber = 0;
 var i;
 var k = 0;
 var rawX, rawY;
 var newX, newY;
 var x, y;
 var listIndex = 0;
 var listLength;
 var cellList = [];
 var imagecolliderList = [];
 var colliderList = [];
 var eCellType = {
 eCellEmpty : 0,
 eCellWall : 1,
 eCellGround : 2
 };
 var itemType = {
 itemEmpty : 0,
 itemKey : 1,
 itemButton : 2,
 itemDuck : 3,
 itemWolf : 4,
 itemStart : 5,
 itemEnd : 6
 };
 var jsonText;
 var dragsw = false;
 var sw;
 var imagesw;
 var cellfilter = new Array();
 cellfilter[0] = "posX";
 cellfilter[1] = "posY";
 cellfilter[2] = "type";
 cellfilter[3] = "item";
 function init() {
 canvas = document.getElementById('canvas');
 ctx = canvas.getContext('2d');
 kCellWidth = kCellHeight = 50;
 initCells(10, 10);
 ctx.save();
 isometricProjection(ctx);
 updateCells();
 ctx.restore();
 }

 function initCells(numOfX, numOfY) {
 var xIndex, yIndex;
 s = numOfX;
 for ( yIndex = 0; yIndex < numOfY; yIndex += 1) {
 for ( xIndex = 0; xIndex < numOfX; xIndex += 1) {
 cellList.push(new Cell(xIndex, yIndex, eCellType.eCellEmpty, itemType.itemEmpty));
 colliderList.push(new Collider(xIndex, yIndex, kCellWidth, kCellHeight));
 }
 }
 }

 function updateCells() {
 listLength = cellList.length;
 for (listIndex, listLength; listIndex < listLength; listIndex += 1) {
 cellList[listIndex].update();
 }
 }

 function Cell(posX, posY, type, item) {
 this.init(posX, posY, type, item);
 }

 Cell.prototype.init = function(posX, posY, type, item) {
 this.posX = posX;
 this.posY = posY;
 this.type = type;
 this.item = item;
 };
 Cell.prototype.update = function() {
 posX = this.posX;
 posY = this.posY;
 this.draw(posX, posY);
 };

 function isometricProjection(ctx) {
 var vMargin = 0, hMargin = 0, cWidth = 720, cHeight = 480, tileSize = kCellWidth, tileNum = s, sqrt2 = Math.sqrt(2), toRadian = Math.PI / 180;
 vMargin = cWidth / 2;
 hMargin = (cHeight - tileSize * (sqrt2 / 2) * tileNum) / 2;
 // change projection to isometric view
 ctx.translate( kVerticalMargin = vMargin, kHorizontalMargin = hMargin);
 ctx.scale(1, 0.5);
 ctx.rotate(45 * toRadian);
 };
 Cell.prototype.draw = function(posX, posY) {
 ctx.strokeRect(posX * kCellWidth, posY * kCellHeight, kCellWidth, kCellHeight);
 };
 Cell.prototype.fill = function(posX, posY) {
 ctx.fillRect(posX * kCellWidth + 1, posY * kCellHeight + 1, kCellWidth - 2, kCellHeight - 2);
 };
 function Collider(posX, posY, width, height) {
 this.init(posX, posY, width, height);
 }

 Collider.prototype.init = function(posX, posY, width, height) {
 this.posX = posX;
 this.posY = posY;
 this.width = width;
 this.height = height;
 };
 Collider.prototype.isCollided = function(ptX, ptY) {
 var horizontal = (this.posX * this.width < ptX) && ((this.posX + 1) * this.width > ptX), vertical = (this.posY * this.height < ptY) && ((this.posY + 1) * this.height > ptY);
 result = false;
 if (horizontal && vertical)
 result = true;
 return result;
 };
 function judge(newX, newY) {
 for ( listIndex = listLength + k - 1; listIndex >= 0; listIndex -= 1) {
 sw = colliderList[listIndex].isCollided(newX, newY);
 if (sw) {
 break;
 }
 }
 }

 function imagejudge(x, y) {
 for ( i = 0; i < imagenumber; ++i) {
 imagesw = imagecolliderList[i].isCollided(x, y);
 if (imagesw) {
 break;
 }
 }
 }

 function eventLoaded() {
 i = 0;
 var xIndex, yIndex;
 for ( yIndex = 0; yIndex < 3; ++yIndex) {
 for ( xIndex = 0; xIndex < 2; ++xIndex) {
 imagecolliderList.push(new Collider(xIndex, yIndex, 50, 50));
 ictx.drawImage(img[imagenumber], imagecolliderList[imagenumber].posX * 50, imagecolliderList[imagenumber].posY * 50, 50, 50); ++imagenumber;
 }
 }
 }

 init();
 isometricProjection(ctx);

 icanvas.onclick = function(e) {
 x = e.pageX - 735;
 y = e.pageY - 9;
 imagejudge(x, y);
 if (i < imagenumber) {
 dragsw = true;
 }
 }
 canvas.onclick = function(e) {
 rawX = e.pageX;
 rawY = e.pageY;
 var sqrt2 = Math.sqrt(2);
 newX = sqrt2 / 2 * rawX + sqrt2 * rawY - sqrt2 * (kVerticalMargin / 2 + kHorizontalMargin) - 8;
 newY = -sqrt2 / 2 * rawX + sqrt2 * rawY + sqrt2 * (kVerticalMargin / 2 - kHorizontalMargin) - 8;
 judge(newX, newY);
 if (listIndex >= 0) {
 if (dragsw) {
 ctx.drawImage(img[i], cellList[listIndex].posX * kCellWidth + 5, cellList[listIndex].posY * kCellHeight + 5, 30, 30);
 cellList[listIndex].item = i + 1;
 } else {++cellList[listIndex].type;
 cellList[listIndex].item = 0;
 if (cellList[listIndex].type == 3) {
 cellList[listIndex].type = 0;
 }
 switch(cellList[listIndex].type) {
 case 0:
 ctx.fillStyle = "#FFFFFF";
 Cell.prototype.draw(colliderList[listIndex].posX, colliderList[listIndex].posY);
 Cell.prototype.fill(colliderList[listIndex].posX, colliderList[listIndex].posY);
 break;
 case 1:
 ctx.fillStyle = "#8C8C8C";
 Cell.prototype.fill(colliderList[listIndex].posX, colliderList[listIndex].posY);
 break;
 case 2:
 ctx.fillStyle = "#22741C";
 Cell.prototype.fill(colliderList[listIndex].posX, colliderList[listIndex].posY);
 break;
 }
 }
 }
 dragsw = false;
 jsonText = JSON.stringify(cellList, cellfilter, "\t");
 localStorage.setItem("contents", jsonText);
 }
 */