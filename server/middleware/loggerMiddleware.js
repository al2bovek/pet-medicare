 const loggerMiddleware = (req, res, next) => {
  const start = Date.now();

  res.on("finish", () => {
    const duration = Date.now() - start;
    const userId = req.user?.id || "guest";
    const ip = req.ip || req.connection.remoteAddress;

    const contentLength = res.get("Content-Length") || 0;

    const methodColors = {
      GET: "\x1b[32m",     // green
      POST: "\x1b[33m",    // yellow
      PUT: "\x1b[34m",     // blue
      DELETE: "\x1b[31m"   // red
    };
    const reset = "\x1b[0m";

    const methodColor = methodColors[req.method] || "";

    console.log(
      `${methodColor}${req.method}${reset} ${req.originalUrl} ` +
      `${res.statusCode} ${duration}ms ` +
      `size:${contentLength}B ` +
      `user:${userId} ip:${ip}`
    );
  });

  next();
};

export default loggerMiddleware;
