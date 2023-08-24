const btn = document.querySelector("#btn")
const main = document.querySelector("#main")
const deploy = document.querySelector("#deploy")


const saveNotes = () => {
    const notes = document.querySelectorAll(".note textarea") //pick all the text from note class - textarea
    console.log(notes)
    const data = []
    notes.forEach(
        (note) => {
            data.push(note.value)  //arrow functions are also one line functions (many dont know.val)
        }
    )
    console.log(data)
    //for storing data
    if (data.length === 0){
        localStorage.removeItem("notes")
    }
    else{
        localStorage.setItem("notes", JSON.stringify(data))
    }
    
}


btn.addEventListener(
    "click",
    function(){
        addNote()
    }
)

//<div class="note">    
//    <div class="tool">
//      <i class="fa-solid fa-floppy-disk"></i>
//      <i class="fa-solid fa-delete-left"></i>
//    </div>
//    <textarea></textarea>
//</div> 


const addNote = (text = "") =>{
                                                          //creation of DOM using html code inside javascript
    const note = document.createElement("div")
    note.classList.add("note")
    note.innerHTML = `
    <div class="tool">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-delete-left"></i>
    </div>
    <textarea>${text}</textarea>
    `
    note.querySelector(".trash").addEventListener(
        "click",
        function(){
            note.remove()
            saveNotes()
        }    
    )

    note.querySelector(".save").addEventListener(
        "click",
        function(){
            saveNotes()
        }    
    )
    note.querySelector("textarea").addEventListener(
        "focusout",
        function(){
            saveNotes()
        }
    )
    main.appendChild(note)
    saveNotes()
}


//self calling function is defined in ()
(
    function() {
        const lsnotes = JSON.parse(localStorage.getItem("notes")) //JSON.parse is done coz we stringfied it before
        if (lsnotes === null){
            addNote()
        }else{
            lsnotes.forEach(
                (lsnote) => {
                    addNote(lsnote)
                }
            )
        }
    }
)()