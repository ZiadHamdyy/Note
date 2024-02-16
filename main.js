document.addEventListener("DOMContentLoaded", function() {
    var create = document.querySelector(".button");
    var notes = document.querySelector('.notes-ul');
    var textDiv = document.querySelector('.text');

    create.onclick = function () {
        addNote();
        addTextBox();
    }

    notes.addEventListener('click', function(e) {
        var target = e.target;
        if (target.classList.contains('del')) {
            delNote(e);
            delTextBox(e);
        }
    });


    function addNote(){
        var li = document.createElement('li');
        var div1 = document.createElement('div');
        div1.className = 'card';
        var div2 = document.createElement('div');
        div2.className = 'card2';
        var span = document.createElement('span');
        span.appendChild(document.createTextNode('Node'));
        var img = document.createElement('img');
        img.src="icons/icons8-trash-100.png";
        img.className = 'del';

        div2.appendChild(span);
        div2.appendChild(img);
        div1.appendChild(div2);
        li.appendChild(div1);
        notes.appendChild(li);
    }
    function addTextBox(){
        var p = document.createElement('p');
        p.contentEditable = 'true';
        p.className = 'note-box';
        p.id = 'text';
        textDiv.appendChild(p);
    }
    function delNote(e) {
        var li = e.target.closest('li');
    
        if (li) {
            notes.removeChild(li);
        }
    }
    function delTextBox(e){
        var existingP = document.querySelector('.text p');
        if (existingP) {
            existingP.remove();
        }
    }
});