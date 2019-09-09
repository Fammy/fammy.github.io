var stageW = 800;
var stageY = 200;

Crafty.init(stageW, stageY);
Crafty.background('#00BFFF');

// trucks
Crafty.e("truck1, solid, 2D, Canvas, Color, Collision")
	.color('#555555')
	.attr({ x: 20, y: 140, w: 60, h: 40 });

Crafty.e("truck2, solid, 2D, Canvas, Color, Collision")
	.color('#333333')
	.attr({ x: 720, y: 140, w: 60, h: 40 });


// player
Crafty.e("player, 2D, Canvas, Color, Twoway, Gravity, Collision")
	.color('#0000ff')
	.attr({ x: 350, y: 140, w: 15, h: 40 })
	.twoway(5, 5)
	.gravity('solid')
	.bind('EnterFrame', function () {
		if (this.x >= stageW - this.w) {
			this.x = stageW - this.w;
		}
		
		if (this.x <= 0) {
			this.x = 0;
		}
	})
	.bind('Moved', function(from) {
		var hits = this.hit('cylinder')
		if (hits) {
			for (var i in hits) {
				var item = hits[i].obj;
				var moved = item.x - from.x;
				item.x += moved;
			}
		}
	});
	
	
// ground
Crafty.e("solid, 2D, Canvas, Color, Collision")
	.color('#cccccc')
	.attr({ x: 0, y: 180, w: 800, h: 20 });
	
	
// score
Crafty.e("score, Canvas, 2D, Text")
	.attr({ x: 5, y: 0, w: 100, h: 15, score: 0 })
	.text("0 kabillion points");


// cylinders
setInterval(function () {
	if (Crafty.isPaused() || Crafty('cylinder').length >= 4) {
		return;
	}
	
	SpawnCylinder(390, 0);
	
}, 2500);
	
function SpawnCylinder(x, y) {
	var truck = Math.floor((Math.random()*2) + 1);
	var color = truck == 1 ? "#999999" : "#666666";
	
	Crafty.e("cylinder, solid, 2D, Canvas, Color, Twoway, Gravity, Collision")
		.color(color)
		.attr({ x: x, y: y, w: 15, h: 40 })
		.gravity('solid')
		.onHit("truck" + truck, function(entities) {
			for (var i in entities) {
				this.destroy();
				Crafty("score").each(function () { 
					this.score += 100;
					this.text(this.score + " kabillion points");
				});
			}
		});
}