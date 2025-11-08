exports.submitContactForm = (req, res) => {
  const { name, email, phone, message } = req.body;

  if (!name || !email || !phone || !message) {
    return res.status(400).json({ error: "All fields are required" });
  }

  const responseData = {
    id: Math.floor(Math.random() * 1000),
    name,
    email,
    phone,
    message,
    created_at: new Date().toISOString(),
    updated_at: new Date().toISOString(),
  };

  res.status(200).json(responseData);
};
