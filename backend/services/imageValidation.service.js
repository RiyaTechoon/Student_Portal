exports.isValidHumanImage = (file) => {
  const allowedTypes = ["image/jpeg", "image/png", "image/jpg"];
  const maxSize = 2 * 1024 * 1024; // 2MB

  if (!allowedTypes.includes(file.mimetype)) return false;
  if (file.size > maxSize) return false;

  return true;
};
