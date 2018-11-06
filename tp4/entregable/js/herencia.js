//para herencia
function extend(childClassOrObject, parentClassOrObject){ 
	childClassOrObject.prototype = new parentClassOrObject;
	childClassOrObject.prototype.constructor = childClassOrObject;
}