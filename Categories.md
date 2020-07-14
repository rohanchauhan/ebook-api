
##### Categories API
This API is used to manage the categories of book in ebooks-api.
1. Admin privileges are required to delete a book. 
2. Users need to be logged in to create or update category.
3. Read operations do not need authentication.

**Example data param**
`{name:"Category1"}`

**Example category response**
`{
    "_id": "5f0d86a32d97e02e7c63dae2",
    "name": "Horror",
    "__v": 0
}`



| URL                    | Method   | URL Params                                    | Data Params     | Success                                                            | Error                                                                                                                                                                                                                                                                                                                                     |
|------------------------|----------|-----------------------------------------------|-----------------|--------------------------------------------------------------------|-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /v1/api/categories     | `GET`    | None                                          | None            | **Code**: 200<br>**Response**:<br>`Returns an array of categories` |                                                                                                                                                                                                                                                                                                                                           |
| /v1/api/categories/:id | `GET`    | **Required:**<br>id:[mongoose.Types.objectId] | None            | **Code**: 200<br>**Response**:<br>`Returns specific category`      | **Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Category with given id does not exist.`                                                                                                                                                                                                        |
| /v1/api/categories     | `POST`   | None                                          | **Given Above** | **Code**: 200<br>**Response**:<br>`Returns created category`       | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br><br>**Code**:400<br>**Response**:`Joi/Mongoose Validation Error`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`                                                                                                                                         |
| /v1/api/categories/:id | `PUT`    | **Required:**<br>id:[mongoose.Types.objectId] | **Given Above** | **Code**: 200<br>**Response**:<br>`Returns updated category`       | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:400<br>**Response**:`Joi/Mongoose Validation Error`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Category with given id does not exist.` |
| /v1/api/categories/:id | `DELETE` | **Required:**<br>id:[mongoose.Types.objectId] | None            | **Code**: 200<br>**Response**:<br>`Returns deleted category`       | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:403<br>**Response**:`Access Denied. Not an admin.`<br>OR<br>**Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Category with given id does not exist.`  |
