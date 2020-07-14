

### Books API
This API is used to manage the books in ebooks-api. Each book has a embedded category object.
1. Admin privileges are required to delete a book. 
2. Users need to be logged in to create or update book.
3. Read operations do not need authentication.

**Example data param**
`{
    "title":"Terminator",
    "categoryId":"5f0c8bf3a3143c77f8cb0892",
    "numberInStock":23,
    "dailyRentalRate": 3.59
}`

**Example book response**
`{
        "_id": "5f0c8d0aa3143c77f8cb0897",
        "title": "Naruto",
        "category": {
            "_id": "5f0c8c01a3143c77f8cb0894",
            "name": "Anime"
        },
        "numberInStock": 8,
        "dailyRentalRate": 5.6,
        "__v": 0
    }`



| URL               | Method   | URL Params                                    | Data Params     | Success                                                       | Error                                                                                                                                                                                                                                                                                                                                                                                                   |
|-------------------|----------|-----------------------------------------------|-----------------|---------------------------------------------------------------|---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /v1/api/books     | `GET`    | None                                          | None            | **Code**: 200<br>**Response**:<br>`Returns an array of books` |                                                                                                                                                                                                                                                                                                                                                                                                         |
| /v1/api/books/:id | `GET`    | **Required:**<br>id:[mongoose.Types.objectId] | None            | **Code**: 200<br>**Response**:<br>`Returns specific book`     | **Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Book with given id does not exist.`                                                                                                                                                                                                                                                                          |
| /v1/api/books     | `POST`   | None                                          | **Given Above** | **Code**: 200<br>**Response**:<br>`Returns created book`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:400<br>**Response**:`Joi/Mongoose Validation Error.`<br>OR<br>**Code**:400<br>**Response**:`Category does not exist.`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`                                                                                                                                         |
| /v1/api/books/:id | `PUT`    | **Required:**<br>id:[mongoose.Types.objectId] | **Given Above** | **Code**: 200<br>**Response**:<br>`Returns updated book`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:400<br>**Response**:`Joi/Mongoose Validation Error.`<br>OR<br>**Code**:400<br>**Response**:`Category does not exist.`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Book with given id does not exist.` |
| /v1/api/books/:id | `DELETE` | **Required:**<br>id:[mongoose.Types.objectId] | None            | **Code**: 200<br>**Response**:<br>`Returns deleted book`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:403<br>**Response**:`Access Denied. Not an admin.`<br>OR<br>**Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Book with given id does not exist.`                                                                    |
