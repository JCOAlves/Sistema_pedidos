exports.status = (req, res) => {
  res.status(200).json({
    status: 'OK',
    message: 'API funcionando'
  });
};
