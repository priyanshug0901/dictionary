let input =document.querySelector('#input');
let searchBtn=document.querySelector('#search');
let notFound=document.querySelector('.not__found');
let def = document.querySelector('.def');
let loading =document.querySelector('.loading');
let audioBox = document.querySelector('.audio');
const apiKey='1b39720c-fd55-4dd0-8708-e94ce79acc90';
searchBtn.addEventListener('click',function(e){
    e.preventDefault();
    notFound.innerText='';
    def.innerText='';
   audioBox.innerText='';
   
    //get input data
let word=input.value;
let response=getData(word);

});


async function getData(word){
    loading.style.display = 'block';
    let ans = await fetch(`https://www.dictionaryapi.com/api/v3/references/learners/json/${word}?key=1b39720c-fd55-4dd0-8708-e94ce79acc90`);
    
    const returned = await ans.json();
    console.log(returned);

    //if data not found
    if(!returned.length){
       //hide loading
       loading.style.display = 'none';
        notFound.innerText='NO Results Found';        
        console.log(notFound);
        return;
    }

    //if result is suggestions

    if(typeof returned[0] === 'string'){
       //hide loading
       loading.style.display = 'none';
        let heading=document.createElement('h3');
            heading.innerText='DID YOU MEAN ?';
            notFound.appendChild(heading);
        
        returned.forEach(element => {
            let suggestions = document.createElement('span');
           suggestions.classList.add('suggestions');
           suggestions.innerText=element;
           notFound.appendChild(suggestions);
        });
        return;
    }

    //result found
       //hide loading
       loading.style.display = 'none';
    def.innerText=returned[0].shortdef[0];   
    
     // Sound 
     const soundName = returned[0].hwi.prs[0].sound.audio;
     
     if(soundName) {
         renderSound(soundName);
     }

}

function renderSound(soundName) {
    // https://media.merriam-webster.com/soundc11
    let subfolder = soundName.charAt(0);
    let soundSrc = `https://media.merriam-webster.com/soundc11/${subfolder}/${soundName}.wav?key=${apiKey}`;

    let aud = document.createElement('audio');
    aud.src = soundSrc;
    aud.controls = true;
    audioBox.appendChild(aud);

}



// let suggestion=document.querySelector('.suggestions');
// console.log(suggestion);

// suggestion.addEventListener('click',function(e){
   
//     notFound.innerText='';
//     def.innerText='';
   
   
//     //get input data
//  word=suggestion.innerText;
//  response=getData(word);

// })
