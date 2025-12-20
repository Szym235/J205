const { ObjectId } = require('mongodb');
const { getDB } = require('../data/connection');
const bcrypt = require('bcrypt')
const saltRounds = 10;

async function getAllPizzas() {
    const db = getDB();
    return await db.collection('pizzas').find().sort({ createdAt: -1 }).toArray();
}

async function deletePizza(id) {
    const db = getDB();
    await db.collection('pizzas').deleteOne({ _id: new ObjectId(id) });
}

async function getPizzaById(id) {
    const db = getDB();
    return await db.collection('pizzas').findOne({ _id: new ObjectId(id) });
}

async function updatePizza(id, name, description, price) {
    const db = getDB();
    await db.collection('pizzas').updateOne(
        { _id: new ObjectId(id) },
        { $set: { name, description, price } }
    );
}


async function addPizza(name, description, price){
    const db = getDB();
    await db.collection('pizzas').insertOne({ name, description, price, createdAt: new Date() });
}

async function registerUser(username, password, isAdmin) {
    const db = getDB();

    const hashedPassword = await bcrypt.hash(password, saltRounds);
    db.collection('users').insertOne({ username, password: hashedPassword, isAdmin, createdAt: new Date() });
}

async function loginUser(username, password) {
    const db = getDB();
    const user = await db.collection('users').findOne({ username: username });
    
    if(user != null)
    {
        const passwordMatch = await bcrypt.compare(password, user.password);
        if(passwordMatch)
        {
            return user;
        }
    }
    return null;
}

async function checkIfUserExists(username) {
    const db = getDB();
    const user = await db.collection('users').findOne({ username: username });
    
    if(user != null)
    {
        return true;
    }
    return false;
}

module.exports = { 
    getAllPizzas,
    addPizza, 
    deletePizza, 
    getPizzaById, 
    updatePizza, 
    registerUser, 
    loginUser, 
    checkIfUserExists
};