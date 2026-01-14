# Student Portal

A full-stack student registration portal with:
- Student listing page
- Registration form
- Image upload validation
- DiceBear avatar generation
- MySQL database
- Node.js + Express backend

## Tech Stack
- **Frontend:** HTML, CSS, JavaScript  
- **Backend:** Node.js, Express.js  
- **Database:** MySQL  
- **Avatar Service:** DiceBear API  
- **Version Control:** Git, GitHub  

## Project Structure
student-portal/
│
├── backend/

│ ├── config/
│ │ └── db.js

│ ├── controllers/

│ │ └── student.controller.js
  │ ├── routes/

│ │ └── student.routes.js
│ ├── services/

     │ │ ├── avatar.service.js
     │ │ └── imageValidation.service.js
│ ├── server.js
│ ├── package.json
│ └── package-lock.json

├── frontend/
│ ├── index.html
│ ├── register.html
    ├── css/
    │ │ └── style.css
    │ └── js/
    │ ├── list.js
    │ └── register.js
    
├── database/
│ └── schema.sql

├── .gitignore
└── README.md

## How to Run
1. Setup MySQL database
2. Start backend server
   - cd backend
   - node server.js
3. Open frontend in browser
