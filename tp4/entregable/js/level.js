function Level(){	
	this.enemigos = []; 
	
	this.cs = 0; // frame actual
	
	this.ts = 4500;
	
	this.finished = 0; // si es 1, el nivel termina
}

Level.prototype.addEnemigo = function(e){
	this.enemigos[this.enemigos.length] = e;
}

// devuelve el arreglo de los enemigos que se debe spawnear en el frame actual
Level.prototype.spawn = function(e){
	if (this.cs == this.ts)
	{
		this.finished = 1;
		return [];
	}else{
		this.finished = 0;
	}
	
	var spawned = [];
	for (var i = 0; i < this.enemigos.length; i++)
	{
		var e = this.enemigos[i];
		
		// checkeo si el enemigo tiene que ser spawneado en este frame
		if (e.delay == this.cs){
			spawned[spawned.length] = e;
			this.enemigos.splice(i,1);
		}
	}
	this.cs++;
  
	return spawned;
}
