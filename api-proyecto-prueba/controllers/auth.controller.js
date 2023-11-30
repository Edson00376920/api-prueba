const { body } = require("express-validator");
const User = require("../models/user.model");
const ROLES = require("../data/roles.constants.json")
const { createToken, verifyToken } = require("./../utils/jwt.tools");

const controller = {};

controller.register = async (req, res, next) => {
    try {
        //obtener informacion de usuario
        const { username, email, password} = req.body;
        // verificar del correo y usuario
        const user = await User.findOne({ $or: [{username: username}, 
            {email: email}]
        });

        if(user){
            return res.status(409).json({error: "El usuario ya existe"})
        }
        // si no existe, se crea
        const newUser = new User({
            username: username,
            email: email,
            password: password,
            roles: [ROLES.USER]
        });

        await newUser.save();
        return res.status(201).json({message: "usuario registrado"});
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "internal server error"});
    }
}

controller.login = async (req, res, next) => {
    try {
        //Obtener info
        const { identifier, password } = req.body;
        //verificar si el usuario existe
        const user = await User.findOne({ $or: [{username: identifier}, 
            {email: identifier}]});

        //si no existe returnar 404
        if(!user){
            return res.status(404).json({error: "User not found"});
        }
        // si existe se verifica la contra
        // si la password no coincide se devuelve 401
        if(!user.comparePassword(password)){
            return res.status(401).json({error: "La contraseña es incorrecta"});
        }

        // si la password coincide se logea

        // Se crea el token
        const token = await createToken(user._id);

        // almacenar token
        let _tokens = [... user.tokens];
        const _verifyPromises = _tokens.map(async(_t) => {
            const status = await verifyToken(_t);
            return status ? _t : null;
        })

        _tokens = (await Promise.all(_verifyPromises))
        .filter(_t => _t)
        .slice(0, 4);

        _tokens = [token, ... _tokens];
        user.tokens = _tokens;

        await user.save();

        return res.status(200).json({ token })
    } catch (error) {
        console.error(error);
        return res.status(500).json({error: "internal server error"});
    }
}

module.exports = controller;