import tutorialModel from "../database/mysql"
const Tutorial = tutorialModel.tutorials;

// Create and Save a new Tutorial
const create = (req:any, res:any) => {
  // Validate request
  console.log(req.body.title);
  if (!req.body.title) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
    return;
  }

  // Create a Tutorial
  const tutorial = {
    title: req.body.title,
    description: req.body.description,
    published: req.body.published ? req.body.published : false
  };

  // Save Tutorial in the database
  Tutorial.create(tutorial)
    .then((data:any) => {
      res.send(data);
    })
    .catch((err:any) => {
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Tutorial."
      });
    });
};

export { create }

