import crypto from "crypto";

export default {
  name: "John Doe",
  email: "johndoe@email.com",
  password: crypto.randomBytes(4).toString("hex"),
};
