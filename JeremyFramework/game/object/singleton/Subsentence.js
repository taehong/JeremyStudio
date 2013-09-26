J('STU')('Object').set('Singleton', 'Subsentence', {
	/*
	 * Attributes
	 */
	teller : {
		sentenceArr : undefined,
		font : undefined,
		fillStyle : undefined,
		characterIllust : undefined,
		characterNameBar : undefined,
		sentenceBar : undefined,
		currSentenceNum : undefined,
		endSentenceNum : undefined
	},
	state : {
		isOnScreen : false,
	},
	renderable : {
		illust : undefined,
		nameBar : undefined,
		sentenceBar : undefined,
	}
	
	/*
	 * Setters
	 */
	setOnScreen : function(p_bool) {
		this.state.isOnScreen = p_bool;
	},
	setTeller : function(argo, s_arr) {
		this.teller.font = argo.font;
		this.teller.fillStyle = argo.style;
		this.teller.characterIllust = argo.illust;
		this.teller.characterNameBar = argo.nameBar;
		this.teller.sentenceBar = argo.sentenceBar;
		this.teller.currSentenceNum = argo.currSentenceNum;
		this.teller.endSentenceNum = argo.endSentenceNum;
		this.teller.setSentence(s_arr);
	},
	setSentence : function(arr) {
		this.teller.sentenceArr = new Array();
		for(int i=0; i<this.teller.endSentenceNum; i++)
			this.teller.sentenceArr[i] = arr[i];
	}
	
	/*
	 * Getters
	 */
	isOnScreen : function() {
		return this.state.isOnScreen;
	},
	getRenderable : function() {
		return this.renderable;
	},
	
	/*
	 * Methods
	 */
	initialize : function(argo, s_arr) {
		var ctx = document.getElementById('gui').getContext('2d');
		this.setTeller(argo.teller, s_arr);
		this.update(ctx);
		
		return this;
	},
	update : function(ctx) {
		var INPUT = J('STU')('Data').get('INPUT');
		if(INPUT.isSpacebarPressed()) {
			if( this.teller.currSentenceNum == this.teller.endSentenceNum ) {
				this.clear();
				return;
			}
			this.teller.currSentenceNum = this.teller.currSentenceNum + 1;
		}
		
		ctx.save();
		ctx.font = this.teller.font;
		ctx.fillStyle = this.teller.fillStyle;
		ctx.fillText(this.teller.sentenceArr[this.teller.currSentenceNum], 100, 380);
		ctx.restore();
		
	},
	show : function() {
		this.renderable.illust = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : this.teller.characterIllust,
				posX : 20,
				posY : 200
			}
		});
		this.renderable.nameBar = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : this.teller.characterNameBar,
				posX : 10,
				posY : 300
			}
		});
		this.renderable.sentenceBar = J('LIB')('Renderable2D')({
			layer : 'gui',
			drawCB : function(ctx, argo) {
				ctx.drawImage(argo.img, argo.posX, argo.posY);
			},
			argo : {
				img : this.teller.sentenceBar,
				posX : 0,
				posY : 350
			}
		});
		J('STU')('R2D').add(this.renderable.illust);
		J('STU')('R2D').add(this.renderable.nameBar);
		J('STU')('R2D').add(this.renderable.sentenceBar);
		this.state.isOnScreen = true;	
		
	},
	hide : function() {
		J('STU')('R2D').remove(this.renderable.illust);
		J('STU')('R2D').remove(this.renderable.nameBar);
		J('STU')('R2D').remove(this.renderable.sentenceBar);
		this.state.isOnScreen = false;
	},
	clear : function() {
		this.renderable.illust = null;
		this.renderable.nameBar = null;
		this.renderable.sentenceBar = null;
		this.state.isOnScreen = false;
	}
	
});