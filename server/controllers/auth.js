const { connect } = require('getstream');
const bcrypt = require("bcrypt");
const StreamChat = require("stream-chat").StreamChat;
const crypto = require("crypto");

require("dotenv").config();

const api_key = process.env.STREAM_API_KEY;
const api_secret = process.env.STREAM_API_SECRET;
const app_id = process.env.STREAM_API_ID;

const signup = async (req, res) => {
	try {
		const client = StreamChat.getInstance(api_key, api_secret);

		const { fullName, username, password, phoneNumber, confirmPassword } = req.body;

		if(password !== confirmPassword) return res.json({ message: "Passwords do not match!" });

		const { users } = await client.queryUsers({ role: "user" });

		const userID = crypto.randomBytes(16).toString('hex');

		const serverClient = connect(api_key, api_secret, app_id);

		const hashedPassword = await bcrypt.hash(password, 10);

		const token = serverClient.createUserToken(userID);

		res.status(200).json({token, fullName, username, userID, hashedPassword, phoneNumber, users});

	} catch (error) {
			console.log(error);

			res.status(500).json({message: error});
	}
};

const login = async (req, res) => {
	try {
		const { username, password } = req.body;

		const serverClient = connect(api_key, api_secret, app_id);
		const client = StreamChat.getInstance(api_key, api_secret);

		const { users } = await client.queryUsers({ name: username });

		if(!users.length) return res.json({ message: "User not found" });

		const success = await bcrypt.compare(password, users[0].hashedPassword);

		const token = serverClient.createUserToken(users[0].id);

		if(success){
			res.status(200).json({ token, fullName: users[0].fullName, username, userID: users[0].id})
		} else {
			res.json({ message: "Incorrect password" })
		}

	} catch (error) {
			console.log(error);

			res.status(500).json({message: error});
	}
};

module.exports = { login, signup }
