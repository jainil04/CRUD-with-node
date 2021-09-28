const Userdb = require("../model/model");

// Create and Save User
exports.create = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  // New User
  const user = new Userdb({
    name: req.body.name,
    email: req.body.email,
    gender: req.body.gender,
    status: req.body.status,
  });

  // Save User in DB
  user
    .save(user)
    .then((data) => {
    //   res.send(data);
    res.redirect("/add-user");
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message || "Something went wrong while creating new user",
      });
    });
};

// Retrive and return all users and Retrive and return single user
exports.find = (req, res) => {
  if (req.query.id) {
    const id = req.query.id;
    Userdb.findById(id)
      .then((data) => {
        if (!data) {
          res.status(404).send({ message: `Can not find user by ID : ${id}` });
        } else {
          res.send(data);
        }
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something went wrong while updating user information",
        });
      });
  } else {
    Userdb.find()
      .then((user) => {
        res.send(user);
      })
      .catch((error) => {
        res.status(500).send({
          message:
            error.message ||
            "Something went wrong while retriving user information",
        });
      });
  }
};

// Update a new identified user by user id
exports.update = (req, res) => {
  // validate request
  if (!req.body) {
    res.status(400).send({ message: "Content can not be empty" });
    return;
  }

  const id = req.params.id;
  Userdb.findByIdAndUpdate(id, req.body, { useFindAndModify: false })
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Can not find user by ID : ${id}` });
      } else {
        res.send(data);
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something went wrong while updating user information",
      });
    });
};

// Delete a user with user id
exports.delete = (req, res) => {
  const id = req.params.id;
  Userdb.findByIdAndDelete(id)
    .then((data) => {
      if (!data) {
        res.status(404).send({ message: `Can not delete user by ID : ${id}` });
      } else {
        res.send({
          message: `User with ID: ${id} is successfully deleted`,
        });
      }
    })
    .catch((error) => {
      res.status(500).send({
        message:
          error.message ||
          "Something went wrong while deleting user information",
      });
    });
};
