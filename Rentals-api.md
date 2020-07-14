
### Rentals API
This API is used to manage the rentals in ebooks-api.
1. Admin privileges are required to delete a rental. 
2. Users need to be logged in to create or update rental.
3. Read operations do not need authentication.

**Example data param**
`{
    "customerId":"5f0c8e8524e9c168908193d0",
    "bookId":"5f0c8d0aa3143c77f8cb0897"
}`

**Example rental response (success)**
`{
    "_id": "5f0de874cdb0b0579c143f4c",
    "customer": {
        "isGold": true,
        "_id": "5f0c8e8524e9c168908193d0",
        "name": "Rohan",
        "phone": 1234567891
    },
    "book": {
        "_id": "5f0c8d0aa3143c77f8cb0897",
        "title": "Naruto",
        "dailyRentalRate": 5.6
    },
    "dateOut": "2020-07-14T17:16:36.241Z"
}`



| URL                 | Method   | URL Params                                    | Data Params     | Success                                                         | Error                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
|---------------------|----------|-----------------------------------------------|-----------------|-----------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /v1/api/rentals     | `GET`    | None                                          | None            | **Code**: 200<br>**Response**:<br>`Returns an array of rentals` |                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| /v1/api/rentals/:id | `GET`    | **Required:**<br>id:[mongoose.Types.objectId] | None            | **Code**: 200<br>**Response**:<br>`Returns specific rental`     | **Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Rental with given id does not exist.`                                                                                                                                                                                                                                                                                                                                      |
| /v1/api/rentals     | `POST`   | None                                          | **Given Above** | **Code**: 200<br>**Response**:<br>`Returns created rental`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:400<br>**Response**:`Joi/Mongoose Validation Error.`<br>OR<br>**Code**:400<br>**Response**:`Customer does not exist.`<br>OR<br>**Code**:400<br>**Response**:`Book does not exist`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:500<br>**Response**:`Transaction failed. Rental not created,`                                                           |
| /v1/api/rentals/:id | `PUT`    | **Required:**<br>id:[mongoose.Types.objectId] | **Given Above** | **Code**: 200<br>**Response**:<br>`Returns updated rental`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:400<br>**Response**:`Joi/Mongoose Validation Error.`<br>OR<br>**Code**:400<br>**Response**:`Customer does not exist.`<br>OR<br>**Code**:400<br>**Response**:`Book does not exist`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Rental with given id does not exist.` |
| /v1/api/rentals/:id | `DELETE` | **Required:**<br>id:[mongoose.Types.objectId] | None            | **Code**: 200<br>**Response**:<br>`Returns deleted rental`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:403<br>**Response**:`Access Denied. Not an admin.`<br>OR<br>**Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Rental with given id does not exist.`                                                                                                                                |
