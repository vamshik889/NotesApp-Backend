const express = require("express");
const jwt = require("jsonwebtoken");

// Middleware to authenticate requests using JWT
const auth = (req, res, next) => {
  // Step 1: Check if the Authorization header exists
  if (!req.headers.authorization) {
    return res.status(401).send({ message: "Authorization header missing" });
  }

  // Step 2: Extract the token from the Authorization header
  // Authorization format: "Bearer <token>"
  const token = req.headers.authorization.split(" ")[1]; // Extract token after the "Bearer" keyword

  // Step 3: Check if the token exists
  if (!token) {
    return res.status(401).send({ message: "Token missing or malformed" });
  }

  try {
    // Step 4: Verify the token using the secret key
    const decoded = jwt.verify(token, "secret"); // Replace "secret" with an environment variable in production

    if (decoded) {
      // Step 5: Attach user information to the request object
      req.user = { 
        authorId: decoded.authorId, // Extracted authorId from the token payload
        author: decoded.author     // Extracted author (name) from the token payload
      };

      next(); // Step 6: Proceed to the next middleware or route handler
    } else {
      // If the token payload is invalid
      res.status(400).send({ message: "Invalid token" });
    }
  } catch (error) {
    // Step 7: Handle cases where the token is invalid or expired
    res.status(401).send({ message: "Invalid or expired token" });
  }
};

module.exports = { auth };
