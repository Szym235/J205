const pizzeriaModel = require('../models/pizzeriaModel');
const session = require('express-session');

async function getAll(req, res) {
    const usernameOfLoggedOne = req.session.username ? req.session.username: "";
    const isLoggedOneAdmin = req.session.isAdmin ? true : false;

    const search = req.query.searchInput || "";
    const sorter = req.query.sorter || "";
    console.log("Szukana fraza: " + search.toLowerCase());
    var pizzas = await pizzeriaModel.getAllPizzas();
    pizzas.forEach(element => {
        console.log(element.name);
    });
    if(search != "")
    {
        pizzas = pizzas.filter(pizza => 
            pizza.name.toLowerCase().includes(search.toLowerCase())
        );
    }
    if(sorter == "name")pizzas.sort((a, b) => a.name.localeCompare(b.name));
    else if(sorter == "price")pizzas.sort((a, b) => a.price.localeCompare(b.price));
    res.render('pages/index', { pizzas, usernameOfLoggedOne, isLoggedOneAdmin});
}

async function getAddForm(req, res) {
    const usernameOfLoggedOne = req.session.username ? req.session.username: "";
    const isLoggedOneAdmin = req.session.isAdmin ? true : false;

    res.render('pages/add', {usernameOfLoggedOne, isLoggedOneAdmin});
}

async function postAdd(req, res) {
    const { name, description, price } = req.body;

    if(name != "" && description != "" && price != "")
    {
        await pizzeriaModel.addPizza(name, description, price);
    }
    res.redirect('/');
}

async function deletePizza(req, res) {
    await pizzeriaModel.deletePizza(req.params.id);
    res.redirect('/');
}

async function getAboutPage(req, res) {
    const usernameOfLoggedOne = req.session.username ? req.session.username: "";
    const isLoggedOneAdmin = req.session.isAdmin ? true : false;
    res.render('pages/about', {usernameOfLoggedOne, isLoggedOneAdmin});
}

async function getEditPage(req, res) {
    const pizza = await pizzeriaModel.getPizzaById(req.params.id);
    const usernameOfLoggedOne = req.session.username ? req.session.username: "";
    const isLoggedOneAdmin = req.session.isAdmin ? true : false;
    res.render('pages/edit', { pizza , usernameOfLoggedOne, isLoggedOneAdmin});
}

async function postEdit(req, res) {
    const { name, description, price } = req.body;
    const id = req.params.id;
    await pizzeriaModel.updatePizza(id, name, description, price);
    res.redirect('/');
}

async function getLoginPage(req, res) {
    const usernameOfLoggedOne = req.session.username ? req.session.username: "";
    const isLoggedOneAdmin = req.session.isAdmin ? true : false;
    res.render('pages/login', { usernameOfLoggedOne, isLoggedOneAdmin});
}

async function getRegisterPage(req, res) {
    const usernameOfLoggedOne = req.session.username ? req.session.username: "";
    const isLoggedOneAdmin = req.session.isAdmin ? true : false;
    res.render('pages/register', { usernameOfLoggedOne, isLoggedOneAdmin});
}

async function registerUser(req, res) {
    const { username, password, isAdmin } = req.body;

    if(username != "" && password != "")
    { 
        await pizzeriaModel.registerUser(username, password, isAdmin)
        res.redirect("/login", {usernameOfLoggedOne});
        return;
    }
    res.redirect("/register");
}

async function loginUser(req,res)
{
    const {username, password} = req.body;
    if(username != "" && password != "" && await pizzeriaModel.loginUser(username, password))
    {
        req.session.username = username;
        if(pizzeriaModel.checkIfUserIsAdmin(username)) req.session.isAdmin = true;
        else req.session.isAdmin = false;
        res.redirect("/");
        return;
    }
    res.redirect("/login");
    return;
}

async function logOut(req, res) {
    req.session.isAdmin = null;
    req.session.username = null;
    res.redirect("/login");
}

module.exports = {
    getAll,
    getAddForm,
    postAdd,
    deletePizza,
    getAboutPage,
    getEditPage,
    postEdit,
    getLoginPage,
    getRegisterPage,
    registerUser,
    loginUser,
    logOut
};
