//TRAVELER CODE (with DOCTOR and HUNTER child objects)
// A Traveler has a few properties:
// 1) a name (string) that must be provided as a parameter to the constructor
// 2) an amount of food (number) with an initial value of 1
// 3) an isHealthy (boolean) to indicate whether they are sick, with an initial value of true
function Traveler(name) {
    this.name = name;
    this.food = 1;
    this.isHealthy = true;
}

// When the traveler hunts, increase the traveler's food by 2.
Traveler.prototype.hunt = function () {
    this.food += 2;
}

// When the traveler eats, consumes 1 unit of the traveler's food. 
// If the traveler doesn't have any food to eat, the traveler is no longer healthy.
Traveler.prototype.eat = function () {
    //if there was no food to eat (traveler's food count already at or below 0)
    if (this.food <= 0) {
        //food count remains empty
        // this.food = 0;
        // make us sick
        this.isHealthy = false;
        return this.name + " is now hungry (sick)!";
    } else {
        //try to eat food
        this.food -= 1;
    }
    
}

// A Doctor is a Traveler with one additional method:
function Doctor(name) {
    Traveler.call(this, name);
}

Doctor.prototype = Object.create(Traveler.prototype);
Doctor.prototype.constructor = Doctor;

// Pass another Traveler as a parameter to the .heal() method, and their isHealthy property is changed to true.
Doctor.prototype.heal = function (traveler) {
    if (traveler.isHealthy === false) {
        traveler.isHealthy = true;
    }
}

// A Hunter is a Traveler that is better at finding food, but requires more food to eat. 
// They should start out with 2 food instead of just 1 like other travelers do. They can also give food to other travelers:
function Hunter(name) {
    Traveler.call(this, name);
    this.food = 2;
}

Hunter.prototype = Object.create(Traveler.prototype);
Hunter.prototype.constructor = Hunter;

// Increase the hunter's food by 5. (A normal traveler gains only 2.)
Hunter.prototype.hunt = function () {
    this.food += 5;
}

// Consumes 2 units of the hunter's food. If the hunter doesn't have 2 food when they are instructed to eat, 
// they eat as much as they can (0 or 1 unit), but the hunter is no longer healthy. (A normal traveler eats only 1 unit of food.)
Hunter.prototype.eat = function () {
    //try to eat food
    this.food -= 2;
    //if there was no food to eat(<=0) or not enough to eat(1)
    if (this.food < 2) {
        //hunter eats whatever is left of their food
        this.food = 0;
        // make us sick
        this.isHealthy = false;
        return this.name + " is now hungry (sick)!";
    }
}

// Transfers numOfFoodUnits from the hunter to a different traveler. If the hunter has less food than they are being asked to give,
// then no food should be transferred.
Hunter.prototype.giveFood = function (traveler, numOfFoodUnits) {
    if (this.food >= numOfFoodUnits) {
        this.food -= numOfFoodUnits;
        traveler.food += numOfFoodUnits;
    }
}

//WAGON CODE
// A Wagon has a few properties as well:

// 1) a capacity (number) that must be provided as a parameter to the constructor, sets the 
// maximum number of passengers the wagon can hold
// 2) a passengers list (array) which is initially empty
function Wagon(capacity) {
    this.capacity = capacity;
    this.passengerList = [];
}

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
    for (let i = 0; i < this.passengerList.length; i++) {
        if (this.passengerList[i].isHealthy !== true) {
            return true;
        }        
    }   
    return false;
}

Wagon.prototype.shouldQuarantine = function () {
    for (let i = 0; i < this.passengerList.length; i++) {
        if (this.passengerList[i].isHealthy !== true) {
            //A passenger was sick so return that the wagon is quarantined (true)
            return true;
        }        
    }   
    //No passengers were sick so return that the wagon is NOT quarantined (false)
    return false;

}
//Michael's solution - for comparison
// Wagon.prototype.shouldQuarantine = function () {
//     let quarantineStatus = false;
//     for (let i = 0; i < this.passengerList.length; i++) {
//         let currentPassenger = this.passengerList[i];
//         if (currentPassenger.isHealthy !== true) {
//             quarantineStatus = true;
//             break;
//         }        
//     }   
//     return quarantineStatus;
// }

// Return the total amount of food among all occupants of the wagon.
Wagon.prototype.totalFood = function () {
    let totalFood = 0;
    for (let i = 0; i < this.passengerList.length; i++) {
        totalFood += this.passengerList[i].food
    }
    return totalFood;
}

//GAME CODE
// Create a wagon that can hold 4 people
let wagon = new Wagon(4);
// Create five travelers
let henrietta = new Traveler('Henrietta');
let juan = new Traveler('Juan');
let drsmith = new Doctor('Dr. Smith');
let sarahunter = new Hunter('Sara');
let maude = new Traveler('Maude');
console.log(`#1: There should be 4 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(henrietta);
console.log(`#2: There should be 3 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
wagon.join(juan);
wagon.join(drsmith);
wagon.join(sarahunter);
wagon.join(maude); // There isn't room for her!
console.log(`#3: There should be 0 available seats. Actual: ${wagon.getAvailableSeatCount()}`);
console.log(`#4: There should be 5 total food. Actual: ${wagon.totalFood()}`);
sarahunter.hunt(); // gets 5 more food
drsmith.hunt();
console.log(`#5: There should be 12 total food. Actual: ${wagon.totalFood()}`);
henrietta.eat();//11
sarahunter.eat();//9
drsmith.eat();//8
juan.eat(); //this takes juan from 1 - 0
juan.eat(); // juan is now hungry (sick)
console.log(`#6: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#7: There should be 7 total food. Actual: ${wagon.totalFood()}`);
drsmith.heal(juan);
console.log(`#8: Quarantine should be false. Actual: ${wagon.shouldQuarantine()}`);
sarahunter.giveFood(juan, 4);
sarahunter.eat(); // She only has 1, so she eats it and is now sick
console.log(`#9: Quarantine should be true. Actual: ${wagon.shouldQuarantine()}`);
console.log(`#10: There should be 6 total food. Actual: ${wagon.totalFood()}`);