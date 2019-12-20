class Book{
    constructor(title, author, isbn){
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

class Storage{
    static getBooks(){
        let books;
        if(localStorage.getItem('books') === null){
            books = [];
        }else{
            books = JSON.parse(localStorage.getItem('books'));
        }
        return books;
    }
    static addBook(book){
        const books = Storage.getBooks();
        books.push(book);

        localStorage.setItem('books', JSON.stringify(books));
    }
    static removeBook(isbn){
        const books = Storage.getBooks();
        books.forEach((book,index)=>{
            if(book.isbn === isbn){
                books.splice(index,1);
            }
        });
        localStorage.setItem('books',JSON.stringify(books));
    }
}

class UI{
    static displayBooks(){
        
     const books = Storage.getBooks();
     
     books.forEach((book)=>UI.addBookToList(book));
    }
    static addBookToList(book1){
        const list = document.querySelector('#book-list');

        const row = document.createElement('tr');
        row.innerHTML = `
           <td>${book1.title}</td>
           <td>${book1.author}</td>
           <td>${book1.isbn}</td> 
           <td><a href= "#" class = "btn btn-danger btn-sm delete"> X </a></td>
        `;
        list.appendChild(row);

    }

    static deleteBook(del){
        if(del.classList.contains('delete')){
            del.parentElement.parentElement.remove();
        }
    }

    static showAlert(message, className){
        const div = document.createElement('div');
        div.className = `alert alert-${className}`;
        div.appendChild(document.createTextNode(message));
        const container  = document.querySelector('.container');
        const form= document.querySelector('#book-form');
        container.insertBefore(div, form);

        setTimeout(()=>document.querySelector('.alert').remove(),3000);
    }

    static clearFields(){
        const title = document.querySelector('#title').value='';
        const author = document.querySelector('#author').value='';
        const isbn = document.querySelector('#isbn').value='';
    }
}
document.addEventListener('DOMContentLoaded', UI.displayBooks);

document.querySelector('#book-form').addEventListener('submit',(e)=>{
    e.preventDefault();

    const title = document.querySelector('#title').value;
    const author = document.querySelector('#author').value;
    const isbn = document.querySelector('#isbn').value;

    if(title === '' || author === '' || isbn ===''){
        UI.showAlert('Please fill in all fields', 'danger');
    }
    else{
        const book = new Book(title, author,isbn);
    
        UI.addBookToList(book);

        Storage.addBook(book);

        UI.showAlert('Book Added', 'success');

        UI.clearFields();
    }

  
    
});

document.querySelector('#book-list').addEventListener('click',(e)=>{
    console.log(e.target);
    UI.deleteBook(e.target);

    Storage.removeBook(e.target.parentElement.previousElementSibling.textContent);

    UI.showAlert('Book Removed', 'info');
});