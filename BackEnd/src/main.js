import "../config.js";

import app from "./shared/infra/http/server.js";

const PORT = process.env.SERVER_PORT;

app.listen(PORT, () => {
  console.log("server listening on http://localhost:", PORT);
});
