# API-Ecolution
API untuk mendapatkan response GET dan POST untuk menangkap dan memberikan data ke database, Dan juga untuk menjadi jembatan untuk diintegrasikan kepada mobile development

# Ecolution-CC RESTful API Documentation

This documentation offers a comprehensive overview and step-by-step instructions for running a RESTful API developed with Node.js. The API can be effortlessly executed locally, interacting with data from a Firebase Realtime Database, or through a Docker container utilizing the specified Dockerfile.

### Prerequisites

- Nodejs installed on your local machine
- Setting up Google Cloud Service (Firebase and Cloud Storage) [if will deployed]
- Docker installed (if running with Docker)

### Setup Instructions

1. Clone the repository from the API-Ecolution Repo main branch
2. Install the required dependencies by running the following command in the project directory

```
npm install
```

4. Get the credentials.json service account for cloud storage and firebase
5. Create files gcs-key.js and firebase-key.js, then place the service account credential.json for each service in their respective files.Create
6. Run the API locally using the following command:

```
npm start
```

The API should now be running on `http://localhost:3000`

#### Base URL

`https://baseurl` + `/api/v1`

## Houses Routes

### Get All Houses

- **Route**: GET /api/v1/houses
- **Description**: Get all houses
- **JSON Response**:

```json
{
    "error": error.message,
    "message": houses

}
```

### Get Houses by ID

- **Route**: GET /api/v1/houses/:id
- **Description**: Get house by ID
- **JSON Response**:

```json
{
    "error": error.message,
    "message": houses

}
```

### Create Houses

- **Route**: POST /api/v1/houses
- **Description**: Create a new house
- **Headers**:
  - Content-type: multipart/form-data
- **Request Body**:
  - title
  - price
  - description
  - email
  - address
  - subdistrict
  - image
- **JSON Response**:

```json
{
    "error": error.message,
    "message": "House added successfully"

}
```

### Update Houses

- **Route**: PUT /api/v1/houses/:id
- **Description**: Update house by ID
- **Headers**:
  - Content-type: multipart/form-data
- **Request Body**:
  - title
  - price
  - description
  - email
  - address
  - subdistrict
  - image
- **JSON Response**:

```json
{
    "error": error.message,
    "message": "House updated successfully"

}
```

### Delete Houses

- **Route**: DELETE /api/v1/houses/:id
- **Description**: Delete house by ID
- **JSON Response**:

```json
{
    "error": error.message,
    "message": "House deleted successfully"

}
```

## Favorite Routes

### Get Favorite by Id

- **Route**: GET /api/v1/favorites/:id
- **Description**: Get favorite by house Id and User Id
- **JSON Response**:

```json
{
    "error": error.message,
    "message": favoriteHouses

}
```

### Create Favorites

- **Route**: POST /api/v1/favorites
- **Description**: Create a new favorite house
- **Body Request**:
  - UserID
  - HousesID
- **JSON Response**:

```json
{
    "error": error.message,
    "message": "Favorite added successfully"

}
```

### Delete Favorite

- **Route**: DELETE /api/v1/favorites
- **Description**: Delete favorite by house Id and User Id
- **Body Request**:
  - UserID
  - HousesID
- **JSON Response**:

```json
{
    "error": error.message,
    "message": "Favorite deleted successfully"

}
```
