const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

const path = require("path");
const cors = require("cors");

dotenv.config();
connectDB();
const app = express();



app.use(cors());
// Middleware
app.use(express.json());
app.use("/public/", express.static(path.join(__dirname, "/public/")));
app.use(
  "/assets/",
  express.static(path.join(__dirname, "/public/dist/assets"))
);

// Serve static files from uploads directory with proper MIME type
app.use(
  "/public/uploads",
  express.static(path.join(__dirname, "/public/uploads"), {
    setHeaders: function (res, path) {
      res.setHeader("Content-Type", "image/png"); // Change the MIME type accordingly
    },
  })
);

// Logging middleware to debug headers
app.use((req, res, next) => {
  console.log(`Request Method: ${req.method}, Request URL: ${req.url}`);
  console.log("Request Headers:", req.headers);
  next();
});

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/users", require("./routes/userRoutes"));
app.use("/api/posts", require("./routes/postRoutes"));
app.use("/api/videoposts", require("./routes/videoPostRoutes"));
app.use("/api/admin", require("./routes/adminRoutes"));

// Example route for OpenAI API
app.post('/api/generate-response', async (req, res) => {
  const { prompt } = req.body;

  try {
    const response = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      max_tokens: 150,
    });

    res.json({ message: response.data.choices[0].text.trim() });
  } catch (error) {
    console.error("Error generating response:", error);
    res.status(500).json({ error: 'Failed to generate response' });
  }
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
