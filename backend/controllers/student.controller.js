const axios = require("axios");
const db = require("../config/db");
const { generateAvatar } = require("../services/avatar.service");
const { isValidHumanImage } = require("../services/imageValidation.service");

exports.registerStudent = async (req, res) => {
  try {
    const { firstName, middleName, lastName, dob, phone, course } = req.body;

    // Validations for image
    if (!req.file || !isValidHumanImage(req.file)) {
      return res.status(400).json({ message: "Invalid image file" });
    }

    // Generate DiceBear URL
    const seed = firstName + lastName + phone;
    const avatarUrl = generateAvatar(seed);

    // FETCH avatar image as binary
    const avatarResponse = await axios.get(avatarUrl, {
      responseType: "arraybuffer"
    });

    const avatarBuffer = Buffer.from(avatarResponse.data);

    // Check duplicate phone
    db.query(
      "SELECT id FROM students WHERE phone = ?",
      [phone],
      (err, result) => {
        if (err) return res.status(500).json({ error: err });

        if (result.length > 0) {
          return res.status(400).json({ message: "Phone number already registered" });
        }

        // Insert with BLOB
        const sql = `
          INSERT INTO students
          (first_name, midd
          le_name, last_name, dob, phone, course, avatar)
          VALUES (?, ?, ?, ?, ?, ?, ?)
        `;

        db.query(
          sql,
          [
            firstName,
            middleName,
            lastName,
            dob,
            phone,
            course,
            avatarBuffer
          ],
          (err) => {
            if (err) return res.status(500).json({ error: err });
            res.json({ message: "Student Registered Successfully" });
          }
        );
      }
    );
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Avatar processing failed" });
  }
};
exports.getStudents = (req, res) => {
  db.query("SELECT * FROM students ORDER BY created_at DESC", (err, results) => {
    if (err) return res.status(500).json(err);

    const students = results.map(s => ({
      ...s,
      avatar: `data:image/svg+xml;base64,${s.avatar.toString("base64")}`
    }));

    res.json(students);
  });
};
