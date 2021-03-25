//Global Variables
const myDiv = document.querySelector(".repos-list");

//functions
function render(promises) {
    const userRepos = promises.map(promise => promise.items);
    userRepos.forEach(rep => {
        //get owners name
        const myUl = document.createElement("ul");
        const ownerLi = document.createElement("li");
        const reposUl = document.createElement("ul");
        myUl.classList = "owner-ul"
        ownerLi.classList = "owner";
        ownerLi.innerHTML = rep[0].owner.login;
        myUl.appendChild(ownerLi);
        //list all repos
        rep.forEach(element => {
            const reposLi = document.createElement("li");
            reposLi.innerHTML = `${element.name}: <a href=${element.html_url}>${element.html_url}</a>`
            reposLi.classList = "repos-list";
            reposUl.classList = "repos-ul"
            reposUl.appendChild(reposLi);
            ownerLi.appendChild(reposUl);
            myDiv.appendChild(myUl);
        })
    });
}

function fetchRepo(user) {
    return fetch(`https://api.github.com/search/repositories?q=user:${user}`)
        .then(response => response.json())
        .then(data => data)
}

Promise.all([fetchRepo("Hani-far"), fetchRepo("shpomp"), fetchRepo("islam-fawzy25")])
    .then((values) => render(values))
