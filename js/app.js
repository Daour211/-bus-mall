'use strict';

let firstImage = document.getElementById('first');
let secondImage = document.getElementById('second');
let thirdImage = document.getElementById('third');

let firstIndex;
let secondIndex;
let thirdIndex;

let attempts = 10;
let counter = 0;

// let setOfPhotos = [];

let objectsNameArray = [];
let votesArray = [];
let shownArray = [];

function Catalog(product, src) {
    this.name = product;
    this.source = src;
    this.shown = 0;
    this.votes = 0;

    Catalog.allObjects.push(this)
}

Catalog.allObjects = [];
console.log(Catalog.allObjects);

new Catalog('bag', 'img/bag.jpg');
new Catalog('banana', 'img/banana.jpg');
new Catalog('bathromm', 'img/bathroom.jpg');
new Catalog('boots', 'img/boots.jpg');
new Catalog('breakfast', 'img/breakfast.jpg');
new Catalog('bubblegum', 'img/bubblegum.jpg');
new Catalog('chair', 'img/chair.jpg');
new Catalog('cthulhu', 'img/cthulhu.jpg');
new Catalog('dog-duck', 'img/dog-duck.jpg');
new Catalog('dragon', 'img/dragon.jpg');
new Catalog('pen', 'img/pen.jpg');
new Catalog('pet-sweep', 'img/pet-sweep.jpg');
new Catalog('scissors', 'img/scissors.jpg');
new Catalog('shark', 'img/shark.jpg');
new Catalog('sweep', 'img/sweep.jpg');
new Catalog('tauntaun', 'img/tauntaun.jpg');
new Catalog('unicorn', 'img/unicorn.jpg');
new Catalog('usb', 'img/usb.jpg');
new Catalog('water', 'img/water-can.jpg');
new Catalog('wine-glass', 'img/wine-glass.jpg');


function generateRandomPhoto() {
    return Math.floor(Math.random() * Catalog.allObjects.length)
}


let setOfPhotos = [];
function render() {
    // firstIndex = generateRandomPhoto();
    // secondIndex = generateRandomPhoto();
    // thirdIndex = generateRandomPhoto();

    // console.log('before',setOfPhotos);

    // Do-While loop  solution: for the condition of displying new set of photos each time

    //while loop solution:  for the condition of displying new set of photos each time
    // while (firstIndex === secondIndex ||firstIndex === thirdIndex || secondIndex === thirdIndex || setOfPhotos.includes (firstIndex) ||setOfPhotos.includes (secondIndex) || setOfPhotos.includes (thirdIndex)){
    //     firstIndex = generateRandomPhoto();
    //     secondIndex = generateRandomPhoto();
    //     thirdIndex = generateRandomPhoto();

    // }

    do {
        firstIndex = generateRandomPhoto();
        secondIndex = generateRandomPhoto();
        thirdIndex = generateRandomPhoto();

    } while (firstIndex === secondIndex || firstIndex === thirdIndex || secondIndex === thirdIndex || setOfPhotos.includes(firstIndex) || setOfPhotos.includes(secondIndex) || setOfPhotos.includes(thirdIndex));





    setOfPhotos = [];

    setOfPhotos.push(firstIndex);
    setOfPhotos.push(secondIndex);
    setOfPhotos.push(thirdIndex);

    // Another way to solve without pushing:
    // setOfPhotos = [firstIndex,secondIndex,thirdIndex]
    // console.log('after',setOfPhotos);



    // add the scource from the object constructor to the src attribute
    firstImage.src = Catalog.allObjects[firstIndex].source;
    secondImage.src = Catalog.allObjects[secondIndex].source;
    thirdImage.src = Catalog.allObjects[thirdIndex].source;

    // add the shown value for each image that appear
    // firstImage.textContent = 
    Catalog.allObjects[firstIndex].shown++;
    // secondImage.textContent = 
    Catalog.allObjects[secondIndex].shown++;
    // thirdImage.textContent = 
    Catalog.allObjects[thirdIndex].shown++;
}


// local storage functions:

function turnString (){

    let imageStorage = JSON.stringify(Catalog.allObjects)

    // console.log(Catalog.allObjects);

    // console.log(imageStorage);

    localStorage.setItem('images', imageStorage);
    
    
}

function getImage(){

    let callImage = localStorage.getItem('images');

    console.log('getting image', callImage );

    let displayImage = JSON.parse(callImage);
    console.log(displayImage);

    if (displayImage !== null) {
        Catalog.allObjects= displayImage;
    }




}


// rendering function for images:
render();



let div = document.getElementById('imagesDiv');

div.addEventListener('click', pickPhoto);

function pickPhoto(event) {

    counter++;
    console.log(counter);

    if (counter <= attempts) {

        if (event.target.id === 'first') {
            Catalog.allObjects[firstIndex].votes++;
        } else if (event.target.id === 'second') {
            Catalog.allObjects[secondIndex].votes++;
        } else if (event.target.id === 'third') {
            Catalog.allObjects[thirdIndex].votes++;

        } else {
            alert('Please SELECT one of the photos');
            counter--;
        }

        render();




    } else {

        // local storage functions

              

        turnString();
        // getImage();

        

        

        div.removeEventListener('click', pickPhoto);

        // adding the data to chart (in the Arrays)

        for (let i = 0; i < Catalog.allObjects.length; i++) {
            objectsNameArray.push(Catalog.allObjects[i].name);
            votesArray.push(Catalog.allObjects[i].votes);
            shownArray.push(Catalog.allObjects[i].shown);

        }

        // calling the chart function

        chart();


        // showing the button and create its eventListener

        let viewResult = document.getElementById('viewResult')

        viewResult.addEventListener('click', showResult);
        viewResult.hidden = false;

        // div.appendChild(viewResult);

        let list = document.getElementById('list');
        let header = document.createElement('h4');
        list.appendChild(header);
        header.textContent = 'Results'
        let photosList;


        function showResult() {



            for (let i = 0; i < Catalog.allObjects.length; i++) {

                photosList = document.createElement('li');
                list.appendChild(photosList);

                photosList.textContent = `${Catalog.allObjects[i].name} had ${Catalog.allObjects[i].votes} votes and was seen ${Catalog.allObjects[i].shown} times`
            }
            viewResult.removeEventListener('click', showResult);
        }


    }
}

// chart.js
function chart() {
    let ctx = document.getElementById('myChart').getContext('2d');

    let chart = new Chart(ctx, {
        // what type is the chart
        type: 'bar',

        //  the data for showing
        data: {
            //  for the names
            labels: objectsNameArray,

            datasets: [
                {
                    label: 'Objects Votes',
                    data: votesArray,
                    backgroundColor: [
                        'rgb(251, 93, 76)',
                    ],

                    borderWidth: 1
                },

                {
                    label: 'Object Shown',
                    data: shownArray,
                    backgroundColor: [
                        'rgb(96, 113, 163)',
                    ],

                    borderWidth: 1
                }

            ]
        },
        options: {}
    });

}

// turnString();
getImage();