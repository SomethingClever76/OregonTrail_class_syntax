// A Traveler has a few properties:

// a name (string) that must be provided as a parameter to the constructor
// an amount of food (number) with an initial value of 1
// an isHealthy (boolean) to indicate whether they are sick, with an initial value of true

function Traveler(name) {
    this.name = name;
    this.food = 1;
    this.isHealthy = true;
};

// Increase the traveler's food by 2.
Traveler.prototype.hunt = function () {
    this.food += 2;
}

// Consumes 1 unit of the traveler's food. If the traveler doesn't have any food to eat, the traveler is no longer healthy.
Traveler.prototype.eat = function () {
    //try to eat food
    this.food -= 1;
    //if there was no food to eat (traveler's food count already at or below 0)
    if (this.food <= 0) {
        //food count remains empty
        this.food = 0;
        // make us sick
        this.isHealthy = false;
        return this.name + " is now hungry (sick)!";
    }
}


// A Wagon has a few properties as well:

// a capacity (number) that must be provided as a parameter to the constructor, sets the maximum number of passengers the wagon can hold
// a passengers list (array) which is initially empty

function Wagon(capacity) {
    this.capacity = capacity;
    this.passengerList = [];
};

// Return the number of empty seats, determined by the capacity set when the wagon was created, compared to the number of passengers currently on board.

Wagon.prototype.getAvailableSeatCount = function () {
    return this.capacity - this.passengerList.length;
}

// Add the traveler to the wagon if there is space. If the wagon is already at maximum capacity, don't add them.

Wagon.prototype.join = function (traveler) {
    if (this.passengerList.length < this.capacity) {
        this.passengerList.push(traveler);
    } else {
        return "There isn't room!";
    }
}

// Return true if there is at least one unhealthy person in the wagon. Return false if not.

Wagon.prototype.shouldQuarantine = function () {
    for (var i = 0; i < this.passengerList.length; i++) {
        if (this.isHealthy !== true) {
            return true;
        } else {
            return false;
        }
    }
}

// Return the total amount of food among all occupants of the wagon.

Wagon.prototype.totalFood = function () {
    let totalFood = 0;
    for (var i = 0; i < this.passengerList.length; i++) {
        totalFood += this.passengerList[i].food
    }
    return totalFood;
}


// Create a wagon that can hold 2 people
let wagon = new Wagon(2);
// Create three travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let maude = new Traveler('Maude');
console.log(`${wagon.getAvailableSeatCount()} should be 2`);
wagon.join(henrietta);
console.log(`${wagon.getAvailableSeatCount()} should be 1`);
wagon.join(juan);
wagon.join(maude); // There isn't room for her!
console.log(`${wagon.getAvailableSeatCount()} should be 0`);
henrietta.hunt(); // get more food
juan.eat();
juan.eat(); // juan is now hungry (sick)
console.log(`${wagon.shouldQuarantine()} should be true since juan is sick`);
console.log(`${wagon.totalFood()} should be 3`);