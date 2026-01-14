const db = require("../config/db");
const { generateAvatar } = require("../services/avatar.service");
const { isValidHumanImage } = require("../services/imageValidation.service");

exports.registerStudent = (req, res) => {
  const { firstName, middleName, lastName, dob, phone, course } = req.body;

  /* ===========================
     1️⃣ BASIC FIELD VALIDATION
  =========================== */
  const namePattern = /^[A-Za-z]+$/;
  const phonePattern = /^[6-9]\d{9}$/;

  if (!firstName || !lastName || !dob || !phone || !course) {
    return res.status(400).json({ message: "All required fields must be filled" });
  }

  if (!namePattern.test(firstName) || !namePattern.test(lastName)) {
    return res.status(400).json({
      message: "First and Last Name should contain only alphabets"
    });
  }

  if (!phonePattern.test(phone)) {
    return res.status(400).json({
      message: "Invalid phone number format"
    });
  }

  const birthDate = new Date(dob);
  if (birthDate > new Date()) {
    return res.status(400).json({
      message: "Date of Birth cannot be in the future"
    });
  }

  /* ===========================
     2️⃣ IMAGE VALIDATION
  =========================== */
  if (!req.file || !isValidHumanImage(req.file)) {
    return res.status(400).json({
      message: "Invalid image file"
    });
  }

  /* ===========================
     3️⃣ DUPLICATE PHONE CHECK
  =========================== */
  db.query(
    "SELECT id FROM students WHERE phone = ?",
    [phone],
    (err, result) => {
      if (err) {
        return res.status(500).json({ error: "Database error" });
      }

      if (result.length > 0) {
        return res.status(400).json({
          message: "Phone number already registered"
        });
      }

      /* ===========================
         4️⃣ AVATAR GENERATION
      =========================== */
      const seed = firstName + lastName + phone;
      const avatarUrl = generateAvatar(seed);

      /* ===========================
         5️⃣ INSERT STUDENT
      =========================== */
      const sql = `
        INSERT INTO students
        (first_name, middle_name, last_name, dob, phone, course, avatar_url)
        VALUES (?, ?, ?, ?, ?, ?, ?)
      `;

      db.query(
        sql,
        [firstName, middleName, lastName, dob, phone, course, avatarUrl],
        (err) => {
          if (err) {
            return res.status(500).json({ error: "Failed to register student" });
          }

          res.json({ message: "Student Registered Successfully" });
        }
      );
    }
  );
};

exports.getStudents = (req, res) => {
  db.query(
    "SELECT * FROM students ORDER BY created_at DESC",
    (err, results) => {
      if (err) return res.status(500).json({ error: "Database error" });
      res.json(results);
    }
  );
};
