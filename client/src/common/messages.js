module.exports = {
  // user status messages
  USER: {
    SIGNED_UP: 'Signup successful. Please log in to continue.',
    LOGGED_OUT: 'You must be logged in to continue.',
    SESSION_EXP: 'Your session has expired. Please log in again.',
    PASSWORD_CHANGED: 'Your password has been changed. Please log in again.',
  },

  // input validation messages
  VALIDATE: {
    EMPTY_FIELDS: 'Please fill in all required fields.',
    PASSWORD_MISMATCH: 'Passwords do not match.',
  },

  // modal messages
  MODAL: {
    REVOKE: {
      TITLE: 'Revoke API Key',
      MESSAGE: 'Are you sure you want to deactivate this API key?',
    },
    UPDATE: {
      TITLE: 'Change Password',
      MESSAGE: 'Are you sure you want to change your password?',
    },
    COPY: {
      MESSAGE: 'API key copied to clipboard.',
    },
  },
};
