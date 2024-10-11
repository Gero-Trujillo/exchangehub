import userModel from '../Models/userModel.js';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import validator from 'validator';

const createToken = (_id) => {
    return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
        expiresIn: 3 * 24 * 60 * 60
    });
}

const registerUser = async (req, res) => {

    try{
    const { name, email, password } = req.body;

    let user = await userModel.findOne({ email })
    if (user) return res.status(400).json('User with this email already exists');

    if(!name || !email || !password) return res.status(400).json('Please fill all fields');

    if(!validator.isEmail(email) ) return res.status(400).json('Invalid email');

    if(!validator.isStrongPassword(password)) return res.status(400).json('Password is not strong enough');
     user = new userModel({
        name,
        email,
        password
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(user.password, salt);
    
     await user.save();


    const token = createToken(user._id);

    res.status(200).json({ _id: user.id, name, email, token });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const loginUser = async (req, res) => {
    const { email, password } = req.body;

    try{
    let user = await userModel.findOne({ email })
    
    if (!user) return res.status(400).json('Invalid email or password');

    const isValidPassword = await bcrypt.compare(password, user.password);

    if (!isValidPassword) return res.status(400).json('Invalid email or password');
    const token = createToken(user._id);

    res.status(200).json({ _id: user.id, name: user.name, email, token });
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const findUser = async (req, res) => {
    const userId = req.params.userId;
    try{
        const user = await userModel.findById(userId);
        res.status(200).json(user);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const getUsers = async (req, res) => {
    try{
        const users = await userModel.find();
        res.status(200).json(users);
    }catch (error) {
        res.status(500).json({ error: error.message });
    }
}

export  {registerUser, loginUser, findUser, getUsers};