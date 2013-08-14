/**
 * @author Jeremy Jeong
 */
J('STU')('Context').add(J('LIB')('SceneContext')({
    name : 'Play2d',
    initCB : function() {
        var canvas = J('STU')('R2D').canvas('effect');
        this.map = J('LIB')('TileMap')({
            aabb : J('MAT')('AABB2')({
                center : J('MAT')('Vec3')({
                    x : canvas.width / 2,
                    y : canvas.height / 2,
                    w : 1
                }),
                half : J('MAT')('Vec3')({
                    x : canvas.height / 2,
                    y : canvas.height / 2,
                    w : 0
                })
            }),
            number : 12
        });
        console.log(this.map);
        this.effectVignette = J('LIB')('Renderable2D')({
            layer : 'effect',
            drawCB : function(ctx, argo) {
                ctx.drawImage(argo.img, 0, 0);
            },
            argo : {
                img : J('STU')('Asset').get('image', 'maskImgVignette').getImage()
            }
        });
        this.effectNoise = J('LIB')('Renderable2D')({
            layer : 'effect',
            drawCB : function(ctx, argo) {
                ctx.drawImage(argo.img, 0, 0);
            },
            argo : {
                img : J('STU')('Asset').get('image', 'maskImgNoise').getImage()
            }
        });
        this.effectScanline = J('LIB')('Renderable2D')({
            layer : 'effect',
            drawCB : function(ctx, argo) {
                ctx.drawImage(argo.img, 0, 0);
            },
            argo : {
                img : J('STU')('Asset').get('image', 'maskImgScanline').getImage()
            }
        });
        this.characterMask = J('LIB')('Renderable2D')({
            layer : 'effect',
            drawCB : function(ctx, argo) {
                var mousePos = J('STU')('Data').get('mousePos') || {
                    x : 0,
                    y : 0
                }, radius = argo.getRadius();
                ctx.globalCompositeOperation = 'source-over';
                ctx.globalAlpha = 0.5;
                ctx.fillStyle = '#000000';
                ctx.fillRect(0, 0, 730, 440);
                ctx.globalCompositeOperation = 'destination-out';
                ctx.globalAlpha = 1.0;
                ctx.fillStyle = '#ffffff';
                ctx.beginPath();
                ctx.arc(mousePos.x, mousePos.y, radius, 0, 2 * Math.PI);
                ctx.fill();
                ctx.globalCompositeOperation = 'source-over';
            },
            argo : {
                getRadius : function() {
                    return 30 + 5 * Math.sin(J('STU')('Data').get('characterMaskAngle') / 180 * Math.PI)
                }
            }
        });
        $('#jeremy').bind('mousemove', function(e) {
            J('STU')('Data').set('mousePos', {
                x : e.offsetX,
                y : e.offsetY
            });
        });
        function Spotlight(x, y, left, top, width, height) {
            this.area = {
                left : left,
                top : top,
                width : width,
                height : height
            };
            this.spotX = x;
            this.spotY = y;
            this.baseRad = 30;
            this.drRange = 5;
            this.speed = 3;
            this.alpha = 0.5;
            this.color = "#000000";
            this.radius = 0;
            this.angle = 0;
        }


        Spotlight.prototype.update = function() {
            this.angle += this.speed;
            this.radius = this.baseRad + this.drRange * Math.sin(this.angle / 180 * Math.PI);
        };
        Spotlight.prototype.render = function(ctx) {
            ctx.globalCompositeOperation = 'source-over';
            ctx.globalAlpha = this.alpha;
            ctx.fillStyle = this.color;
            ctx.fillRect(this.area.left, this.area.top, this.area.width, this.area.height);
            ctx.globalCompositeOperation = 'xor';
            ctx.globalAlpha = 1.0;
            ctx.fillStyle = '#ffffff';
            ctx.beginPath();
            ctx.arc(this.spotX, this.spotY, this.radius, 0, 2 * Math.PI);
            ctx.fill();
        };
        this.spotlight = new Spotlight(100, 100, 0, 0, 730, 440);
        this.map.tiles.forEach(function(col, row, list, elem) {
            J('STU')('R2D').add(elem.renderable);
        });
        J('STU')('R2D').add(this.effectVignette);
        J('STU')('R2D').add(this.effectNoise);
        J('STU')('R2D').add(this.effectScanline);
        J('STU')('R2D').add(this.characterMask);
        this.characterMaskAngle = 0;
        J('STU')('Data').set('characterMaskAngle', this.characterMaskAngle);
    },
    updateCB : function() {
        J('STU')('Data').set('characterMaskAngle', this.characterMaskAngle += 3);
        // this.spotlight.update();
        // this.spotlight.render(J('STU')('R2D').context('game'));
    },
    destroyCB : function() {
    }
}));