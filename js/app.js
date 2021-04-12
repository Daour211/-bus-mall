'use strict';

let firstImage = document.getElementById('first');
let secondImage = document.getElementById('second');
let thirdImage = document.getElementById('third');

let firstIndex;
let secondIndex ;
let thirdIndex;

let attempts = 10;
let counter = 0; 

function Catalog (product,src){
    this.name = product;
    this.source= src;
    this.shown= 0;
    this.votes= 0;

    Catalog.allObjects.push(this)
}

Catalog.allObjects=[];
console.log(Catalog.allObjects);

new Catalog ('bag','img/bag.jpg');
new Catalog ('banana','img/banana.jpg');
new Catalog ('bathromm','img/bathroom.jpg');
new Catalog ('boots','img/boots.jpg');
new Catalog ('breakfast','img/breakfast.jpg');
new Catalog ('bubblegum','img/bubblegum.jpg');
new Catalog ('chair','img/chair.jpg');
new Catalog ('cthulhu','img/cthulhu.jpg');
new Catalog ('dog-duck','img/dog-duck.jpg');
new Catalog ('dragon','img/dragon.jpg');
new Catalog ('pen','img/pen.jpg');
new Catalog ('pet-sweep','img/pet-sweep.jpg');
new Catalog ('scissors','img/scissors.jpg');
new Catalog ('shark','img/shark.jpg');
new Catalog ('sweep','img/sweep.jpg');
new Catalog ('tauntaun','img/tauntaun.jpg');
new Catalog ('unicorn','img/unicorn.jpg');
new Catalog ('usb','img/usb.jpg');
new Catalog ('water','img/water-can.jpg');
new Catalog ('wine-glass','img/wine-glass.jpg');


function generateRandomPhoto(){
    return Math.floor(Math.random()* Catalog.allObjects.length)
}


function render(){
    firstIndex = generateRandomPhoto ();
    secondIndex = generateRandomPhoto ();
    thirdIndex = generateRandomPhoto();

    while (firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex){
        secondIndex = generateRandomPhoto();
        thirdIndex = generateRandomPhoto();

    }

    firstImage.src= Catalog.allObjects[firstIndex].source;
    secondImage.src= Catalog.allObjects[secondIndex].source;
    thirdImage.src= Catalog.allObjects[thirdIndex].source;

    firstImage.textContent =  Catalog.allObjects[firstIndex].shown++;
    secondImage.textContent =  Catalog.allObjects[secondIndex].shown++;
    thirdImage.textContent =  Catalog.allObjects[thirdIndex].shown++;
}

render();

let div = document.getElementById('imagesDiv'); 

div.addEventListener('click',pickPhoto);

function pickPhoto(event){
    
    counter++;
    console.log(counter);

    if (counter<=attempts){

        if(event.target.id === 'first'){
            Catalog.allObjects[firstIndex].votes++;
        }else if(event.target.id === 'second'){
            Catalog.allObjects[secondIndex].votes++;
        }else if(event.target.id === 'third'){
            Catalog.allObjects[thirdIndex].votes++;
    
        }  

        render();

    
    }else {

        div.removeEventListener('click',pickPhoto);

        let viewResult = document.getElementById('viewResult')

        viewResult.addEventListener('click',showResult);
        
        // div.appendChild(viewResult);

        let list = document.getElementById('list');
        let header = document.createElement('h4');
        list.appendChild(header);
        header.textContent = 'Results'
        let photosList ;


        function showResult(){


    
            for (let i = 0; i < Catalog.allObjects.length; i++) {

                photosList = document.createElement('li');
                list.appendChild(photosList);
                
                photosList.textContent= `${Catalog.allObjects[i].name} had ${Catalog.allObjects[i].votes} votes and was seen ${Catalog.allObjects[i].shown} times`
            }
        }     
        
               
        
    }
}