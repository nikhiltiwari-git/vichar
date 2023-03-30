import User from '../models/user.js';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';

export const signin = async (req, res) => {

    const { email, password } = req.body;

    try {
        const existingUser = await User.findOne({ email });   
        if (!existingUser) {
            return res.status(404).json({ message: "User does not exist " });
        }
        // pehle user check hone chaiye fir authnetication fir token vrna db 500 dega
        const isPasswordCorrect = await bcrypt.compare(password, existingUser.password);
        if (!isPasswordCorrect){
            // console.log(password, existingUser.password);
            return res.status(400).json({ message: "Incorrect password" });
        }
        const token = jwt.sign({ email: existingUser.email, id: existingUser._id }, 'test');
        res.status(200).json({ result: existingUser, token });
    } catch (err) {
        res.status(500).json({ message: err.message});
    }
}

export const signup = async (req, res) => {

    const { email, password, firstName, lastName, confirmPassword } = req.body;
    try {

        if (password !== confirmPassword) {
            return res.status(400).json({ message: "Passwords do not match " });
        }
        const newUser = await User.findOne({ email });
        if (newUser) {
            // console.log(newUser); vhi check krne ka redu
            return res.status(400).send({ message: " User already exists. "});
        }
        const hashedPassword = await bcrypt.hash(password, 12);
        const result = await User.create({ email, password: hashedPassword, name: `${firstName} ${lastName}` });
        const token = jwt.sign({ email: result.email, id: result._id }, 'test');
        res.status(200).json({ result, token });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
}