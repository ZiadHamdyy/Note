const create = document.querySelector(".button");
const notes = document.querySelector('.notes-ul');
const textDiv = document.querySelector('.text');
let p = document.querySelector('.note-box');
const save = document.querySelector('.done-img');
let curNoteId;
let curText;
let text;

create.onclick = function () {
    id = Date.now();
    curNoteId = id;
    p.contentEditable = 'true';
    p.textContent = '';
    addNote(id);
}

notes.addEventListener('click', (e)=> {
    var target = e.target;
    if (target.classList.contains('del')) {
        delNoteAndTextBox(e, curNoteId);
    }
});

save.addEventListener('click', () =>{
    text = textDiv.textContent.trim();
    if (text){
        addToLocalStorage(curNoteId, text);
        displayNotes();
    }
    else{
        console.log('No text');
    }
});

function addNote(id){
    var li = document.createElement('li');
    var div1 = document.createElement('div');
    div1.className = 'card';
    var div2 = document.createElement('div');
    div2.className = 'card2';
    var span = document.createElement('span');
    span.className= "NoteName";
    var text = localStorage.getItem(id);
    span.textContent = text;
    var img = document.createElement('img');
    img.src="icons/icons8-trash-100.png";
    img.className = 'del';
    div2.appendChild(span);
    div2.appendChild(img);
    div1.appendChild(div2);
    li.appendChild(div1);
    notes.appendChild(li);
    li.setAttribute('note_id', id);
    li.addEventListener('click', function() {
        console.log(1);
        curNoteId = li.getAttribute('note_id');
        displayNoteContent(curNoteId);
        p.contentEditable = 'true';
    });
}

function displayNotes() {
    notes.innerHTML = '';
    const noteKeys = Object.keys(localStorage);
    noteKeys.reverse().forEach(id => {
        addNote(id);
    });
}

function delNoteAndTextBox(e, curNoteId) {
    var li = e.target.closest('li');
    var noteId = li.getAttribute('note_id');

    if (li) {
        notes.removeChild(li);
        window.localStorage.removeItem(curNoteId);
        p.textContent = '';
    }
}
function addToLocalStorage(id, text){
    window.localStorage.setItem(id, text);
}


function displayNoteContent(curNoteId){
    text = localStorage.getItem(curNoteId);
    p.textContent = text;
}
displayNotes();