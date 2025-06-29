const express = require('express');
const router = express.Router();
const { getConnectedClient } = require('./db');
const { ObjectId } = require('mongodb');

const getCollection = () => {
    const client = getConnectedClient();
    return client.db('todo-app').collection('todos');
};

// GET /todos
router.get('/todos', async (req, res) => {
    const collection = getCollection();
    const todos = await collection.find({}).toArray();
    res.status(200).json(todos);
});

// POST /todos
router.post('/todos', async (req, res) => {
    const collection = getCollection();
    const { todo } = req.body;

    if (!todo) {
        return res.status(400).json({ error: 'Todo is required' });
    }

    const newTodo = await collection.insertOne({
        todo,
        status: false,
    });
    res.status(201).json({
        todo,
        status: false,
        _id: newTodo.insertedId    
    });
});

// DELETE /todos/:id
router.delete('/todos/:id', async(req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);

    const deleteTodo = await collection.deleteOne({_id});
    res.status(200).json(deleteTodo);
});

// PUT /todos/:id  
router.put('/todos/:id', async(req, res) => {
    const collection = getCollection();
    const _id = new ObjectId(req.params.id);
    const { status, todo } = req.body;

    const updateFields = {};
    if (typeof status === 'boolean') updateFields.status = status;
    if (typeof todo === 'string') updateFields.todo = todo;

    if (Object.keys(updateFields).length === 0) {
        return res.status(400).json({error: 'No valid fields to update'});
    }

    const updateTodo = await collection.updateOne({_id}, { $set: updateFields });
    res.status(200).json({ updateTodo });
});

module.exports = router;