// const myUrl = 'http://localhost:3000/characters';
// const parentBar = document.getElementById('character-bar');
// const votesInputUser = document.getElementById('votes');
// const myForm = document.getElementById('votes-form');
// const voteNum = document.getElementById('vote-count');
// let activeId = null;

// async function nameData() {
//     try {
//         const response = await fetch(myUrl);
//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }
//         const data = await response.json();

//         data.forEach(element => {
//             const { name, image, votes, id } = element;
//             console.log(name);
//             console.log(image);
//             console.log(votes);
//             console.log(id);

//             const animalNames = document.createElement('div');
//             const animalChild = document.createElement('span');

//             animalChild.textContent = name;
//             animalNames.appendChild(animalChild);
//             parentBar.appendChild(animalNames);

//             animalNames.addEventListener('click', () => {
//                 document.getElementById('image').src = image;
//                 document.getElementById('name').textContent = name;
//                 voteNum.textContent = votes;
//                 activeId = id;
//                 console.log(votesInputUser.value);
//             });
//         });
//     } catch (error) {
//         console.error('Error fetching data:', error);
//     }
// }

// myForm.addEventListener('submit', async (e) => {
//     e.preventDefault();

//     if (!activeId) {
//         console.error('No active ID selected');
//         return;
//     }

//     try {
//         const newVotes = parseInt(votesInputUser.value);
//         if (isNaN(newVotes)) {
//             console.error('Invalid vote count');
//             return;
//         }

//         const response = await fetch(`${myUrl}/${activeId}`, {
//             method: 'PUT',
//             headers: {
//                 'Content-Type': 'application/json'
//             },
//             body: JSON.stringify({ votes: newVotes,image: }) // Assuming the server expects a JSON object with a "votes" property
//         });

//         if (!response.ok) {
//             throw new Error(`HTTP error! status: ${response.status}`);
//         }

//         const result = await response.json();
//         console.log(result);
//         voteNum.textContent = newVotes; // Update the vote count display
//     } catch (error) {
//         console.error('Error updating vote count:', error);
//     }
// });


// nameData();
const myUrl = 'http://localhost:3000/characters';
const parentBar = document.getElementById('character-bar');
const votesInputUser = document.getElementById('votes');
const myForm = document.getElementById('votes-form');
const voteNum = document.getElementById('vote-count');
const myReset = document.getElementById('reset-btn')
let activeId = null;
let activeData = null; // Store the active data object

async function nameData() {
    try {
        const response = await fetch(myUrl);
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();

        data.forEach(element => {
            const { name, image, votes, id } = element;
            console.log(name);
            console.log(image);
            console.log(votes);
            console.log(id);

            const animalNames = document.createElement('div');
            const animalChild = document.createElement('span');

            animalChild.textContent = name;
            animalNames.appendChild(animalChild);
            parentBar.appendChild(animalNames);

            animalNames.addEventListener('click', async () => {
                document.getElementById('image').src = image;
                document.getElementById('name').textContent = name;
                voteNum.textContent = votes;
                activeId = id;
                activeData = element; // Store the active data object
                console.log(votesInputUser.value);
            });
        });
    } catch (error) {
        console.error('Error fetching data:', error);
    }
}

async function updateVote() {
    try {
        if (!activeId || !activeData) {
            throw new Error('No active ID or data selected');
        }

        // Retrieve current votes
        const currentVotes = parseInt(voteNum.textContent);

        // Get user input
        const userInputVotes = parseInt(votesInputUser.value, 10);

        if (isNaN(userInputVotes)) {
            throw new Error('Invalid vote count');
        }

        // Add votes
        const newVotes = currentVotes + userInputVotes;

        // Update the votes property of the active data object
        activeData.votes = newVotes;

        // Update the display
        voteNum.textContent = newVotes;

        // Send the updated object to the server
        const response = await fetch(`${myUrl}/${activeId}`, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(activeData)
        });

        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result);
    } catch (error) {
        console.error(error);
    }
}

myForm.addEventListener('submit', (e) => {
    e.preventDefault();
    updateVote();
});
async function resetVotes (){
    try{
        activeData.votes = 0;
        voteNum.textContent = 0;
        const res = await  fetch(`${myUrl}/${activeId}`,{
            method: 'PUT',
            headers:{
                'Content-Type': 'application/json'
            },
            body:JSON.stringify(activeData)
        })
        const result = await res.json()
        console.log(result);       

    }catch(error){
        console.log(error)
    }
};
myReset.addEventListener('click',resetVotes)

nameData();