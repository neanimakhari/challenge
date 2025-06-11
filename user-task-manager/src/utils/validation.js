export const validateUser = (userData) => {
  const errors = {};
  
  if (!userData.name || userData.name.trim().length < 2) {
    errors.name = 'Name must be at least 2 characters long';
  }
  
  if (!userData.email || !userData.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
    errors.email = 'Please enter a valid email address';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
};

export const validateTask = (taskData) => {
  const errors = {};
  
  if (!taskData.title || taskData.title.trim().length < 3) {
    errors.title = 'Title must be at least 3 characters long';
  }
  
  if (!taskData.description || taskData.description.trim().length < 5) {
    errors.description = 'Description must be at least 5 characters long';
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}; 