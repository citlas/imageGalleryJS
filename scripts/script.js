let startUrl= "https://api.unsplash.com/photos?client_id=5242c9920799828e90063b925625df6d53705465a6ae595a50405eec418b1a37"

/*Comentarios de Albert

done! --- Lo mas grave que veo de inicio sería declarar la clase Picture  dentro de una función.
done! --- Lo que yo habría hecho sería ponerla encima de la funcion getPictures y desde dentro de la funcion map ya instancias Picture para usarla. 

--- O incluso mejor sería hacer esta funcion un método de la clase Picture.

done! --- Además viendo que luego generas elementos dinámicos (document.createElement), podrías haber aprovechado la clase Picture para añadir un metodo que fuera tipo buildItem()  y ahí generas los elementos y solo tendrías que llamar al método. 
Eso teniendo en cuenta todas las promises en este caso del fetch(url), pero es solo una idea rápida que se me ocurre.

class Picture {
    constructor() {}
    getPictures() {}
    buildItems() {}
    draw() {}
}

let picture = new Picture (startUrl)
picture.getPictures();
picture.buildItems();
picture.draw();

done --- Una tonteria de usabilidad es que (me gusta el autosearch), pero si vacías el campo de búsqueda, se queda la pagina en blanco, podrías poner el mismo default que tienes cuando cargas por primera vez la página.

*/

class Picture{
  constructor(fullUrl,smallUrl,description){
    this.fullUrl=fullUrl;
    this.smallUrl=smallUrl;
    this.description=description; 
  }
  buildItem (elementToCreate, selectClass) {
    let itemName = document.createElement(elementToCreate)
    itemName.className += selectClass;
    return itemName
 }
}

function getPictures() {
    fetch(startUrl)
    .then(function(response){
        return response.json();
    })
    .then(function(data) {
        console.log(data)
        let resultsToUse = data
        if(data.hasOwnProperty("results")){ //if is going to show the search results use another data
            resultsToUse = data.results
        } 
        resultsToUse.map(function(data){    

        let gallery = document.querySelector("#gallery");
        let picture = new Picture (data.urls.full,data.urls.small,data.description)
        let imagediv = picture.buildItem('div','eachImage')
        let image = picture.buildItem('a','postImage')
        image.href = `${picture.fullUrl}`
        image.innerHTML += `<img src=${picture.smallUrl}>`
        let p = picture.buildItem('p','altText')
      
        //get description to show it on hover          
        if(picture.description){
          p.innerHTML = `${picture.description}`;
        } else {
          p.innerHTML = `No description provided`;
        }
        
        //append evertyhing
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
  if(input.value==""){
    startUrl = "https://api.unsplash.com/photos?client_id=5242c9920799828e90063b925625df6d53705465a6ae595a50405eec418b1a37"
    getPictures()
  } else {
    clearTimeout(timer);
    timer=setTimeout(function validate(){
     let searchUrl = `https://api.unsplash.com/search/photos?page=1&query=${input.value}&client_id=5242c9920799828e90063b925625df6d53705465a6ae595a50405eec418b1a37`
     startUrl = searchUrl;
     document.querySelector('#gallery').innerHTML = "";
     getPictures();
    },1000);
  }

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