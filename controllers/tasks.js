const controller = {};

controller.getAll = (req, res) => {
    const tasks = [
        { id: 1, description: 'task' },
        { id: 2, description: 'task' },
        { id: 3, description: 'task' },
    ];
    res.json(tasks);
}

module.exports = controller;