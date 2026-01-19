const db = require("../config/db");
const axios = require("axios");
const { generateAvatar } = require("../services/avatar.service");

/* REGISTER STUDENT */
exports.registerStudent = async (req, res) => {
  try {
    const {
      firstName,
      middleName,
      lastName,
      companyName,
      phone,
      telephone,
      email
    } = req.body;

    /* VALIDATIONS */
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+$/;

    if (!nameRegex.test(firstName) || !nameRegex.test(lastName)) {
      return res.status(400).json({ message: "Name must contain only alphabets" });
    }

    if (!phoneRegex.test(phone)) {
      return res.status(400).json({ message: "Phone number must be 10 digits" });
    }
    if (telephone) {
    const telPattern = /^\d{3}-\d{3}-\d{3}$/;

    if (!telPattern.test(telephone)) {
      return res.status(400).json({
        message: "Telephone must be in format: 123-456-789"
      });
      }
    }

    if (!emailRegex.test(email)) {
      return res.status(400).json({ message: "Invalid email format" });
    }

    if (!req.file) {
      return res.status(400).json({ message: "Image upload is required" });
    }

    /*  EMAIL UNIQUENESS */
    db.query(
      "SELECT id FROM students WHERE email = ?",
      [email],
      async (err, rows) => {
        if (err) return res.status(500).json(err);

        if (rows.length > 0) {
          return res.status(400).json({ message: "Email already exists" });
        }

        /*  AVATAR GENERATION  */
        const seed = firstName + lastName + email;
        const avatarUrl = generateAvatar(seed);

        const avatarResponse = await axios.get(avatarUrl, {
          responseType: "arraybuffer"
        });

        const avatarBuffer = Buffer.from(avatarResponse.data);

        /* INSERT INTO DB  */
        const sql = `
          INSERT INTO students
          (first_name, middle_name, last_name, company_name, phone, telephone, email, avatar)
          VALUES (?, ?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          sql,
          [
            firstName,
            middleName,
            lastName,
            companyName,
            phone,
            telephone,
            email,
            avatarBuffer
          ],
          (err) => {
            if (err) return res.status(500).json(err);
            res.json({ message: "Student Registered Successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Registration failed" });
  }
};

/* GET ALL STUDENTS (TABLE PAGE) */
exports.getStudents = (req, res) => {
  db.query(
    "SELECT id, first_name, last_name, company_name, phone, telephone, email FROM students ORDER BY created_at DESC",
    (err, rows) => {
      if (err) return res.status(500).json(err);
      res.json(rows);
    }
  );
};

/* GET SINGLE STUDENT (CARD PAGE) */
exports.getStudentById = (req, res) => {
  const id = req.params.id;

  db.query(
    "SELECT * FROM students WHERE id = ?",
    [id],
    (err, rows) => {
      if (err) return res.status(500).json(err);
      if (rows.length === 0) {
        return res.status(404).json({ message: "Student not found" });
      }

      const student = rows[0];

      student.avatar = `data:image/svg+xml;base64,${Buffer.from(student.avatar).toString("base64")}`;

      res.json(student);
    }
  );
};
