

### Customers API
This API is used to manage the customers in ebooks-api.
1. Admin privileges are required to delete a customer. 
2. Users need to be logged in to create or update customer.
3. Read operations do not need authentication.

**Example data param**
`{
    "name":"Johnny",
    "phone":1234567890
}`

**Example customer response (success)**
`{
    "isGold": false,
    "_id": "5f0de1112d97e02e7c63dae8",
    "name": "Johnny",
    "phone": 1234567890,
    "__v": 0
}`



| URL                   | Method   | URL Params                                    | Data Params     | Success                                                           | Error                                                                                                                                                                                                                                                                                                                                      |
|-----------------------|----------|-----------------------------------------------|-----------------|-------------------------------------------------------------------|--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------|
| /v1/api/customers     | `GET`    | None                                          | None            | **Code**: 200<br>**Response**:<br>`Returns an array of customers` |                                                                                                                                                                                                                                                                                                                                            |
| /v1/api/customers/:id | `GET`    | **Required:**<br>id:[mongoose.Types.objectId] | None            | **Code**: 200<br>**Response**:<br>`Returns specific customers`    | **Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Customer with given id does not exist.`                                                                                                                                                                                                         |
| /v1/api/customers     | `POST`   | None                                          | **Given Above** | **Code**: 200<br>**Response**:<br>`Returns created customer`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:400<br>**Response**:`Joi/Mongoose Validation Error.`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`                                                                                                                                             |
| /v1/api/customers/:id | `PUT`    | **Required:**<br>id:[mongoose.Types.objectId] | **Given Above** | **Code**: 200<br>**Response**:<br>`Returns updated customer`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:400<br>**Response**:`Joi/Mongoose Validation Error.`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Customer with given id does not exist.` |
| /v1/api/customers/:id | `DELETE` | **Required:**<br>id:[mongoose.Types.objectId] | None            | **Code**: 200<br>**Response**:<br>`Returns deleted customer`      | **Code**:400<br>**Response**:`Access denied. No token provided.`<br>OR<br>**Code**:401<br>**Response**:`Invalid token.`<br>OR<br>**Code**:403<br>**Response**:`Access Denied. Not an admin.`<br>OR<br>**Code**:404<br>**Response**:`Invalid id provided.`<br>OR<br>**Code**:404<br>**Response**:`Customer with given id does not exist.`   |
