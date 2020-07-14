# ebook-api
REST API in Node.js for E-library

| URL                    | Method   | URL Params                                 | Data Params                                     | Success | Error |
|------------------------|----------|--------------------------------------------|-------------------------------------------------|---------|-------|
| /v1/api/categories     | `GET`    | None                                       | None                                            |         |       |
| /v1/api/categories/:id | `GET`    | **Required:** id:[mongoose.Types.objectId] | None                                            |         |       |
| /v1/api/categories     | `POST`   | None                                       | {`name`:String of min 5 chars and max 10 chars} |         |       |
| /v1/api/categories/:id | `PUT`    | **Required:** id:[mongoose.Types.objectId] | {`name`:String of min 5 chars and max 10 chars} |         |       |
| /v1/api/categories/:id | `DELETE` | **Required:** id:[mongoose.Types.objectId] | None                                            |         |       |
