const { findAuthorById } = require("./books");

function getTotalBooksCount(books) {
  return books.length;
}

function getTotalAccountsCount(accounts) {
  return accounts.length;
}

function getBooksBorrowedCount(books) {
  let result = []
  for (let i = 0; i < books.length; i++) {
    if (books[i].borrows[0].returned === false) {
      result.push(books[i]);
    }
  }
  return result.length;
}

function getMostCommonGenres(books) {
  const bookGenres = books.map((book) => book.genre);
  const temp = [];
  //map over book genres
  bookGenres.map((genre) => {
    //for each genre, first check to see if genre already exists in array
    const genreLocation = temp.findIndex((element) => element.name === genre);
    //second, if it exists, increase count by 1
    if (genreLocation >= 0) {
      temp[genreLocation].count = temp[genreLocation].count + 1;
      //else, if it don't exist, push a new genre object onto array with count of 1
    } else {
      temp.push({ name: genre, count: 1 });
    }
  });
  temp.sort((a, b) => b.count - a.count);
  if (temp.length > 5) {
    return temp.slice(0, 5);
  }
  return temp;
}

function getMostPopularBooks(books, count=5) {
  // organise book data
  const borrows = books.map(book=>({name:book.title, count:book.borrows.length}));
  // sort by borrow count, descending
  borrows.sort((a,b) => b.count - a.count);
  // return top N
  return borrows.slice(0,count);
}

function getMostPopularAuthors(books, authors) {
  
  // we are going to use reduce to get an array of objects that have 
  const authorList = books.reduce((acc, book) => { 
    // grab the authorId and borrows array
    const { authorId, borrows } = book;
    
    // get the authorObj
    const authorObj = authors.find(author => author.id === authorId);
    
    // build the author name from the authorObj
    const name = `${authorObj.name.first} ${authorObj.name.last}`;
    
    // get the number of times this book has been borrowed
    const count = borrows.length;
    
    // see if we already have an entry for this author in the accumulator
    const authExists = acc.find(auth => auth.name === name);
    if(authExists) {
      // if we get in here, then we already have an entry for this author in the accumulator
      // so we need to just add to its borrow count
      authExists.count += count;
    } else {
      // if we get in here, then we don't have an entry for this author, so we need to add it
      const newAuthEntry = {
        name,
        count
      };
      acc.push(newAuthEntry);
    }
    
    // finally, return the acc
    return acc;
  }, []);
  
  // sort in descending order by count
  const sortedAuthorList = authorList.sort((a, b) => b.count - a.count);
  
  // get the top five
  const topFive = sortedAuthorList.slice(0, 5);
  
  // and return the top five
  return topFive;
}

module.exports = {
  getTotalBooksCount,
  getTotalAccountsCount,
  getBooksBorrowedCount,
  getMostCommonGenres,
  getMostPopularBooks,
  getMostPopularAuthors,
};
