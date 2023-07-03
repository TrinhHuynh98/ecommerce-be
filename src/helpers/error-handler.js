function errorHanlder(err, req, res, next) {
  console.log("err", err);
  if (err.name === "UnauthorizedError") {
    return res.status(401).json({ message: "User is not Authorized" });
  }

  if (err.name === "ValidationError") {
    //  validation error
    return res.status(401).json({ message: err });
  }

  // default to 500 server error
  return res.status(500).json(err);
}

module.exports = errorHanlder;
