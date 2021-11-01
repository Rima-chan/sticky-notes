const addButton = document.querySelector('#add_button');
const closeButton = document.querySelector('#close_button');
const checkButton = document.querySelector('#check_button');
const modal = document.querySelector('.add_note_modal');
const notes_wrapper = document.querySelector('#notes_wrapper');

const random_degre = [ 'rotate(3deg)', 'rotate(-3deg)', 'rotate(5deg)', 'rotate(-5deg)', 'rotate(8deg)', 'rotate(-8deg)'];
const random_color = ['#f3e045', '#e871a7', '#79db8c', '#41bbff', '#b886e7'];
let index = 0;
let note_list = getNoteList();


document.addEventListener('DOMContentLoaded', () => {
    note_list.forEach(note => displayNote(note.text, note.id));
})

addButton.addEventListener('click', showModal);
closeButton.addEventListener('click', closeModal);
checkButton.addEventListener('click', addNote);
notes_wrapper.addEventListener('click', (e) => {
    console.log(e.target);
    if (e.target.dataset.button && e.target.dataset.button === 'trashBtn') {
        const key = e.target.closest('div').dataset.key;
        const note = document.querySelector(`[data-key="${key}"]`);
        note_list = note_list.filter(element => element.id != key);
        saveNoteList(note_list);
        notes_wrapper.removeChild(note);
    }
})

function showModal(e) {
    modal.classList.add('display_modal');
    document.querySelector('body').classList.add('add_overflow');
}

function closeModal() {
    modal.classList.remove('display_modal');
    document.querySelector('body').classList.remove('add_overflow');
}

function addNote() {
    const input = document.querySelector('#note_input');
    if (!input.value) {
        return;
    } else {
        const newNote = {
            id: Date.now(),
            text: input?.value, 
        };
        note_list.push(newNote);
        saveNoteList(note_list);
        displayNote(newNote.text, newNote.id);
        input.value = '';
        closeModal();
    }
}

function displayNote(text, id) {
    const newCard = document.createElement('div');
    const trashButton = document.createElement('button');
    const note = document.createElement('p');
    newCard.className = 'notes_wrapper';
    trashButton.className = 'trash_button';
    newCard.className = 'note_card';
    trashButton.innerHTML = '<i class="fas fa-trash-alt" data-button="trashBtn"></i>';
    note.innerText = text;
    newCard.appendChild(note);
    newCard.appendChild(trashButton);
    if (index > random_color.length - 1) {
        index = 0;
    }
    newCard.setAttribute('style', `background-color: ${random_color[index++]}; transform:${random_degre[Math.floor(Math.random()  * random_degre.length)]};`);
    newCard.setAttribute('data-key', `${id}`);
    notes_wrapper.appendChild(newCard);
}

function saveNoteList(list) {
    localStorage.setItem('notes', JSON.stringify(list));
}

function getNoteList() {
    const list = localStorage.getItem('notes');
    if (!list) {
        return [];
    } else {
        return JSON.parse(list);
    }
}