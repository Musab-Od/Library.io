const addBookButton = document.querySelector(".add-btn")
const addBookModal = document.getElementById("addBookModal")
const overlay = document.querySelector(".overlay")
const pageBody = document.body
const addBookForm = document.getElementById("addBookForm")
const errorMsg = document.querySelector(".error-msg")


const myLibrary = [];

const Book = class {
    constructor (title, author, pages, read) {
        this.title = title
        this.author = author
        this.pages = pages
        this.read = read
    }
}

function addBookToLibrary(obj) {
    myLibrary.push(obj)
}

addBookButton.addEventListener("click", () => {
    addBookModal.classList.add("active")
    overlay.classList.add("active")
})

pageBody.addEventListener("click", (event) => {
    if (addBookModal.classList.contains('active') && !addBookModal.contains(event.target)) {
        addBookModal.classList.remove('active');
        overlay.classList.remove('active');
    }
})

addBookButton.addEventListener('click', (event) => {
    event.stopPropagation();
});

function displayBook() {
    const table = document.getElementById("bookTable").getElementsByTagName("tbody")[0]
    table.innerHTML = '';

    myLibrary.forEach((book, index) => {
        const newRow = table.insertRow();
        newRow.setAttribute('data-index', index);

        newRow.insertCell(0).textContent = book.title;
        newRow.insertCell(1).textContent = book.author;
        newRow.insertCell(2).textContent = book.pages;
        
        const readCell = newRow.insertCell(3);
        readCell.textContent = book.read ? 'Yes' : 'Not Yet';
        readCell.className = book.read ? 'read-yes' : 'read-no';

        const actionsCell = newRow.insertCell(4);

        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = '<i class="fa-solid fa-trash"></i>';
        deleteButton.addEventListener('click', () => {
            myLibrary.splice(index, 1);
            displayBook()
        });
        actionsCell.appendChild(deleteButton);

        const readButton = document.createElement("button");
        readButton.innerHTML = '<i class="fa-solid fa-square-check"></i>';
        readButton.addEventListener('click', () => {
            book.read = !book.read;
            displayBook();
        });
        actionsCell.appendChild(readButton);
    });
}

addBookForm.addEventListener("submit", (event) => {
    event.preventDefault()

    const title = document.getElementById("title").value
    const author = document.getElementById("author").value
    const pages = document.getElementById("pages").value
    const isRead = document.getElementById("isRead").checked

    for (let i = 0; i < myLibrary.length; i++) {
        if (myLibrary[i].title === title) {
            errorMsg.classList.add("active");
            return;
        }
    }
    const newBook = new Book(title, author, pages, isRead)
    addBookToLibrary(newBook)
    displayBook();

    addBookForm.reset()

    addBookModal.classList.remove("active");
    overlay.classList.remove("active");

});
