 const roleMiddleware = (...allowedRoles) => {
  const normalizedAllowed = allowedRoles.map(r => r.toLowerCase());

  return (req, res, next) => {
    const userRole = req.user?.role?.toLowerCase();

    if (!userRole) {
      return res.status(401).json({ message: "User role not found" });
    }

    if (!normalizedAllowed.includes(userRole)) {
      // console.warn(`Access denied for role: ${userRole} on ${req.originalUrl}`);

      return res.status(403).json({ message: "Access denied" });
    }

    next();
  };
};

export default roleMiddleware;
