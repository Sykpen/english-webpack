import '../css/style.css';

const cards = require('./moduleCards.js'); 

const main  = document.getElementById('main');
const toggler = document.getElementById('toggler');
let isOpen = false;
const page_audio_arr = [];
let needed_information = {};
let first_time = true;
let total_mistakes = 0;
let number_of_tries = 0;
const victory = './audio/correct.mp3';
const lose = './audio/error.mp3';
const score_area = document.getElementById('score_area');
const nav_icon = document.getElementById('nav-icon4');
const hidden_menu = document.getElementById('hidden_menu');

const button_for_game_start =  document.createElement('button');
  button_for_game_start.classList.add('button_for_game_start');
  button_for_game_start.id = 'button_for_game_start';
  button_for_game_start.innerText = 'START GAME';

const button_area = document.getElementById('button_area');

const new_obj = {
  first_card: cards[0],
  second_card : cards[1],
  third_card : cards[2],
  fourth_card : cards[3],
  fifth_card : cards[4],
  sixth_card : cards[5],
  seventh_card : cards[6],
  eighth_card : cards[7]
}

function clean_game_zone(){
  main.innerHTML = '';
  button_area.innerHTML = '';
  score_area.innerHTML = '';
}

function reload_page(){
  location.reload()
}

function build_new_main(arr, game_mode){
  if(game_mode === true){
    clean_game_zone();
    arr.map((el) =>{
        main.innerHTML += `
        <div class="main_item" id="${el.word}" data-audio="${el.audioSrc}">
          <img src="${el.image}" class="big_img full_picture">
        </div>
        `
    })
    button_area.appendChild(button_for_game_start);
    button_for_game_start.classList.remove('hide_button');
    toggler.classList.remove('unclickable');
    main.classList.add('unclickable');
  }
  else{
    clean_game_zone();
    arr.map((el) =>{
        main.innerHTML += `
        <div class="main_item">
          <div class="flip-card-front" data-audio="${el.audioSrc}" id="${el.word}">
            <img src="${el.image}" class="big_img">
            <p class="text_with_big_img">${el.word}</p>
            <img src="img/try2.jpg" class="rotate" id="rotate">
          </div>
          <div class="flip-card-back">
            <img src="${el.image}" class="big_img">
            <p class="text_with_big_img">${el.translation}</p>
          </div>
        </div>
        `
    });
    button_for_game_start.classList.add('hide_button');
    toggler.classList.remove('unclickable');
    main.classList.remove('unclickable');
    }
}

function playAudio(url) {
  new Audio(url).play();
}

function build_new_page() {
  const targetID = event.target.closest('div').id;
  if(new_obj[targetID]){
    build_new_main(new_obj[targetID])
    window.global_var = new_obj[targetID];
    window.game_mode = false;
  } 
}

function play_mode_activity_preparations(){
  if(first_time === true){
    for (let i = 0; i < window.global_var.length; i += 1){
      page_audio_arr.push(window.global_var[i].audioSrc)
    }
    first_time = false;
  }

  const item_from_page_audio_arr = page_audio_arr[Math.floor(Math.random() * page_audio_arr.length)];
  
  const random_audio = item_from_page_audio_arr;

  playAudio(random_audio);

  needed_information = {
    needed_audio: random_audio
  }
}

// function create_repeat_button(){
//   const repeat_button = `
//   <button><img src="./img/new_repeat.jpg" class="repeat" id="repeat_button"></button>
//   `
//   button_area.innerHTML += repeat_button;
// }



function next_round(){
  const already_used_el = page_audio_arr.findIndex(item => item === needed_information.needed_audio)
  page_audio_arr.splice(already_used_el, 1);
  if (page_audio_arr.length === 0 && number_of_tries === 8){
    playAudio(victory);
    main.innerHTML = '';
    main.innerHTML = `
    <div class="final_page_big_text">Чистая победа - </div>
    <div><img src="./img/success.jpg"></div>
    `;
    setTimeout(reload_page, 2450);
  }
  if(page_audio_arr.length === 0 && number_of_tries >= 9){
    main.innerHTML = '';
    main.innerHTML = `
    <p class="final_page_big_text">Ты молодец. Тебе понадобилось ${number_of_tries} попыток. Ты совершил ${total_mistakes} ошибок/ку</p>
    <div><img src="./img/success.jpg"></div>
    `;
    setTimeout(reload_page, 2450);
  }
  first_time = false;
  play_mode_activity_preparations();
}

function repeat(){
  playAudio(needed_information.needed_audio);
}

function change_button(){
  button_for_game_start.classList.add('hide_button');
  const repeat_button = `
  <button><img src="./img/new_repeat.jpg" class="repeat" id="repeat_button"></button>
  `
  button_area.innerHTML += repeat_button;
  // create_repeat_button();
  repeat_button.addEventListener('click',repeat )
}

function create_full_star(){
  const full_star = `
  <img src="./img/full_star.png" class="full">
  `;
  score_area.innerHTML += full_star;
}

function create_empty_star(){
  const empty_star = `
  <img src="./img/star.png" class="empty">
  `
  score_area.innerHTML += empty_star;
}

function hide_side_menu(){
  nav_icon.classList.toggle('open');
  hidden_menu.classList.toggle('dark_side_hidden');
}

toggler.addEventListener('click', () =>{
  if (window.game_mode === true){
    window.game_mode = false;
    build_new_main(window.global_var, window.game_mode);
  }
  else{
    window.game_mode = true;
    build_new_main(window.global_var, window.game_mode);
  }
});

nav_icon.addEventListener('click', () => {
  if (isOpen === true) {
    nav_icon.classList.toggle('open');
    hidden_menu.classList.toggle('dark_side_hidden');
    isOpen = false;
    return;
  }
  nav_icon.classList.toggle('open');
  hidden_menu.classList.toggle('dark_side_hidden');
  isOpen = true;
});

main.addEventListener('click', () =>{
  build_new_page();
});

main.addEventListener('click', () =>{
  const element = event.target.closest('div');
  const picked_el = event.target;
  if(window.game_mode === true){
    if(element.id !== 'main_wrapper'){
      if (element.dataset.audio === needed_information.needed_audio){
        create_full_star();
        element.classList.add('choosen');
        playAudio(victory);
        number_of_tries += 1;
        setTimeout(next_round, 500);
      }
      if (element.dataset.audio !== needed_information.needed_audio){
        create_empty_star();
        total_mistakes += 1;
        number_of_tries += 1;
        playAudio(lose);
      }
    }
  }
  if(window.game_mode === false){
    playAudio(element.dataset.audio);

    if(picked_el.id === 'rotate'){
      element.parentElement.classList.toggle('rotation');
      element.parentElement.addEventListener('mouseleave', () =>{
        element.parentElement.classList.remove('rotation');
      })
    }
  }
});

button_for_game_start.addEventListener('click', () =>{
  play_mode_activity_preparations();
  main.classList.remove('unclickable');
  change_button();
});

hidden_menu.addEventListener('click', () =>{
  const targetID = event.target.closest('div').id;
    if(new_obj[targetID]){
      build_new_main(new_obj[targetID])
      window.global_var = new_obj[targetID];
      window.game_mode = false;
      hidden_menu.querySelectorAll('div').forEach(el => el.classList.remove('active'));
      document.getElementById(`${targetID}`).classList.add('active');
      hide_side_menu();
      isOpen = false;
    }
    if(targetID === 'main_menu'){
      reload_page()
    }
});

main.addEventListener('click', () =>{
  if(isOpen === true && event.target.id !== 'nav-icon4' && event.target.id !== 'hidden_menu'){
    nav_icon.classList.toggle('open');
    hidden_menu.classList.toggle('dark_side_hidden');
    isOpen = false;
    }
});
