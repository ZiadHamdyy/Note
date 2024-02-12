document.addEventListener('DOMContentLoaded', function() {
    var create = document.getElementById('btn');
    var notes = document.getElementById('notes');
    var textDev = document.getElementById('text-dev');

    create.addEventListener('click', addNote);

    function addNote(e) {
        e.preventDefault();

        /* create li */
        var li = document.createElement('li');
        li.className = 'note';
        li.appendChild(document.createTextNode('New Note'));

        /* create delete button */
        var delbtn = document.createElement('img');
        delbtn.src = "icons/trash-xmark.png";
        delbtn.className = 'delete-btn';
        delbtn.id = 'delete-btn';
        /* delbtn.appendChild(document.createTextNode('Delete Note')); */
        delbtn.addEventListener('click', removeNode);

        /* add the delete button in the li */
        li.appendChild(delbtn);

        var noteBox = document.createElement('p');
        noteBox.contentEditable = 'true';
        noteBox.className = 'note-box';
        noteBox.id="text";
        console.log(noteBox);

        textDev.appendChild(noteBox);

        /* add the li in the notes */
        notes.appendChild(li); 
        li.noteBox = noteBox;       
    }

    function removeNode(e){
        e.preventDefault();

        if (confirm('Are You Sure?')){
            var li = e.target.parentNode;
            var noteBox = li.noteBox;
            if (noteBox) {
                textDev.removeChild(noteBox);
            }
            notes.removeChild(li);
        }
    }
});