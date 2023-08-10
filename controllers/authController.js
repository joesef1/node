const asyncHandler = require("express-async-handler");
const {validateRegisterUser, validateLoginUser, validateUpdateUser, User} = require("../models/User");


/*
* @desc Register user
* @route /api/auth/register
* @method post
* @access public
*/

const registerUser =  asyncHandler(
  async (req,res) => {
    const { error } = validateRegisterUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({email: req.body.email});
    if (user) {
      return res.status(400).json({ message: "This user is already registered" });
    }

const salt = await bcrypt.genSalt(10);
req.body.password = await bcrypt.hash(req.body.password , salt)

    user = new User({
      email:    req.body.email,
      userName: req.body.userName,
      password: req.body.password,
    });
      
    const result = await user.save();
    const token = null


    const {password , ...other} = result._doc;

    res.status(201).json({...other, token});
  }
)



/*
* @desc login user
* @route /api/auth/login
* @method post
* @access public
*/
const loginUser = asyncHandler(
  async (req,res) => {
    const { error } = validateLoginUser(req.body);
    if (error) {
      return res.status(400).json({ message: error.details[0].message });
    }
    let user = await User.findOne({email: req.body.email});
    if (!user) {
      return res.status(400).json({ message: "invalid email or password" });
    }

    const isPasswordMatch = await bcrypt.compare(req.body.password , user.password)
    
    if (!isPasswordMatch) {
      return res.status(400).json({ message: "invalid email or password" });
    }

      
    const token = jwt.sign({id: user._id, isAdmin: user.isAdmin}, process.env.JWT_SECRET_KEY)


    const {password , ...other} = user._doc;

    res.status(201).json({...other, token});
  }
)

module.exports = {
  registerUser,
  loginUser,
}