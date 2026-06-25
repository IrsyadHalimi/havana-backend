import app from "./app";

const PORT = process.env.PORT || 5000;

// Jalankan server
app.listen(PORT, () => {
  console.log(`=================================`);
  console.log(`🚀 Server berjalan di port: ${PORT}`);
  console.log(`🔗 URL: http://localhost:${PORT}`);
  console.log(`=================================`);
});