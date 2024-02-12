document.addEventListener('DOMContentLoaded', function() {
    var create = document.getElementById('btn');
    var notes = document.getElementById('notes');

    create.addEventListener('click', addNote);

    function addNote(e) {
        e.preventDefault();

        /* create li */
        var li = document.createElement('li');
        li.className = 'note';
        li.appendChild(document.createTextNode('New Note'));

        /* create delete button */
        var delbtn = document.createElement('button');
        delbtn.className = 'delete-btn';
        delbtn.id = 'img';
        delbtn.appendChild(document.createTextNode('Delete Note'));
        delbtn.addEventListener('click', removeNode);

        /* add the delete button in the li */
        li.appendChild(delbtn);

        /* add the li in the notes */
        notes.appendChild(li);
    }

    function removeNode(e){
        e.preventDefault();

        if (confirm('Are You Sure?')){
            var li = e.target.parentNode;
            notes.removeChild(li);
        }
    }
});