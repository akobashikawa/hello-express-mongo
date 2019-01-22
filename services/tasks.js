const service = () => { };

service.getAll = async () => {
    const tasks = [
        { id: 1, description: 'task' },
        { id: 2, description: 'task' },
        { id: 3, description: 'task' },
    ];
    return tasks;
};

module.exports = service;