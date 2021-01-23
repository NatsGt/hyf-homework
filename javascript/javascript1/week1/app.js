//STEP 2
//user freecodecamp fccdc38edef-ba87-461c-96cd-bf07dcfc8098

//STEP 3

/*Age-ify*/
const yearOfBirth = 1987; 
var yearFuture =  2027;
var age = yearFuture - yearOfBirth;
console.log("You will be " + age + " years old in " + yearFuture + ".");

/*Goodboy-Oldboy */
const dogYearOfBirth = 2020;
var dogYearFuture = 2030;
var dogYear = dogYearFuture - dogYearOfBirth;
var shouldShowResultInDogYearsld = true;

if(shouldShowResultInDogYearsld){
    dogYear *= 7;
    console.log("Your dog will be " + dogYear + " dog years old in " + dogYearFuture);
} else{
    console.log("Your dog will be " + dogYear + " human years old in " + dogYearFuture);
}

dogYearOfBirth = 2020;
dogYearFuture = 2030;
dogYear = dogYearFuture - dogYearOfBirth;
shouldShowResultInDogYearsld = false;

if(shouldShowResultInDogYearsld){
    dogYear *= 7;
    console.log("Your dog will be " + dogYear + " dog years old in " + dogYearFuture);
} else{
    console.log("Your dog will be " + dogYear + " human years old in " + dogYearFuture);
}

/*Housey Pricey*/


var houseDepth = 10;
var houseWidth = 8;
var houseHeight = 10;
var gardenSizeInM2 = 100;
var volumeInMeters = houseDepth * houseWidth * houseHeight;
var housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
var friendPayment = 2500000;

if(housePrice < friendPayment){
    console.log("He/she is overpaying, the price should be " + housePrice);
}else{
    console.log("He/she is underpaying, the price should be " + housePrice);
}


houseDepth = 11;
houseWidth = 5;
houseHeight = 8;
gardenSizeInM2 = 70;
volumeInMeters = houseDepth * houseWidth * houseHeight;
housePrice = volumeInMeters * 2.5 * 1000 + gardenSizeInM2 * 300;
friendPayment = 1000000;

if(housePrice < friendPayment){
    console.log("He/she is overpaying, the price should be " + housePrice);
}else{
    console.log("He/she is underpaying, the price should be " + housePrice);
}

/*Ex Namey*/
const firstWords = ["Forward", "Legend", "Good", "Waking", "Starting", "Vision", "Great", "Success", "Conquer", "Happy" ];
const secondWords = ["Company", "Place", "Stay", "Oasis", "Career", "Ahead", "Future", "Colleague", "Dream", "Corporation"];
var startupName = firstWords[Math.floor(Math.random() * firstWords.length)] + " " + secondWords[Math.floor(Math.random() * secondWords.length)];
console.log(startupName);
