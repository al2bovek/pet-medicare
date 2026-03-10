 const errorHandler = (err, req, res, next) => {
  console.error("Error:", err);

  
  if (err instanceof SyntaxError && err.status === 400 && "body" in err) {
    return res.status(400).json({ message: "Invalid JSON payload" });
  }

 
  if (err.code === "23505") {
    const detail = err.detail?.toLowerCase() || "";

    if (detail.includes("user_name")) {
      return res.status(409).json({ message: "Username already exists" });
    }
    if (detail.includes("email")) {
      return res.status(409).json({ message: "Email already exists" });
    }

    return res.status(409).json({ message: "Duplicate value error" });
  }


  if (err.code === "23503") {
    return res.status(409).json({
      message: "Operation not allowed: related records exist"
    });
  }

 
  if (err.name === "JsonWebTokenError") {
    return res.status(401).json({ message: "Invalid token" });
  }

  if (err.name === "TokenExpiredError") {
    return res.status(401).json({ message: "Token expired" });
  }


  const status = err.statusCode || 500;
  const message = err.isOperational ? err.message : "Server error";

  return res.status(status).json({
    message,
    ...(err.details ? { details: err.details } : {})
  });
};

export default errorHandler;
