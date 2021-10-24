function findAccountById(accounts, id) {
  return accounts.find((account) => account.id === id);
}

function sortAccountsByLastName(accounts) {
  let lastNames = accounts.sort((a, b) => a.name.last.toLowerCase() < b.name.last.toLowerCase() ? -1 : 1);
  return lastNames;
}

function getTotalNumberOfBorrows(account, books) {
  let result = [];
  for (let i = 0; i < books.length; i++) {
    for (let n = 0; n < books[i].borrows.length; n++) {
      if (books[i].borrows[n].id === account.id) {
        result.push(books[i].borrows[n])
      }
    }
  }
  return result.length;
}

function getBooksPossessedByAccount(account, books, authors) {
  let booksTaken = [];
    books.forEach(book=>{
      if (book.borrows.find(item=>item.id === account.id && !item.returned)) {
        booksTaken.push(book);
      }
    })
    booksTaken.forEach(book=>{
      let anAuthor = authors.find(person => person.id === book.authorId);
      book['author'] = anAuthor;
    })
    return booksTaken;
}

module.exports = {
  findAccountById,
  sortAccountsByLastName,
  getTotalNumberOfBorrows,
  getBooksPossessedByAccount,
};
