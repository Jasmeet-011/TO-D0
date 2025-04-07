const Task = require("../models/Task");

// ✅ Get all tasks for the authenticated user
const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    res.send(tasks);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

// ✅ Create a new task for the authenticated user
const createTask = async (req, res) => {
  try {
    const { title, description, completed } = req.body;

    const task = new Task({
      title,
      description,
      completed,
      user: req.user._id,
    });

    await task.save();
    console.log("Task created for user:", req.user._id);
    res.status(201).send(task);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// ✅ Update a task (only if it belongs to the current user)
const updateTask = async (req, res) => {
  const updates = Object.keys(req.body);
  const allowedUpdates = ["title", "description", "completed"];
  const isValidOperation = updates.every((update) =>
    allowedUpdates.includes(update)
  );

  if (!isValidOperation) {
    return res.status(400).send({ error: "Invalid updates!" });
  }

  try {
    const task = await Task.findOneAndUpdate(
      { _id: req.params.id, user: req.user._id },
      req.body,
      { new: true, runValidators: true }
    );

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.send(task);
  } catch (err) {
    res.status(400).send({ error: err.message });
  }
};

// ✅ Delete a task (only if it belongs to the current user)
const deleteTask = async (req, res) => {
  try {
    const task = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id,
    });

    if (!task) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.send(task);
  } catch (err) {
    res.status(500).send({ error: err.message });
  }
};

module.exports = {
  getAllTasks,
  createTask,
  updateTask,
  deleteTask,
};
