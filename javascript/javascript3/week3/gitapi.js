//Global Variables
const reposContainer = document.querySelector(".repos-list");

//functions
function render(promises) {
    const userRepos = promises.map(promise => promise.items);
    userRepos.forEach(repositories => {
        createReposList(repositories);
    });
}

function createReposList(repositories) {
    const ownerLi = document.createElement("li");
    const mainUl = document.createElement("ul");
    const reposUl = document.createElement("ul");
    //repos owner
    const repositoryOwner = repositories[0].owner.login
    mainUl.classList = "owner-ul"
    ownerLi.classList = "owner";
    ownerLi.innerHTML = repositoryOwner;
    mainUl.appendChild(ownerLi);
    //Make list for each repo
    createOneLi(repositories, reposUl, ownerLi)
    //Append everyting
    reposContainer.appendChild(mainUl);
}

function createOneLi(repositories, parent1, parent2) {
    repositories.forEach(rep => {
        const reposLi = document.createElement("li");
        reposLi.innerHTML = `${rep.name}: <a href=${rep.html_url}>${rep.html_url}</a>`
        reposLi.classList = "repos-list";
        parent1.classList = "repos-ul"
        parent1.appendChild(reposLi);
        parent2.appendChild(parent1);
    })

}

function fetchRepo(user) {
    return fetch(`https://api.github.com/search/repositories?q=user:${user}`)
        .then(response => response.json())
        .then(data => data)
}

Promise.all([fetchRepo("Hani-far"), fetchRepo("shpomp"), fetchRepo("islam-fawzy25")])
    .then((values) => render(values))
