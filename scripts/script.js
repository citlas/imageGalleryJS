let startUrl= "https://api.unsplash.com/photos?client_id=5242c9920799828e90063b925625df6d53705465a6ae595a50405eec418b1a37"


function getPictures() {
    fetch(startUrl)
.then(function(response){
    return response.json();
})
.then(function(data) {
    //console.log(data)

    let resultsToUse = data
    //if is going to show the search results use another data
    if(data.hasOwnProperty("results")){
        resultsToUse = data.results
    } 
    
    resultsToUse.map(function(data){    

      class Picture{
        constructor(fullUrl,smallUrl,description){
          this.fullUrl=fullUrl;
          this.smallUrl=smallUrl;
          this.description=description;
        }
      }

      let picture = new Picture (data.urls.full,data.urls.small,data.description)


        let imagediv = document.createElement('div')
        imagediv.className += "eachImage";
        // if using modal-- imagediv.onclick = function(){showModal(`${data.urls.full}`)}
    
        let image = document.createElement('a')
       
        image.className += "postImage";
        //image.href = `${data.urls.full}`
        //image.innerHTML += `<img src=${data.urls.small}>`

        image.href = `${picture.fullUrl}`
        image.innerHTML += `<img src=${picture.smallUrl}>`

        /*for modal: change a for img, delete image.innerhtml and add
        image.setAttribute('data-full-url',`${data.urls.full}`);
        image.src = `${data.urls.small}`*/
        let p = document.createElement('p')
        p.className += "altText";
        
        //get description to show it on hover
       // if(data.description){
         // p.innerHTML = `${data.description}`;
          
          if(picture.description){
            p.innerHTML = `${picture.description}`;

        } else {
          p.innerHTML = `No description provided`;
          
        }
        
        
        let gallery = document.querySelector("#gallery");
        imagediv.appendChild(image)
        imagediv.appendChild(p)
        gallery.appendChild(imagediv)
    }
    )  
})
}

//show pictures at the beginning
getPictures();

//search 
let input = document.querySelector('#termToSearch'); 
input.onkeyup = searchThis;
let timer; //created for delay the keyup search

function searchThis() {
clearTimeout(timer);
   timer=setTimeout(function validate(){
    let searchUrl = `https://api.unsplash.com/search/photos?page=1&query=${input.value}&client_id=5242c9920799828e90063b925625df6d53705465a6ae595a50405eec418b1a37`
    startUrl = searchUrl;
    document.querySelector('#gallery').innerHTML = "";
    getPictures();
   },1000);
}

//Modal-- bad idea, full picture is way too big 
/* let modal = document.querySelector("myModal");
let images = document.getElementsByClassName("eachImage");
let modalImage = document.querySelector("modalImage");
let span = document.getElementsByClassName("close")[0];

function showModal(fullUrl){
  modal.style.display = "block";
  modalImage.src = fullUrl;
}

span.onclick = function() {
  modal.style.display = "none";
}

window.onclick = function(event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
} */