function solapamientoArea(area1, area2){
	return ((area2.x2 < area2.x1 || area2.x2 > area1.x1) &&
	        (area2.y2 < area2.y1 || area2.y2 > area1.y1) &&
	        (area1.x2 < area1.x1 || area1.x2 > area2.x1) &&
	        (area1.y2 < area1.y1 || area1.y2 > area2.y1));
}

function getCirculo(){
        var coords = [];

        var rr = 500;
        for (var xx = 0; xx < rr*2; xx+=50)
        {
	var nx = Math.cos(Math.PI*(xx/(rr*2)))*rr;
	var ny = Math.sqrt(Math.pow(rr,2)-Math.pow(nx,2));
	coords[coords.length] = {x: nx, y: ny};
        }
        for (var xx = rr*2; xx > 0; xx-=50)
        {
	var nx = Math.cos(Math.PI*(xx/(rr*2)))*rr;
	var ny = Math.sqrt(Math.pow(rr,2)-Math.pow(nx,2));
	coords[coords.length] = {x: nx, y: -ny};
        }

        return coords;
}

