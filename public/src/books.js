const { findAccountById } = require("./accounts");

function findAuthorById(authors, id) {
  return authors.find((author) => author.id === id);
}

function findBookById(books, id) {
  return books.find((book) => book.id === id);
}

function partitionBooksByBorrowedStatus(books) {
  let result = [];
  let borrowedTrue = [];
  let borrowedFalse = [];
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows[0].returned === true) {
      borrowedTrue.push(books[i]);
    }
    else {
      borrowedFalse.push(books[i]);
    }
  }
  result.push(borrowedFalse, borrowedTrue);
  return result;
}


/*
It should return an array of ten or fewer account objects that 
represents the accounts given by the IDs in the provided book's 
`borrows` array. However, each account object should include the 
`returned` entry from the corresponding transaction object in the `borrows` array.
*/

function getBorrowersForBook(book, accounts) {
   // `borrows` is a list of transactions, each of type { id: string, returned: true }
  const { borrows } = book;

  const borrowers = borrows.map(({ id, returned })=> {
    // find account that matches the borrower's ID
    //THIS IS MY HELPER FUNCTION------------------
    const account = findAccountById(accounts, id);

    // return the matching account, along with the `returned` info
    return {
      ...account,
      returned,
    };
  });

  return borrowers
    .sort((borrowerA, borrowerB) => {
      const companyA = borrowerA.company;
      const companyB = borrowerB.company;
      return companyA.localeCompare(companyB);
    })
    .slice(0, 10);
}

module.exports = {
  findAuthorById,
  findBookById,
  partitionBooksByBorrowedStatus,
  getBorrowersForBook,
};
