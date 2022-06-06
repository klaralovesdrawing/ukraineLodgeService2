module.exports = app => {
    const lodge = require("../controllers/lodge.controller");
    var router = require("express").Router();
    // Create a new lodge
    router.post("/", lodge.create);
    // Retrieve all Tutorials
    router.get("/", lodge.findAll);
    // Retrieve a single Tutorial with id
    router.get("/:id", lodge.findOne);
    // Update a Tutorial with id
    router.put("/:id", lodge.update);
    // Delete a Tutorial with id
    router.delete("/:id", lodge.delete);
    // Delete all Tutorials
    router.delete("/", lodge.deleteAll);
    app.use('/api/lodges', router);
};