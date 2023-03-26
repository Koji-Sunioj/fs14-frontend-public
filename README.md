# From Koji

current netlify link: https://darling-syrniki-58d723.netlify.app/

edit 25/3: paginated filtering is handling in the component level, since manipulating the stock (for example, user adds item to cart) requires the albums reducer to have all values present. in reality, the data would be saved to a database, and the ui view of albums is refreshed with a new fetch request.

edit 26/3: new admin created album is will be stored in localstorage for now (one item) since, the app fetches and filters, with every change in the AlbumQuery component (page number, query, etc) thus, the new item will be lost when i store it in the reducer, and change a query parameter. 

these two things might seem a little weird, but i would like the reducer to resemble real REST API requests as much as possible when we start adding the back-end. i might change it, if things don't make sense as time goes on.

# Frontend project

## Expectation

### `Tech Stack:`

React, TypeScript and Redux. And for styling, choose whatever you like (ideally, something you already know.)

### `Outcome:`

Build a front end for an E-commerce or a Library System and deploy it.

The Frontend should be talking to a mock data that stored locally in your project and later (in the fullstack project) you would plug it (to your backend.), refactor, and add more features(maybe).

## Assignment

---

### `Option 1`

**A Library management system**

you have to have `at least` these data sources:
(the properties that being mentioned below each data source are the minimum)

- Books
  - ISBN
  - title
  - description
  - publisher
  - authors
  - status: available or borrowed
  - borrowerId
  - publishedDate
  - borrowDate
  - returnDate
- Authors
  - name
- Users (as visitor or admin)
  - firstName (from google)
  - lastName (from google)
  - email (from google)

**Use cases:**

Visitor can:

- login (using login via google)
- explore list of books
- filter and search
- borrow a book
- return a borrowed book

Admin can:

- add new book
- update info of a book
- remove a book
- add a new author
- update info of an author
- remove an author

PS. if you want to store some data, you could use LocalStorage for now.

---

### `Option 2`

**An E-commerce website**

you have to have `at least` these data sources:
(the properties that being mentioned are the minimum)

- Products
  - id
  - name
  - description
  - categories
  - variants
  - sizes
- Orders
  - productId
  - userId
  - purchasedAt
- Users (as visitor or admin)
  - firstName (from google)
  - lastName (from google)
  - email (from google)

**Use cases:**

Visitor can:

- login (using login via google)
- explore list of products
- filter and search
- Add to a cart
- checkout product/s

Admin can:

- add new product
- update info of a product
- remove a product
- ban a user

PS. if you want to store some data, you could use LocalStorage for now.

---

## Way of working

Your task here is to prepare the UI part of it and its functionalities ie.
you are working on the UI of adding new item

here's how to approach it:

1. create the UI part (including form)
2. handle the validation
3. make sure the form is working and when you submit you get the new item
4. send it to Redux and skip the part where you send a request (you will add it later) and return the new data to the state.

---

## Lastly

Any additional features are welcome, like switching theme or other cool stuff. **but make sure you work on the required ones first.**
