// Hamburger's sizes
Hamburger.SIZE_SMALL = {price: 50, calories: 20, size: 'small', type: 'size'};
Hamburger.SIZE_LARGE = {price: 100, calories: 40, size: 'large', type: 'size'};


// Hamburger's stuffing
Hamburger.STUFFING_CHEESE = {price: 10, calories: 20, name: 'cheese', type: 'stuffing'};
Hamburger.STUFFING_LETTUCE = {price: 20, calories: 5, name: 'lettuce', type: 'stuffing'};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10, name: 'potato', type: 'stuffing'};


// Salads
Salad.CAESAR = {price: 100, calories: 20, name: 'caesar'};
Salad.OLIVIER = {price: 50, calories: 80, name: 'olivier'};


// Drinks
Drink.COLA = {price: 50, calories: 40, name: 'cola'};
Drink.COFFEE = {price: 80, calories: 20, name: 'coffee'};


// Class Position
function Position() {	
	this.price = null;
	this.calories = null;
}

Position.prototype.calculatePrice = function() {
	return this.price;
}
Position.prototype.calculateCalories = function() {
	return this.calories;
}


// Class Hamburger
function Hamburger(hamSize, hamStuffing) {
	Position.call(this);
	if(!hamStuffing) {
		throw new Error('hamburger\'s stuffing is not defined');
	}
	if(!hamSize) {
		throw new Error('hamburger\'s size is not defined');
	}
	this.stuffing = [];
	for(var i = 1; i <= arguments.length - 1; i += 1) {
		this.stuffing.push(arguments[i].name);
	}
	if(hamSize.type === 'size') {
		this.size = hamSize.size;
		this.price += hamSize.price;
		this.calories += hamSize.calories;
	} else {
		throw new Error('hamburger\'s size is not correct');
	}
	for(var i = 1; i <= arguments.length - 1; i += 1) {
		if(arguments[i].type === 'stuffing') {
			this.price += arguments[i].price;
			this.calories += arguments[i].calories;
		} else {
			throw new Error('hamburger\'s stuffing is not correct');	
		}
	}
}

Hamburger.prototype = Object.create(Position.prototype);
Hamburger.prototype.constructor = Hamburger;

Hamburger.prototype.getSize = function() {
	return this.size;
} 
Hamburger.prototype.getStuffing = function() {
	return this.stuffing;
} 
Hamburger.prototype.addStuffing = function(stuffing) {
	if(stuffing.type === 'stuffing') {
		this.price += stuffing.price;
		this.calories += stuffing.calories;
		this.stuffing.push(stuffing.name);
	} else {
		throw new Error('stuffing is not correct');
	}
	
}
Hamburger.prototype.removeStuffing = function(stuffing) {
	if(this.stuffing.length <= 1) {
		throw new Error('minimum number of stuffing is reached');
	}
	if(stuffing.type === 'stuffing') {
		this.price -= stuffing.price;
		this.calories -= stuffing.calories;
		for(var i = 0; i < this.stuffing.length; i += 1) {
			if(this.stuffing[i] === stuffing.name) {
				this.stuffing.splice(i, 1);
				break;
			}
		}
	} else {
		throw new Error('stuffing is not correct');
	}
}


// Class Salad
function Salad(saladType, saladWeight) {
	Position.call(this);
	var weightCoeff = saladWeight/100;
	if(!saladType) {
		throw new Error('salad type is not defined');
	}
	if(!saladWeight) {
		throw new Error('salad weight is not defined');
	}
	this.price += saladType.price * weightCoeff;
	this.calories += saladType.calories * weightCoeff;
	this.name = saladType.name;
}

Salad.prototype = Object.create(Position.prototype);
Salad.prototype.constructor = Salad;

Salad.prototype.getName = function() {
	return this.name;
} 


// Class Drink
function Drink(drinkType) {
	Position.call(this);
	if(!drinkType) {
		throw new Error('drink type is not defined');
	}
	this.price += drinkType.price;
	this.calories += drinkType.calories;
	this.name = drinkType.name;
}

Drink.prototype = Object.create(Position.prototype);
Drink.prototype.constructor = Drink;

Drink.prototype.getName = function() {
	return this.name;
} 

// Class Order
function Order() {
	this.positionsList = [];
	for(var i = 0; i < arguments.length; i += 1) {
		this.positionsList.push(arguments[i]);
	}
}

Order.prototype.getPositionsList = function() {
	return this.positionsList;
} 
Order.prototype.addPosition = function(positionItem) {
	this.positionsList.push(positionItem);
	console.log('Position successfully added');
} 
Order.prototype.removePosition = function(positionItem) {
	for(var i = 0; i < this.positionsList.length; i += 1) {
		if(this.positionsList[i] === positionItem) {
			this.positionsList.splice(i, 1);
			break;
		}
	}
}
Order.prototype.calculatePrice = function() {
	var result = 0;
	for(var i = 0; i < this.positionsList.length; i += 1) {
		result += this.positionsList[i].price;
	}
	return result;
}
Order.prototype.calculateCalories = function() {
	var result = 0;
	for(var i = 0; i < this.positionsList.length; i += 1) {
		result += this.positionsList[i].calories;
	}
	return result;
}
Order.prototype.pay = function(obj) {
	Object.freeze(obj);
	Object.defineProperty(obj.positionsList, "length", {writable: false});
}


// Create
var myHamburger1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_LETTUCE, Hamburger.STUFFING_CHEESE); // Create Hamburger
var mySalad1 = new Salad(Salad.OLIVIER, 50); // Create Salad
var myDrink1 = new Drink(Drink.COLA); // Create Drink
var myDrink2 = new Drink(Drink.COFFEE); // Create Drink
var myOrder1 = new Order(myHamburger1, mySalad1, myDrink1); // Create Order


// Hamburger methods
myHamburger1.addStuffing(Hamburger.STUFFING_CHEESE); // Add stuffing 'cheese'
myHamburger1.removeStuffing(Hamburger.STUFFING_LETTUCE); // Remove stuffing 'lettuce'
myHamburger1.getSize(); // Size of Hamburger
myHamburger1.getStuffing(); // Stuffing list of Hamburger
myHamburger1.calculatePrice(); // Price of Hamburger
myHamburger1.calculateCalories(); // Calories of Hamburger

// Salad methods
mySalad1.getName(); // Name of Salad
mySalad1.calculatePrice(); // Price of Salad
mySalad1.calculateCalories(); // Calories of Salad

// Drink methods
myDrink1.getName(); // Name of Drink
myDrink1.calculatePrice(); // Price of Drink
myDrink1.calculateCalories(); // Calories of Drink

// Order methods
myOrder1.getPositionsList(); // Get list of positions in order
myOrder1.addPosition(myDrink2); // Add position Drink2
myOrder1.removePosition(myDrink1); // Remove postion Drink1
myOrder1.calculatePrice(); // Get price of order
myOrder1.calculateCalories(); // Get calories
myOrder1.pay(myOrder1); // Make order unwritable

console.log(myOrder1);