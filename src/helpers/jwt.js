const { expressjwt: expressjwt } = require("express-jwt");

function authJwt() {
  const secret = process.env.SERECT;
  const apiUrl = process.env.BACK_END_URL;
  return expressjwt({
    secret,
    algorithms: ["HS256"],
    isRevoked: isRevoked,
  }).unless({
    path: [
      { url: /\/api\/v1\/product(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/category(.*)/, methods: ["GET", "OPTIONS"] },
      { url: /\/api\/v1\/order(.*)/, methods: ["GET", "OPTIONS", "POST"] },
      `${apiUrl}/user/register`,
      `${apiUrl}/user/get-new-token`,
      `${apiUrl}/user/login`,
      `${apiUrl}/api-docs`,
    ],
  });
}

async function isRevoked(req, token) {
  if (!token.payload.isAdmin) {
    return true;
  }
}

module.exports = authJwt;
