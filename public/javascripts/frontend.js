
function setFlashMessageFade(flashMessageElement) 
{
    // console.log("flash message is" + flashElement);
    setTimeout( () => 
    {
        let currentOpacity = 1.0;
        let timer = setInterval( () =>
        {
            if (currentOpacity < 0.05)
            {
                clearInterval(timer);
                flashMessageElement.remove();
            }
            currentOpacity = currentOpacity - .05;
            flashMessageElement.style.opacity = currentOpacity;
        },50);//triggers every 50 millisecs
    },4000)//start to trigger after 4000 milisecs or 4 secs 
}

// function addFlashFromFrontEnd(message)
// {
//     let flashMessageDiv = document.createElement('div');
//     let innerFlashDiv = document.createElement('div');
//     let innerTextNode = document.createTextNode(message);
//     innerFlashDiv.appendChild(innerTextNode);
//     flashMessageDiv.appendChild(innerFlashDiv);
//     flashMessageDiv.setAttribute('id', `flash-message`);
//     innerFlashDiv.setAttribute('class', 'alert alert-info');
//     document.getElementsByTagName('body')[0].appendChild(flashMessageDiv);
//     setFlashMessageFade(flashMessageDiv);
// }

// function createCard(postData)
// {
//     return `<div id = "post-${postData.id}" class = "card">
//     <img class = "cardImg" src = "${postData.thumbnail}" alt = "Missing Image">
//     <div class = "cardBody">
//         <p class = "cardTitle">${postData.title}</p>
//         <p class = "cardText">${postData.description}</p>
//         <a href = "/post/${postData.id}" class = "anchorButtons">Post Details</a>
//     </div>
// </div>`;
// }

// function executeSearch() 
// {
//     let searchTerm = document.getElementById('searchText').value;
//     if(!searchTerm)
//     {
//         location.replace('/');
//         return;
//     }
//     let mainContent = document.getElementById('container');
//     let searchURL = `/posts/search?search=${searchTerm}`;
//     fetch(searchURL)
//     .then((data) => 
//     {
//         return data.json();
//     })
//     .then( (data_json) => 
//     {
//         let newMainContentHTML = '';
//         data_json.results.forEach( (row) => 
//         {
//             newMainContentHTML += createCard(row);
//         });
//         console.log(newMainContentHTML);
//         mainContent.innerHTML = newMainContentHTML;
//         if(data_json.message) 
//         {
//             addFlashFromFrontEnd(data_json.message);
//         }
//     })
//     .catch((err) => console.log(err)); 
// }

let flashElement = document.getElementById('flash-message');
if (flashElement)
{
    setFlashMessageFade(flashElement);
}

// let searchButton = document.getElementById('searchButton');
// if (searchButton)
// {
//     searchButton.onclick = executeSearch;
// }







