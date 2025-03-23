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
        if(!response.ok){
            throw new Error(`${response.status}`);
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
            // creating the elemrnts to hold the image which has alrady been styled in the css
            const animalNames = document.createElement('div');
            const animalChild = document.createElement('span');

            animalChild.textContent = name;
            animalNames.appendChild(animalChild);
            //placing the span inside the  div
            parentBar.appendChild(animalNames);
            animalNames.addEventListener('click', async ()=> {
                document.getElementById('image').src = image;
                document.getElementById('name').textContent = name;
                voteNum.textContent = votes;
                resourcePart = id;
                activeData = element;
            });   
           
        });
        
    } catch (error) {
        console.log('error');          
    }
}
async function  updateVotes(){
    try {
        const currentVotes = parseInt(voteNum.textContent);
        const userInputVotes = parseInt(votesInputUser.ariaValueMax,10);
        if (isNaN(userInputVotes)) {
            throw new Error("enter a valid vote count");                                
        }
        const newVotes = currentVotes + userInputVotes;
        activeData.votes = newVotes;
        voteNum.textContent = newVotes
        const response = await fetch(`${myUrl}/${resourcePart}`,{
            method: 'PUT',
            headers:{
                    'Content-Type':'application/json'
            },
            body: JSON.stringify(activeData)
        });
        if (!response.ok) {
            throw new Error(`${response.status}`);                                
        }
        const result = await response.json();
        console.log(result)
            
    } catch (error) {
        console.log(error);             
    }
}
myForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    updateVotes();
});
async function resetVotes() {
    try {
        activeData.votes = 0;
        voteNum.textContent = 0;
        const res = await fetch(`${myUrl}/${resourcePart}`,{
            method: 'PUT',
            headers:{
                'Content-Type':'application/Json'
            },
            body: JSON.stringify(activeData)
        })
        const result = await res.json()
        console.log(result)
            
    } catch (error) {
        console.log(error);               
    }        
};   


myReset.addEventListener('click',resetVotes);
nameData();