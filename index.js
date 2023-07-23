import { catsData } from '/data.js'

const emotionRadios = document.getElementById('emotion-radios')
const getImageBtn = document.getElementById('get-image-btn')
const gifsOnlyOption = document.getElementById('gifs-only-option')
const memeModalInner = document.getElementById('meme-modal-inner')
const memeModal = document.getElementById('meme-modal')
const memeModalCloseBtn = document.getElementById('meme-modal-close-btn')

emotionRadios.addEventListener('change', highlightCheckedOption)

memeModalCloseBtn.addEventListener('click', closeModal)

getImageBtn.addEventListener('click', renderCat)

//highlightCheckedOption is called when the emotion radio is checked. It uses getElementsByClassName and a for of loop to loop through all radios and remove any existing highlight and then adds highlight to the whole parent element of the 'target' id of the 'event'(e) so that the whole box receives 'highlight' styling//
function highlightCheckedOption(e){
    const radios = document.getElementsByClassName('radio')
    for (let radio of radios){
        radio.classList.remove('highlight')
    }
    document.getElementById(e.target.id).parentElement.classList.add('highlight')
}

//closeModal sets the modal css diplay to none when the close button is clicked//
function closeModal(){
    memeModal.style.display = 'none'
}

//renderCat is called by clicking the Get Image button. It takes the randomly selected cat object and uses the image and alt keys to populate the HTML within the meme modal with the relevant image//
function renderCat(){
    const catObject = getSingleCatObject()
    memeModalInner.innerHTML =  `
        <img 
        class="cat-img" 
        src="./images/${catObject.image}"
        alt="${catObject.alt}"
        >
        `
    memeModal.style.display = 'flex'
}

//getSingleCatObject is called by renderCat. It takes the matching cat array and usesMath.random to generate a random cat//
function getSingleCatObject(){
    const catsArray = getMatchingCatsArray()
    
    if(catsArray.length === 1){
        return catsArray[0]
    }
    else{
        const randomNumber = Math.floor(Math.random() * catsArray.length)
        return catsArray[randomNumber]
    }
}

//getMatchingCatsArray is called by getSingleCatObject. It returns an array of cats with emotion tags that match the selected emtion radio//
function getMatchingCatsArray(){
    //query selector identifies the pseudo class :checked. If a radio is checked the value is saved to a const. Gifs checkbox is also saved as a boolean value//   
    if(document.querySelector('input[type="radio"]:checked')){
        const selectedEmotion = document.querySelector('input[type="radio"]:checked').value
        const isGif = gifsOnlyOption.checked
       //filter and includes used to return only those cats with matching emotions and gif status//
        const matchingCatsArray = catsData.filter(function(cat){
            
            if(isGif){
                return cat.emotionTags.includes(selectedEmotion) && cat.isGif
            }
            else{
                return cat.emotionTags.includes(selectedEmotion)
            }            
        })
        return matchingCatsArray 
    }  
}

//getEmotionsArray is passed catsData where it is called within rederEmotionsRadio and uses a nested for loop to loop through each emotions array within each cat.  It pushes each emotion to emaotionsArray only if it is not already included in the array to remove duplicates//
function getEmotionsArray(cats){
    const emotionsArray = []    
    for (let cat of cats){
        for (let emotion of cat.emotionTags){
            if (!emotionsArray.includes(emotion)){
                emotionsArray.push(emotion)
            }
        }
    }
    return emotionsArray
}

//renderEmotionsRadios passes in the catsData array of objects and uses a for of loop to loop through the emotions array and reder them to HTML as radio buttons.  When it calls getEmotionsArray it passes cats, which is catsData//
function renderEmotionsRadios(cats){
        
    let radioItems = ``
    const emotions = getEmotionsArray(cats)
    for (let emotion of emotions){
        radioItems += `
        <div class="radio">
            <label for="${emotion}">${emotion}</label>
            <input
            type="radio"
            id="${emotion}"
            value="${emotion}"
            name="emotions"
            >
        </div>`
    }
    emotionRadios.innerHTML = radioItems
}

renderEmotionsRadios(catsData)




