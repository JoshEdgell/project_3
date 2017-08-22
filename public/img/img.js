

const imgArray = [
  'img/0-01.png',
  'img/0-02.png',
  'img/0-03.png',
  'img/0-04.png',
  'img/0-05.png',
  'img/0-06.png',
  'img/0-07.png',
  'img/0-08.png',
  'img/0-09.png',
  'img/0-10.png',
  'img/0-11.png',
  'img/0-12.png',
  'img/0-13.png',
  'img/0-14.png',
  'img/0-15.png',
  'img/0-16.png',
  'img/0-17.png',
  'img/0-18.png',
  'img/0-19.png',
  'img/0-20.png',
  'img/0-21.png',
];


// console.log(imgArray);


const addImg = ()=>{

  for (let i = 0; i < imgArray.length; i++){
    let $img = imgArray[Math.floor(Math.random() * imgArray.length)]
    console.log($img);
    // $img.css('width', '300px')
    // $img.css('height', 'auto')
    // $img.css('position', 'absolute')

    let container =  $('img-container');
  }
}

addImg();


//   $('img').append($img)
// }
