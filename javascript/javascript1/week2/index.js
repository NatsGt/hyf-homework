//FLIGHT BOOKING
function getFullname(firstname, surname, useFormalName = false){
    if(useFormalName){
        return 'Lord ' + firstname + ' ' + surname
    }else{
        return firstname + ' ' + surname;
    }   
}

const fullname1 = getFullname("Juan", "Buendia", true);
const fullname2 = getFullname("Mario", "Vargas");
console.log(fullname1);
console.log(fullname2);

    //to work with gender, add a radio button with the preffix of gender ("Mr, Ms, Mss, Lord")
    var gender;
    function getFullNameComplete(genderPreffix = "", firstname, surname, useFormalName = false){
        gender = genderPreffix
        if(useFormalName){
            return gender + ' ' + firstname + ' ' + surname
        }else{
            return firstname + ' ' + surname;
        }   
    }

    const fullname3 = getFullNameComplete("Mr", "Juan", "Buendia", true);
    const fullname4 = getFullNameComplete("Lord", "Mario", "Vargas");
    const fullname5 = getFullNameComplete("Ms", "Maria", "Bonita", true);
    console.log(fullname1);
    console.log(fullname2);
    console.log(fullname3);

//EVENT APPLICATION
const days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
var today = new Date();

function getEventWeekday(day) {
    var future = (today.getDay() + day) % 7;
    return days[future];
}

console.log(getEventWeekday(5)); 

//WEATHER WEAR
 /* temperature < 0 - winter jacket, mittens and scarf
 temperature 0 - 10 - jacket and mittens
 temperature 10 -18 - sweater and jeans
 temperature 18 -25 - shorts and t-shirt
 temperature > 25 short, flipflops, light shirt */
 function showTodaysOutfit(temperature) {
    switch (true) {
        case (temperature < 0):
            return "winter jacket, mittens and scarf";
            break;
        case (temperature >= 0 && temperature < 10):
            return "jacket and mittens";
            break
        case (temperature >= 10 && temperature < 18):
            return "sweater and jeans";
            break
        case (temperature >= 18 && temperature < 25):
            return "shorts and t-shirt";
            break
        default:
            return "short, flipflops, light shirt"
            break;
    }
     
 }

 const clothesToWear = showTodaysOutfit(25);
 console.log(clothesToWear);

 //STUDENT MANAGER

const class07Students = [];
function addStudentToClass(studentName) {
    //verify not an empty string
    if(studentName === ""){
        return console.log("Enter a valid name");
    }
    //verify existing student
    var newStudent = true;
    for(var i = 0; i < class07Students.length; i++){
        if(studentName === class07Students[i]){
            newStudent = false;
            
            break;
        }
    }
    if(!newStudent){
        return console.log("Student " + studentName + " is already in the class.");
    }    

    //check number in the class and student is or not the Queen
    if(class07Students.length < 6 && studentName !== "Queen"){
            class07Students.push(studentName);
        }else if (studentName === "Queen"){
            class07Students.push(studentName);
        }else{
            console.log("Cannot add more students to class 07.");
        }
    
    
    return console.log(class07Students);
}

function getNumberOfStudents() {
    return console.log(class07Students.length );  
}

addStudentToClass("Juan");
addStudentToClass("Luis");
addStudentToClass("Pepito");
addStudentToClass("Rosita");
addStudentToClass("Juan");
addStudentToClass("Hugo");
addStudentToClass("Paco");
addStudentToClass("Maria");
addStudentToClass("Queen");
addStudentToClass("Queen");
addStudentToClass("Roberto");
addStudentToClass("");
getNumberOfStudents();

//ADDCANDY
/* 
sweet 0.5
chocolate 0.7
Toffee 1.1
Chewing-gum 0.03 */

const amountToSpend = Math.random() * 100;
var boughtCandy = [];

function canBuyMoreCandy() {
    var i = 0;
    var sum = 0;
    while(i < boughtCandy.length){
        sum += boughtCandy[i];
        i++;
    }
    if(amountToSpend >= sum){  
        return true;
    }else{
        return false; 
    }
    
}

function addCandy(candyType, weight) {
        var candyTypePrice;
        var item;
        switch (candyType) {
            case "sweet":
                candyTypePrice = 0.5;
                break;
            case "chocolate":
                candyTypePrice = 0.7;
                break;
            case "toffee":
                candyTypePrice = 1.1;
                break;
            case "chewing-gum":
                candyTypePrice = 0.03;
                break;
            default:
                candyTypePrice = 0;
                break;
        }
        item = candyTypePrice * weight;
        boughtCandy.push(item);
        if(canBuyMoreCandy()){
            console.log(" You can buy more, so please do!");
        }else{
            /* I added this, so if the total sum is greater than the amountToSpend, the 
            article wont be added to the array and the client can try to buy something cheaper  */
            console.log(" Enough candy for you!");
            boughtCandy.pop(item);
        }
    return boughtCandy;
}

addCandy("sweet", 10);
addCandy("chocolate", 20);
addCandy("toffee", 53);
addCandy("chewing-gum", 700);
addCandy("", 10);
addCandy("toffee", 5);




