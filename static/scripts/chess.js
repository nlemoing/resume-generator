
const NUM_TILES = 8;
const GAME_SIZE = 400;
const TILE_SIZE = GAME_SIZE / NUM_TILES;
const LG_COLOR = "#32CD32";
const DG_COLOR = "#006300";
const WT_COLOR = "#FFDEAD";
const BT_COLOR = "#8B4513";

// DOM Style Helpers
function setAttributes(element, props) {
	for (var prop in props) {
		element.setAttribute(prop, props[prop]);
	}
}

function setPosition(top, left) {
	return "top: " + (top * TILE_SIZE) + "px;left: " + (left * TILE_SIZE) + "px;";
}

// Animation helpers
function animate(elemId, update, rate) {
	var elem = document.getElementById(elemId);
	if (!elem) return;
	rate = rate || 3;
	var progress = 0;
	var id = setInterval(progressFn, rate);
	function progressFn () {
		if (progress == 100) {
			clearInterval(id);
			return;
		}
		progress++;
		update(elem, progress);
	}
}

function movePiece(elemId, srcR, srcC, destR, destC) {
	srcR = srcR * 50;
	srcC = srcC * 50;
	destR = destR * 50;
	destC = destC * 50;
	var update = function(elem, progress) {
		elem.style.top  = (srcR + (destR - srcR) * progress / 100.0) + "px";
		elem.style.left = (srcC + (destC - srcC) * progress / 100.0) + "px";
	}
	animate(elemId, update);
}

function fadeOut(elemId) {
	var update = function(elem, progress) {
		elem.style.opacity = (100 - progress)/100.0;
	}
	animate(elemId, update);
}

function fadeIn(elemId) {
	var update = function(elem, progress) {
		elem.style.opacity = progress/100.0;
	}
	animate(elemId, update);
}

function fadeColor(elemId, startColor, endColor) {
	var update = function(elem, progress) {
		elem.style.background = interpolateRGB(startColor, endColor, progress / 100);
	}
	animate(elemId, update, 1);
}

function interpolateRGB(a, b, lambda) {
	let c1 = parseInt(a.slice(1), 16);
	let c2 = parseInt(b.slice(1), 16);
	
	let r1 = (c1 >> 16) & 0xFF;
	let g1 = (c1 >> 8)  & 0xFF;
	let b1 = (c1)       & 0xFF;
	let r2 = (c2 >> 16) & 0xFF;
	let g2 = (c2 >> 8)  & 0xFF;
	let b2 = (c2)       & 0xFF;
	
	let r3 = Math.round((1-lambda)*r1 + lambda*r2);
	let g3 = Math.round((1-lambda)*g1 + lambda*g2);
	let b3 = Math.round((1-lambda)*b1 + lambda*b2);
	
	let c3 = (r3 << 16) + (g3 << 8) + b3;
	let c = c3.toString(16);
	c = "#" + "0".repeat(6 - c.length) + c;
	return c;
}

// Game functions

function handleMove(evt) {
	var id = evt.srcElement.id;
	var r = parseInt(id[id.length - 2]);
	var c = parseInt(id[id.length - 1]);
	this.moveTo(r, c);
}

function canMoveTo(r, c) {
	var dispR = Math.abs(r - this.posR);
	var dispC = Math.abs(c - this.posC);
	return ((dispR === this.a && dispC === this.b) || 
		(dispR === this.b && dispC === this.a)) && !this.captured;
}

function moveTo(r, c, capture) {
	if (!this.canMoveTo(r,c)) {
		return false;
	}
	
	movePiece(this.id + "wknight", this.posR, this.posC, r, c);
	this.posR = r;
	this.posC = c;
	if (capture) this.captured = true;
	this.updateNextMoves();

	return true;
}

function capture() {
	if (!this.moveTo(this.endR, this.endC, true)) {
		return;
	}
	fadeOut(this.id + "bknight");
}

function newGame() {
	if (this.captured) {
		fadeIn(this.id + "bknight");
		this.captured = false;
	}
	if (this.posR !== this.startR || this.posC !== this.startC) {
		movePiece(this.id + "wknight", this.posR, this.posC, this.startR, this.startC);
		this.posR = this.startR;
		this.posC = this.startC;
		this.updateNextMoves();
	}
}

function possibleMoves() {
	if (this.captured) return [];
	let r = this.posR;
	let c = this.posC;
	let a = this.a;
	let b = this.b;
	let moves = [[r + a, c + b], [r + a, c - b], [r - a, c + b], [r - a, c - b],
		     [r + b, c + a], [r + b, c - a], [r - b, c + a], [r - b, c - a]];
	return moves.filter(function(move) {
		return move[0] >= 0 && move[0] < NUM_TILES && move[1] >= 0 && move[1] < NUM_TILES;
	});	     
}

function updateNextMoves() {

	function contains(A, r, c) {
		for (var i = 0; i < A.length; i++) {
			if (A[i][0] == r && A[i][1] == c) return true;
		}
		return false;
	}
	let r, c;
	let prev = this.nextMoves;
	let next = this.possibleMoves();
	for (let i = 0; i < prev.length; i++) {
		r = prev[i][0];
		c = prev[i][1];
		if (contains(next, r, c)) continue;
		if ((r + c) % 2) fadeColor(this.id + "tile" + r + c, DG_COLOR, BT_COLOR);
		else 	         fadeColor(this.id + "tile" + r + c, LG_COLOR, WT_COLOR);
	}
	for (let i = 0; i < next.length; i++) {
		r = next[i][0];
		c = next[i][1];
		if (contains(prev, r, c)) continue;
		if ((r + c) % 2) fadeColor(this.id + "tile" + r + c, BT_COLOR, DG_COLOR);
		else 		 fadeColor(this.id + "tile" + r + c, WT_COLOR, LG_COLOR);
	}
	this.nextMoves = next;
}

// Main
function createGame(divId, options) {
	let root = document.getElementById(divId);
	if (!root) return {};
	
	let game = options;

	game.id = divId;
	game.captured = false;
	game.nextMoves = [];

	game.canMoveTo = canMoveTo;
	game.moveTo = moveTo;
	game.capture = capture;
	game.newGame = newGame;
	game.possibleMoves = possibleMoves;
	game.updateNextMoves = updateNextMoves;
	
	var tile;
	for (var r = 0; r < NUM_TILES; r++) {
		for (var c = 0; c < NUM_TILES; c++) {
			tile = document.createElement("div");
			setAttributes(tile, {
				"class": "tile " + ((r+c)%2 ? "bt" : "wt"),
				"style": setPosition(r, c),
				"id": game.id + "tile" + r + c
			});
			tile.onclick = handleMove.bind(game);
			root.appendChild(tile);
		}
	}
	
	let bknight = document.createElement("img");
	setAttributes(bknight, {
		"class": "tile",
		"style": setPosition(game.endR, game.endC),
		"id": game.id + "bknight",
		"src": "https://upload.wikimedia.org/wikipedia/commons/2/21/Western_black_side_Knight.svg" 
	});
	bknight.onclick = game.capture.bind(game);
	root.appendChild(bknight);
	
	let wknight = document.createElement("img");
	setAttributes(wknight, {
		"class": "tile",
		"style": setPosition(game.startR, game.startC),
		"id": game.id + "wknight",
		"src": "https://upload.wikimedia.org/wikipedia/commons/c/c3/Western_white_side_Knight.svg" 
	});
	wknight.onclick = game.newGame.bind(game);
	root.appendChild(wknight);

	game.newGame();
		
	return game;
}
