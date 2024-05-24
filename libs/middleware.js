import jwt from "jsonwebtoken";

export const verifyToken = (req, res, next) => {
  const token = req.cookies.taskly_token;

  if (!token) return next({ status: 401, message: "Unauthorized" });

  jwt.verify(token, process.env.AUTH_SECRET, (err, user) => {
    if (err) return next({ status: 403, message: "Forbidden" });
    req.user = user;
    next();
  });
};

export const errorHandler = (err, req, res, next) => {
  const defaultMessage =
    "We're having technical issues. Please try again later";

  const { status, message, error } = err;

  if (error) {
    console.log(error);
  }

  res.status(status).json({ message: message || defaultMessage });
};

// To populate the "err" object, you only need to pass an object argument when
// calling the next() function
// eg. next({ status: 404, message: 'User not found!' })

// Any cookies sent to Express will be included in "req.cookies" object because of the cookieParser() middleware
