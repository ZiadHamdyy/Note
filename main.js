const create = document.querySelector(".button");
const notes = document.querySelector('.notes-ul');
const textDiv = document.querySelector('.text');
const p = document.querySelector('.note-box');
const paragraph = document.getElementById('text');
const save = document.querySelector('.done-img');
const size = document.getElementById('dropDownSize');
const font = document.getElementById('dropDownFont');
const align = document.getElementById('dropDownalign');
const color = document.getElementById('dropDownacolor');
const body = document.querySelector('body');
const darkMode = document.querySelector('.switch');
const doneimg = document.querySelector('.done-img');


let curNoteId;
let curText;
let text;
let dark = false;

darkMode.addEventListener('change', (e)=>{
    dark = e.target.checked;
    console.log(e.target.checked);
    if (dark){
        body.classList.add('dark');
        doneimg.src = 'icons/white-done.png';

    }else{
        body.classList.remove('dark');
        doneimg.src = 'icons/black-done.png';
    }
})

size.addEventListener('click', ()=>{
        sizeValue = size.value;
        paragraph.style.fontSize = sizeValue;
})
font.addEventListener('click', ()=>{
    fontValue = font.value;
    paragraph.style.fontFamily = fontValue;
})
align.addEventListener('click', ()=>{
    alignValue = align.value;
    paragraph.style.textAlign = alignValue;
})
color.addEventListener('click', (e)=>{
    colorValue = color.value;
    paragraph.style.color = colorValue;
})

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
        if (confirm('Are You Sure?')){
            delNoteAndTextBox(e, curNoteId);
            p.contentEditable = 'false';
        }
    }
});

save.addEventListener('click', () =>{
    text = paragraph.textContent.trim();
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