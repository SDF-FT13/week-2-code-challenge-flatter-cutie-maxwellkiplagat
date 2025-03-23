// global scoping the variable to access it  in the function scope
const myUrl = 'http://localhost:3000/characters';
const parentBar = document.getElementById('cahracter-bar');
const votesInputUser = document.getElementById('votes');
const myForm = document.getElementById('votes-form');
const voteNum = document.getElementById('vote-count');
const myReset = document.getElementById('reset-btn')
let resourcePart = null;
let activeData = null;

async function nameData() {
    try {
        const response = await fetch(myUrl)
        if(!response.ok){throw new Error(`${response.status}`);
        }
        const data  = await response.json();
        // checking the data in data 
        console.log(data);
        data.forEach(element => {
            //accessing the data that is in the db.json
            const {name, image, votes, id } = element;  
            //checking the data 
            console.log(name);
            console.log(image);
            console.log(votes);
            console.log(id);


}