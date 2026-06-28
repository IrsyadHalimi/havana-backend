import app from "./app";

import { verifyMailer } from "./config/nodemailer";

const PORT = process.env.PORT || 3000;

const startServer = async () => {

  await verifyMailer();

  app.listen(PORT, () => {

    console.log(
      `🚀 Server running on port ${PORT}`
    );

  });

};

startServer();