const User = require("../models/user");
const jwt = require("jsonwebtoken");
require("dotenv").config();

const signUp = async (req, res) => {
    const { username, email, password } = req.body;
    try {
        const hashedPassword = await User.encriptar(password)
        const newUser = User({
            username,
            email,
            password: hashedPassword
        });
        const saveUser = await newUser.save();
        const token = jwt.sign({ id: saveUser._id, name: saveUser.name }, process.env.SECRET, { expiresIn: 86400 });

        res.status(200).json({ token });

    } catch (error) {
        res.status(500).json({ mensaje: error.message });

    }

};
const signIn = async (req, res) => {
    try {
        const userFound = await User.findOne({ email: req.body.email });
        if (!userFound) return res.status(400).json({ message: "Usuario no encontrado" })
        const matchPassword = await User.comparar(req.body.password, userFound.password)
        if (!matchPassword) return res.status(401).json({ token: null, message: "Contraseña invalida" })
        const token = jwt.sign({ id: userFound._id, name: userFound.name }, process.env.SECRET, { expiresIn: 86400 })

        res.json({ token })

    } catch (error) {
        res.status(500).json({ message: error.message });
        console.log(error)
    }

};

module.exports = {
    signUp,
    signIn
}