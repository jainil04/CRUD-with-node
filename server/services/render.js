const axios = require("axios");
const { response } = require("express");

exports.homeRoutes = (req, res) => {
  axios
    .get("http://localhost:3000/api/users")
    .then((response) => {
      res.render("index", { users: response.data });
    })
    .catch((error) => {
      res.send(error);
    });
};

exports.add_user = (req, res) => {
  res.render("add_user");
};

exports.update_user = (req, res) => {
  axios
    .get("http://localhost:3000/api/users", {
      params: { id: req.query.id },
    })
    .then(function(response) {
      res.render("update_user", { user: response.data });
    })
    .catch((error) => {
      res.send(error);
    });
};
