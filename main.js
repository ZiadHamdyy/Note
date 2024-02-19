const create = document.querySelector(".button");
const notes = document.querySelector('.notes-ul');
const textDiv = document.querySelector('.text');
let p = document.querySelector('.note-box');
const save = document.querySelector('.done-img');
let curNoteId;
let curText;
let text;
create.onclick = function () {
    /* const NoteAttrb = {
        id: Date.now(),
        text: textDiv.textContent.trim()
    }; */
    id = Date.now();
    curNoteId = id;
    p.contentEditable = 'true';
    addNote(id);
    /* addTextBox(NoteAttrb); */
}

notes.addEventListener('click', (e)=> {
    var target = e.target;
    if (target.classList.contains('del')) {
        /* delNote(e);
        delTextBox(e); */
        delNoteAndTextBox(e, curNoteId);
    }
});

save.addEventListener('click', (e) =>{
    text = textDiv.textContent.trim();
    if (text){
        addToLocalStorage(curNoteId, text);
        p.textContent = '';
        displayNotes();
    }
    else{
        console.log('No text');
    }
});

function addNote(id){
    var li = document.createElement('li');
    li.setAttribute('note_id', id);
    var div1 = document.createElement('div');
    div1.className = 'card';
    var div2 = document.createElement('div');
    div2.className = 'card2';
    var span = document.createElement('span');
    span.appendChild(document.createTextNode('Note'));
    var img = document.createElement('img');
    img.src="icons/icons8-trash-100.png";
    img.className = 'del';
    div2.appendChild(span);
    div2.appendChild(img);
    div1.appendChild(div2);
    li.appendChild(div1);
    notes.appendChild(li);
    li.addEventListener('click', function() {
        console.log(1);
    });
}


function delNoteAndTextBox(e, curNoteId) {
    var li = e.target.closest('li');
    var noteId = li.getAttribute('note_id');

    if (li) {
        notes.removeChild(li);
        window.localStorage.removeItem(curNoteId);
    }
}
function addToLocalStorage(id, text){
    window.localStorage.setItem(id, text);
}

function displayNotes() {
    // Clear the existing notes
    notes.innerHTML = '';

    // Fetch the keys from local storage
    const noteKeys = Object.keys(localStorage);

    // Iterate over keys and create list items
    noteKeys.forEach(id => {
        var li = document.createElement('li');
        var div1 = document.createElement('div');
        div1.className = 'card';
        var div2 = document.createElement('div');
        div2.className = 'card2';
        var span = document.createElement('span');
        span.appendChild(document.createTextNode('Note'));
        var img = document.createElement('img');
        img.src = "icons/icons8-trash-100.png";
        img.className = 'del';
        div2.appendChild(span);
        div2.appendChild(img);
        div1.appendChild(div2);
        li.appendChild(div1);
        notes.appendChild(li);
        li.setAttribute('note_id', id);
        li.addEventListener('click', function() {
            curNoteId = li.getAttribute('note_id');
            displayNoteContent(curNoteId);
        });
    });
}
function displayNoteContent(curNoteId){
    text = localStorage.getItem(curNoteId);
    textDiv.textContent = text;
    p.contentEditable = 'true';
}
displayNotes();