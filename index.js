'use strict';

const deleteBtn = document.querySelector('.delete-post');
const time = document.querySelector('.time-stamp');
const header = document.querySelector('.item-header');
const txt = document.querySelector('.item-txt');
const container = document.querySelector('.container');
const btn = document.querySelector('.btn-style');
const form = document.querySelector('.form');
const description = document.querySelector('.input-field');
const content = document.querySelector('.textarea-field');
const submitBtn = document.querySelector('.submit');
const cancelBtn = document.querySelector('.cancel');
const here = document.querySelector('.here');

class Note {
  date = new Date();
  id = (Date.now() + '').slice(-10)
  constructor(header, txtContent) {
    this.header = header;
    this.txtContent = txtContent;
    this.timeStamp = this.setDate();
  }
   setDate() {
    return new Intl.DateTimeFormat('fi-FI', {
      day: 'numeric',
      month: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    }).format(this.date);
   }
};

class App {
  #notesArr = [];
  constructor(){
    btn.addEventListener('click', this.#openForm.bind(this));
    submitBtn.addEventListener('click', this.#submitForm.bind(this));
    cancelBtn.addEventListener('click', this.#cancelFrom.bind(this));
    here.addEventListener('click', this.deletePost.bind(this));
    this.#getLocalStorage();
  }

  #openForm() {
    form.classList.toggle('hide')
  }

  #submitForm() {
    const headerV = description.value + '';
    const contentV = content.value + '';

    if(headerV === '' || contentV === '') return

    if(typeof headerV !== 'string' || typeof contentV !== 'string') return
    
    const note = new Note(headerV, contentV);
    this.#notesArr.push(note);

    this.#setLocalStorage();

    this.#renderNote(note);

    description.value =
    content.value = '';
  }

  #renderNote(note) {
  const formattedText = note.txtContent.replace(/\n/g, '<br>')

    const html = `
      <div class="flex-txt" data-id="${note.id}">
      <div class="item">
        <div class="flex-txt space">
          <p>${note.timeStamp}</p>
          <p class="delete-post" id="${note.id}">❌</p>
        </div>
        <div class="flex-txt flex-txt--dir">
          <h2 class="item-header">${note.header}</h2>
          <p class="item-txt">${formattedText}</p>
        </div>  
      </div>
    `
    here.insertAdjacentHTML('afterbegin', html);
  }

  #renderPage() {
    here.innerHTML = '';
    this.#notesArr.forEach(e => this.#renderNote(e));
  }

  #cancelFrom() {
    form.classList.add('hide')
  }

  #setLocalStorage() {
    localStorage.setItem('note', JSON.stringify(this.#notesArr));
  }

  deletePost(e){
    if(!e.target.classList.contains('delete-post')) return;

    const noteId = (e.target.id) + '';

    this.#notesArr = this.#notesArr.filter(note => note.id !== noteId);

    this.#setLocalStorage();
    this.#renderPage();
  }

  #getLocalStorage() {
    const data = JSON.parse(localStorage.getItem('note'));

    if(!data) return

    this.#notesArr = data;

    this.#renderPage();
  }

  reset(){
    localStorage.removeItem('note');
    location.reload();
  }

}

const app = new App();