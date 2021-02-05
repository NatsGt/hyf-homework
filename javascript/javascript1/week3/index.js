//FREECODECAMP EXERCISES
//profile name - natsgt

//ITEM ARRAY REMOVAL
const names = [
  "Peter",
  "Ahmad",
  "Yana",
  "kristina",
  "Rasmus",
  "Samuel",
  "katrine",
  "Tala",
];
const nameToRemove = "Ahmad";

// Write some code here
function removeName(name) {
const nameToRemove = "Ahmad";
const index = names.indexOf(nameToRemove);
names.splice(index, 1);
}

removeName(nameToRemove);

// Code done

console.log(names); // ['Peter', 'Yana', 'kristina', 'Rasmus', 'Samuel', 'katrine', 'Tala']

//WHEN WILL WE BE THERE
const travelInformation = {
  speed: 50,
  destinationDistance: 432,
};

function calcTime(obj) {
  let time = obj.destinationDistance / obj.speed;
  let hour = Math.floor(time);
  let minutes = Math.floor((time - Math.floor(time)) * 60);
  let timeFormat = hour + (hour <= 1 ? " hour" : " hours") + " and " + minutes + (minutes <= 1 ? " minute." : " minutes.");
  return timeFormat;
}

const travelTime = calcTime(travelInformation);
console.log(travelTime);



//SERIES DURATION OF MY LIFE

const seriesDurations = [
  {
    title: "Game of thrones",
    days: 3,
    hours: 1,
    minutes: 0,
  },
  {
    title: "Friends",
    days: 4,
    hours: 2,
    minutes: 20,
  },
  {
    title: "Gilmore Girls",
    days: 4,
    hours: 22,
    minutes: 12,
  },
];

function calcLifeTime() {
  //number of days in 80 years
  const date1 = new Date("01/30/1940");
  const date2 = new Date("01/30/2020");
  const days = (date2.getTime() - date1.getTime()) / (1000 * 3600 * 24); //days in 80 years

  let totalPercentage = 0;

  //calculate info in array
  for (let i = 0; i < seriesDurations.length; i++) {
    let sumInDays = seriesDurations[i].days + (seriesDurations[i].hours / 24) + (seriesDurations[i].minutes / 1440);
    const percentage = (sumInDays / days) * 100;
    const sentence = seriesDurations[i].title + " took " + percentage.toFixed(3) + "% of my life";
    console.log(sentence);
    totalPercentage += percentage;
  }

  console.log("In total that is " + totalPercentage.toFixed(3) + "% of my life.");
}

calcLifeTime();

/* ------STEP 3------ */

/* NOnoN0nOYes (Note taking App) */

const notes = [];

//saveNote

function saveNote(content, id) {
  const noteObj = {
    "content": content,
    "id": id
  };
  notes.push(noteObj);
}

saveNote("Play with dog", 1);
saveNote("Shop for groseries", 2);

console.log(notes);

//getNote

function getNote(id) {
  for (let i = 0; i < notes.length; i++) {
    if (notes[i].id === id) {
      return notes[i];
    }
  }
  return "Error, id not found";
}

const firstNote = getNote(2);
console.log(firstNote);
const secondNote = getNote();
console.log(secondNote);

//Log out notes

function logOutNotesFormatted() {
  notes.forEach(function (note) {
    console.log(`The note with id: ${note.id}, has the following note text: ${note.content}.`);
  });
}

logOutNotesFormatted();

//Unique feature 
//If the note is urgent, it will be moved at the top of the list (beggining of array)


function addUrgent(content, id) {
  const noteObj = {
    "content": content,
    "id": id,
    "urgent": true
  }
  notes.unshift(noteObj);
}
addUrgent("Do laundry", 3);
logOutNotesFormatted();

/* CactusIO-interactive (Smart phone usage app) */

var activities = [];
var emptyArray = [];
const dateOptions = { day: "2-digit", month: "2-digit", year: "numeric" }
const date = new Date();
const today = date.toLocaleDateString(dateOptions);

//Adding an activity

function addActivity(date, activity, duration) {
  const activityObj = {
    "date": date,
    "activity": activity,
    "duration": duration
  }

  activities.push(activityObj);

}

addActivity(today, "Youtube", 30);
addActivity(today, "Whatsapp", 40);
addActivity(today, "Facebook", 20);
addActivity("1/2/2021", "Instagram", 50);

//Show my status and Usage Limit
function showStatus(actArray, limit = -1, day = today) {
  var sum = 0;
  var count = 0;
  var timeLimit = limit;
  for (let i = 0; i < actArray.length; i++) {
    //compare the date of the array with the requested date
    if (actArray[i].date === day) {
      sum += actArray[i].duration;
      count++;
    }
  }
  //if the time limit was defined and it was exceded
  if (sum > timeLimit && timeLimit >= 0) {
    var statement = `You have reached your limit, no more smartphoning for you`;

    //if the array was empty or no info for requested date
  } else if (actArray.length === 0 || count === 0) {
    statement = "Add some activities before calling showStatus";

    //if there wasnt a time limit or it wasnt exceded
  } else {
    statement = `You have added ${count} activities. They amount to ${sum} min. of usage.`
  }
  console.log(statement);


}

showStatus(activities, 100); //limit > total time
showStatus(activities, 50);// limit < total time
showStatus(activities); // no limit
showStatus(activities, 0); // limit = 0
showStatus(activities, 100, "1/2/2021"); //the only different date
showStatus(activities, 100, "1/1/2021"); //a date thats not on the list
showStatus(emptyArray); //an empty array

//Show which social network you used the most
function showMostUsed(actArray) {
  let mostUsed = 0;
  let app = ""
  for (let i = 0; i < actArray.length; i++) {
    if (actArray[i].duration > mostUsed) {
      mostUsed = actArray[i].duration;
      app = actArray[i].activity;
    }
  }
  console.log(mostUsed);
  return console.log(app);
}
showMostUsed(activities);

//Extra feature
//order the activity by duration

/* At first I did a function to give back an ordered array. Then I found 
that I can do that with array.sort(). But I'm so proud of my function, 
I couldnt erase it.

const orderedArray = [];
function orderActivities(actArray) {
  let tempArray = actArray.slice();
  let index = 0;
  while (tempArray.length > 0) {
    let mostUsed = 0;
    for (let i = 0; i < tempArray.length; i++) {
      if (tempArray[i].duration > mostUsed) {
        mostUsed = tempArray[i].duration;
        index = i;
      }
    }
    orderedArray.push(tempArray[index]);
    tempArray.splice(index, 1);

  }
  return console.log(orderedArray);
} */

function sortArray(actArray) {
  actArray.sort(function (a, b) {
    return b.duration - a.duration
  });
  console.log(actArray);
}

sortArray(activities);


