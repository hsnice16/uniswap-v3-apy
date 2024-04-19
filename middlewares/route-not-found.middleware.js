function routeNotFound(_, res) {
  const response = {
    message: "Sorry, can't find the API you're looking for!",
  };

  res.status(404).json(response);
}

module.exports = { routeNotFound };
