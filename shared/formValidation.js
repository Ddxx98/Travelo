// shared/formValidation.js

/**
 * Validate email format
 * @param {string} email - Email to validate
 * @returns {boolean} True if valid, false otherwise
 */
export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

/**
 * Validate password strength
 * @param {string} password - Password to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validatePassword = (password) => {
  if (password.length < 8) {
    return {
      isValid: false,
      message: "Password must be at least 8 characters long",
    };
  }
  
  if (!/[A-Z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one uppercase letter",
    };
  }
  
  if (!/[a-z]/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one lowercase letter",
    };
  }
  
  if (!/\d/.test(password)) {
    return {
      isValid: false,
      message: "Password must contain at least one number",
    };
  }
  
  return {
    isValid: true,
    message: "",
  };
};

/**
 * Validate required field
 * @param {string} value - Field value
 * @returns {boolean} True if valid, false otherwise
 */
export const validateRequired = (value) => {
  return value && value.trim().length > 0;
};

/**
 * Validate category name
 * @param {string} name - Category name to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateCategoryName = (name) => {
  if (!validateRequired(name)) {
    return {
      isValid: false,
      message: "Category name is required",
    };
  }
  
  if (name.length < 3) {
    return {
      isValid: false,
      message: "Category name must be at least 3 characters long",
    };
  }
  
  return {
    isValid: true,
    message: "",
  };
};

/**
 * Validate listing title
 * @param {string} title - Listing title to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateListingTitle = (title) => {
  if (!validateRequired(title)) {
    return {
      isValid: false,
      message: "Listing title is required",
    };
  }
  
  if (title.length < 5) {
    return {
      isValid: false,
      message: "Listing title must be at least 5 characters long",
    };
  }
  
  return {
    isValid: true,
    message: "",
  };
};

/**
 * Validate listing price
 * @param {number} price - Listing price to validate
 * @returns {Object} Validation result with isValid and message
 */
export const validateListingPrice = (price) => {
  if (price === null || price === undefined) {
    return {
      isValid: false,
      message: "Price is required",
    };
  }
  
  if (isNaN(price) || price <= 0) {
    return {
      isValid: false,
      message: "Price must be a positive number",
    };
  }
  
  return {
    isValid: true,
    message: "",
  };
};