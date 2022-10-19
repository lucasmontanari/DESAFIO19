import logger from '../logger/logger.js'
import UsuarioDTO from '../dtos/UsuarioDTO.js';
import serverResponse from "../utils/ServerResponse.js";
import path from 'path'
import { dirname } from 'path';
import { fileURLToPath } from 'url';
const __dirname = dirname(fileURLToPath(import.meta.url));

function getRoot(req, res) { }

function getLogin(req, res) {
    if (req.isAuthenticated()) {
        let user = new UsuarioDTO(req.user);
        //res.render("login-ok", user);
        res.status(200).json(new serverResponse(user, "Success Login"))
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    }
}

function getSignup(req, res) {
    res.sendFile(path.join(__dirname, '..', 'public', "register.html"));
}

function postLogin(req, res) {
    let user = req.user;
    //res.redirect("/api/home")
    res.status(200).json(new serverResponse(user, "Success"))
}

function postSignup(req, res) {
    let user = req.user;
    //res.redirect("/api/home")
    res.status(200).json(new serverResponse(user, "Success"))
    //res.sendFile(path.join(__dirname, '..', 'public', "home.html"));
}

function getFaillogin(req, res) {
    logger.error("Error en login")
    //res.render("login-error", {});
    res.status(500).json(new serverResponse(null, "login-error", true, 500))
}

function getFailregister(req, res) {
    logger.error("Error en Registro")
    //res.render("register-error", {});
    res.status(500).json(new serverResponse(null, "register-error", true, 500))
}

function getLogout(req, res) {
    req.logout(function (err) {
        if (err) { return next(err); }
        res.sendFile(path.join(__dirname, '..', 'public', "logout.html"));
    });
}

function failRoute(req, res) {
    //res.status(404).render("routing-error", {});
    res.status(404).json(new serverResponse(null, "routing-error", true, 404))
}

function home(req, res) {
    if (req.isAuthenticated()) {
        let user = new UsuarioDTO(req.user);
        //res.render("home", user);
        res.status(200).json(new serverResponse(user, "Success"))
    } else {
        res.sendFile(path.join(__dirname, '..', 'public', 'login.html'));
    }
}


export {
    getRoot,
    getLogin,
    postLogin,
    getFaillogin,
    getLogout,
    failRoute,
    getSignup,
    postSignup,
    getFailregister,
    home
};
