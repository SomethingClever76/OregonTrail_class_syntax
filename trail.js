//TRAVELER CODE
class Traveler {
    constructor(name) {
        this.name = name;
        this.food = 1;
        this.isHealthy = true;
    }

    hunt() {
        this.food += 2;
    }

    eat() {
        if (this.food <= 0) {
            this.isHealthy = false;
            console.log(this.name + " is now sick!");
        } else {
            this.food -= 1;
        }
    }
}

//DOCTOR CODE
class Doctor extends Traveler {
    constructor(name) {
        super(name);
    }

    heal(traveler) {
        if (traveler.isHealthy === false) {
            traveler.isHealthy = true;
            console.log("The doctor healed " + traveler.name)
        }
    }
}

//HUNTER CODE
class Hunter extends Traveler {
    constructor(name) {
        super(name);
        this.food = 2;
    }

    hunt() {
        this.food += 5;
    }

    eat() {
        if (this.food < 2) {
            //hunter eats whatever is left of their food
            this.food = 0;
            // then becomes sick
            this.isHealthy = false;
            console.log(this.name + " is now sick!");
        } else {
            this.food -= 2;
        }
    }

    giveFood(traveler, numOfFoodUnits) {
        if (this.food >= numOfFoodUnits) {
            //reduces hunter's food count
            this.food -= numOfFoodUnits;
            //increases traveler's food count
            traveler.food += numOfFoodUnits;
        }
    }
}

//WAGON CODE
class Wagon {
    constructor(capacity) {
        this.capacity = capacity;
        this.passengerList = [];
    }

    getAvailableSeatCount() {
        return this.capacity - this.passengerList.length;
    }

    join(traveler) {
        if (this.passengerList.length < this.capacity) {
            this.passengerList.push(traveler);
        } else {
            console.log("The wagon is full. Sorry, " + traveler.name + ", there isn't room for you.");
        }
    }

    shouldQuarantine() {
        for (let i = 0; i < this.passengerList.length; i++) {
            if (this.passengerList[i].isHealthy !== true) {
                //A passenger was sick so return that the wagon is quarantined (true)
                return true;
            }
        }
        //No passengers were sick so return that the wagon is NOT quarantined (false)
        return false;
    }

    totalFood() {
        let totalFood = 0;
        for (let i = 0; i < this.passengerList.length; i++) {
            totalFood += this.passengerList[i].food
        }
        return totalFood;
    }
}


//GAME CODE *do not modify*
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