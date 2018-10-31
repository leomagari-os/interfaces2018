function solapamientoArea(area1, area2){
	return ((area2.x2 < area2.x1 || area2.x2 > area1.x1) &&
	        (area2.y2 < area2.y1 || area2.y2 > area1.y1) &&
	        (area1.x2 < area1.x1 || area1.x2 > area2.x1) &&
	        (area1.y2 < area1.y1 || area1.y2 > area2.y1));
}