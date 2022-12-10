const verifyJWT = (token) => {
  // Verify the user, return the user + id
  const user = jwt.verify(JSON.parse(token).token, JWT_SECRET_KEY);
  const _id = user.id;
  return [user, _id];
};

module.exports = {
  verifyJWT,
};
