const userController = {
  signup: async (req, res) => {
    return res.json({
      success: true,
      message: 'ok',
    });
  },

  login: async (req, res) => {},
};

module.exports = userController;
