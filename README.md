# **Video Upload Web Application**

A full-stack web application that allows users to upload videos through a multi-step wizard form, store the video files on the server, and save metadata in a SQLite database.

---

## **Features**

1. **Frontend**:

   - Multi-step wizard form for video uploads.
   - Preview video thumbnail and enter metadata (title, date, postal code).
   - Real-time progress bar for video uploads.
   - Validation for required fields and terms agreement.

2. **Backend**:
   - Video files are stored on the server using `multer`.
   - Metadata (title, start date/time, postal code, file path) is saved in a SQLite database.
   - API designed with proper validation and error handling.

---

## **Technologies Used**

### **Frontend**:

- **React**: For building the user interface.
- **Bootstrap**: For responsive and styled components.
- **Axios**: For making HTTP requests.

### **Backend**:

- **Node.js**: Backend server.
- **Express**: For building RESTful APIs.
- **Multer**: For file uploads.
- **SQLite**: Lightweight database for storing metadata.
- **Sequelize**: ORM for SQLite integration.

---

## **Setup and Installation**

### Prerequisites

- Node.js - ">=20.17.0"
- npm for the `backend` project
- yarn for `frontend` project.
  - There is currently some issues with `create-react-app` and using `yarn` is the temporary solution to avoid dependency conflicts. For more information please refer to the following [link](https://github.com/facebook/create-react-app/issues/13717)

### Steps

1. **Clone the Repository**:

   ```bash
   git clone <repository_url>
   cd video-upload-app
   ```

2. **Install Dependencies**:

   - **Backend**:
     ```bash
     cd backend
     npm install
     ```
   - **Frontend**:
     ```bash
     cd frontend
     yarn install
     ```

3. **Set Up the Database**:
   The backend will automatically create and sync the SQLite database (`metadata.sqlite`) when the server starts.

4. Inside the `frontend` folder please duplicate the `.env.default` and replace the environment variables with neccessary information.

   - Command:

   ```bash
   cd frontend
   cp .env.default .env
   ```

5. **Run the Application**:

   - **Backend**:
     ```bash
     cd backend
     npm run dev
     ```
   - **Frontend**:
     ```bash
     cd frontend
     yarn start
     ```

6. Open the app in your browser:
   ```
   http://localhost:3000
   ```

---

## **API Documentation**

### **Upload Video**

- **Endpoint**: `POST /api/v1/upload`
- **Description**: Uploads a video file and saves metadata.
- **Request**:
  - **Headers**: `Content-Type: multipart/form-data`
  - **Body**:
    - `video` (file): The video file.
    - `title` (string): The title of the video (required).
    - `startDateTime` (string): Start date and time in Unix epoch timestamp format (required).
    - `postalCode` (string): Optional postal code
- **200 OK Response**:

  ```json
  {
    "message": "Upload successful!"
  }
  ```

- **Other Error Response**:
  ```json
  {
    "error": "Uploading encountered error!"
  }
  ```

---

## **Project Structure**

```
video-upload-app/
├── backend/
│   ├── db.ts             # Database configuration
│   ├── models/Metadata.ts # Metadata model
│   ├── controllers/upload.ts  # Upload API
│   ├── index.ts            # Main server file
|   |── metadata.sqlite       # SQLite database file (generated after running backend)
├── frontend/
│   ├── src/
│   │   ├── components/   # Folder contains all the components for this application
        ├── api/          # Folder contains API layer that interacts with external system
│   │   ├── App.tsx       # Root component
│   ├── .env.default      # Please duplicate the .env.default file and rename it as .env when running locally
```

---

## **Usage**

1. Navigate to the home page.
2. Follow the steps in the wizard:
   - Step 1: Upload a video file, preview it, and enter metadata.
   - Step 2: Agree to the terms and conditions.
   - Step 3: Upload the video and view the progress.
3. The video is saved on the server, and metadata is stored in the database.

---
