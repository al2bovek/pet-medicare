 export function validateForm(values) {
  const errors = {};

  const { user_name, email, password } = values;

  if (!user_name || !user_name.trim()) {
    errors.user_name = "Username is required";
  } else {
    const trimmed = user_name.trim();

    if (trimmed.length < 2 || trimmed.length > 12) {
      errors.user_name = "Username must be 2-12 characters";
    } else if (!/^[a-zA-Z0-9_]+$/.test(trimmed)) {
      errors.user_name = "Username can contain only letters, numbers, and _";
    }
  }


  if (!email || !email.trim()) {
    errors.email = "Email is required";
  } else if (!/^\S+@\S+\.\S+$/.test(email.trim())) {
    errors.email = "Invalid email format";
  }

 
  if (!password || !password.trim()) {
    errors.password = "Password is required";
  } else {
    const trimmed = password.trim();

    if (trimmed.length < 6) {
      errors.password = "Password must be at least 6 characters";
    } else if (!/[A-Za-z]/.test(trimmed)) {
      errors.password = "Password must contain at least one letter";
    } else if (!/\d/.test(trimmed)) {
      errors.password = "Password must contain at least one number";
    }
  }

  return errors;
}
