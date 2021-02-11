//Voice Assistant
var user = {
    "name": "",
    "toDoList": []
};
function getReply(command) {
    let voiceCom = command.toLowerCase();
    let start = 0;
    let end = 0;
    let todo = "";
    if (voiceCom.includes("my name is")) {
        start = voiceCom.indexOf("is") + 3;
        user.name = command.slice(start);
        return "Welcome " + user.name + "!";
    } else if (voiceCom.includes("what") && voiceCom.includes("my name")) {
        if (user.name != undefined) {
            return "Your name is " + user.name;
        }
        return "Sorry, I still don't know who you are.";
    } else if (voiceCom.includes("add") && voiceCom.includes("todo")) {
        start = voiceCom.indexOf("add") + 4;
        end = voiceCom.indexOf("to my todo")
        todo = voiceCom.slice(start, end)
        user.toDoList.push(todo);
        return todo + "added to your To Do List.";
    } else if (voiceCom.includes("remove") && voiceCom.includes("todo")) {
        start = voiceCom.indexOf("remove") + 7;
        end = voiceCom.indexOf("from my todo");
        todo = voiceCom.slice(start, end);
        let index = user.toDoList.indexOf(todo);
        if (index > -1) {
            user.toDoList.splice(index, 1);
            return todo + "removed from your To Do List."
        } else {
            return "I couldn't find " + todo + "in your To Do List."
        }

    } else if (voiceCom.includes("what") && voiceCom.includes("todo")) {
        if (user.toDoList.length === 0) {
            return "Your To Do List is empty. Add some tasks.";
        } else {
            return user.toDoList;
        }
    } else if (voiceCom.includes("what") && voiceCom.includes("day") && voiceCom.includes("today")) {
        const date = new Date();
        let day = date.toLocaleDateString('en-GB', { day: 'numeric' });
        let month = date.toLocaleDateString('en-GB', { month: 'long' });
        let year = date.toLocaleDateString('en-GB', { year: 'numeric' })
        today = day + " of " + month + " " + year;
        return "Today is " + today;
    } else if (voiceCom.includes("+") || voiceCom.includes("-") || voiceCom.includes("*") || voiceCom.includes("/")) {
        let dig = /\d+/g;
        let digits = voiceCom.match(dig);
        let a = parseInt(digits[0]);
        let b = parseInt(digits[1]);
        if (voiceCom.includes("+")) {
            return a + b;
        } else if (voiceCom.includes("-")) {
            return a - b;
        } else if (voiceCom.includes("*")) {
            return a * b;
        } else if (voiceCom.includes("/")) {
            return a / b;
        }

    } else if (voiceCom.includes("timer") && (voiceCom.includes("minute") || voiceCom.includes("second"))) {
        let dig = /\d+/;
        let time = voiceCom.match(dig);
        let a = 0;
        a = parseInt(time[0]);
        let timReq = "";
        if (voiceCom.includes("second")) {
            a = a * 1000;
            timeReq = a > 1000 ? "seconds" : "second";
        } else if (voiceCom.includes("minute")) {
            a = a * 60000;
            timeReq = a > 60000 ? "minutes" : "minute";
        }
        setTimeout(function () {
            console.log("Time's done");
        }, a);

        return "Timer set for " + time + " " + timeReq;

    } else if (voiceCom.includes("what") && voiceCom.includes("time is")) {
        const date = new Date();
        let hour = date.getHours();
        let minutes = date.getMinutes();
        let time = "The time is " + hour + (hour > 1 ? " hours" : " hour") + " with " + minutes + (minutes > 1 ? " minutes" : " minute");
        return time;
    } else if (voiceCom.includes("what") && voiceCom.includes("your name")) {
        return "Guess it! Hint: Is not Siri or Alexa."
    } else {
        return "I can't help you with that for the moment."
    }
}

console.log(getReply("Hello my name is John"));
console.log(getReply("Hello my name is Joaquin"));
console.log(getReply("What is my name?"));
console.log(getReply("Hey there!, what is my name?"));
console.log(getReply("Add fishing to my todo"));
console.log(getReply("Add laundry to my todo"));
console.log(getReply("Add singing in the shower to my todo"));
console.log(getReply("Remove fishing from my todo"));
console.log(getReply("Remove shopping from my todo"));
console.log(getReply("What is on my todo?"));
console.log(getReply("What day is it today?"));
console.log(getReply("What is 3 + 3"));
console.log(getReply("What is 4 * 12"));
console.log(getReply("What is 15 / 2"));
console.log(getReply("Set a timer for 5 seconds"));
console.log(getReply("Set a timer for 1 minute"));
console.log(getReply("Set a timer for 2 minutes"));
console.log(getReply("What time is it?"));
console.log(getReply("What is your name"));
console.log(getReply("Call my dad"));

