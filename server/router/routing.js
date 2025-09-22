const express = require("express");
const router = express.Router();
const User = require("../models/schema");
const bcrypt = require("bcrypt");
const authenticate = require("../middlewares/authenticate");
const { encrypt, decrypt } = require("../models/EncDecManager");

router.get("/",(req,res)=>{
    res.send("Hello from the server");
})
router.post("/register", async (req, res) =>
{
    const { name, email, password, cpassword } = req.body;
    // console.log("from server body",req.body);
    
    if (!name || !email || !password || !cpassword)
    {
        return res.status(400).json({ error: "Invalid Credentials" })
    }
    else
    {
        if (password === cpassword)
        {

            try
            {
                const result = await User.findOne({ email: email });
                // console.log("in server ",result);
                
                if (result)
                {
                    return res.status(400).json({ error: "Email already exists." })
                }

                const newUser = new User({ name, email, password, cpassword });
                
                
                // hashing the password
                await newUser.save();
console.log("new user added ",newUser);
                return res.status(200).json({ message: "User created succressfully.",
                    data:newUser
                 })
            }
            catch (error)
            {
                console.log(error)
            }
        }
        else
        {
            return res.status(400).json({ error: "Invalid Credentials." })
        }
    }


    res.json({ error: "There was an internal error. Sorry for the inconvience." })
})

router.post("/login", async (req, res) =>
{
    const { email, password } = req.body;
    // console.log("email ",email,"password ",password);/
    
    if (!email || !password)
    {
        return res.status(400).json({ error: "Please fill the data." })
    }


    try
    {
        const emailExist = await User.findOne({ email: email });
        // console.log("emailExist ",emailExist);
        
        if (!emailExist)
        {
            return res.status(400).json({ error: "Invalid Credentials. Mail is Incorrect" })
        }

        const isMatch = await bcrypt.compare(password, emailExist.password);

        const token = await emailExist.generateAuthToken();

        if (isMatch)
        {
            res.cookie("jwtoken", token, {
                expires: new Date(Date.now() + 1*1000*60*60),
                httpOnly: true
            });

            return res.status(200).json({ message: "User login successfully.",
            data:emailExist
             })
        }

        else
        {
            return res.status(400).json({ error: "Invalid Credentials Password is Incorrect" });
        }

    }
    catch (error)
    {
        console.log(error)
    }

})

router.get("/authenticate", authenticate, async (req, res) =>
{
    res.send(req.rootUser);
})

router.post("/addnewpassword", authenticate, async (req, res) =>
{
console.log("add new password called ");


     
    const { platform, userPass, userEmail, platEmail } = req.body;
    
    console.log("body ",req.body);
    
    if (!platform || !userPass || !userEmail || !platEmail)
    {
        return res.status(400).json({ error: "Please fill the form properly" });
    }

    try
    {
        const rootUser = req.rootUser;


        const { iv, encryptedPassword } = encrypt(userPass);

        const isSaved = await rootUser.addNewPassword(encryptedPassword, iv, platform, platEmail);
        console.log("saved data in server ",isSaved);
        
        if (isSaved)
        {
            return res.status(200).json({ message: "Successfully added your password.",
                data1:isSaved,
                data2:req.body
             })
        }
        else
        {
            return res.status(400).json({ error: "Could not save the password." })
        }
    }
    catch (error)
    {
        console.log(error)
    }

    return res.status(400).json({ error: "An unknown error occured." })
})

router.post("/deletepassword", authenticate, async (req, res) =>
{
    const { id } = req.body;

    if (!id)
    {
        return res.status(400).json({ error: "Could not find data" })
    }

    try
    {
        const rootUser = req.rootUser;

        const isDeleted = await User.updateOne({ email: rootUser.email }, { $pull: { passwords: { _id: id } } });

        if (!isDeleted)
        {
            return res.status(400).json({ error: "Could not delete the password." })
        }

        return res.status(200).json({ "message": "Successfully deleted your password." })
    }
    catch (err)
    {
        console.log(err);
    }
})

router.get("/logout", (req, res) =>
{
    console.log("user ",req.user);
    
    console.log("cokkies ",req.cookies);
    
    res.clearCookie("jwtoken", { path: "/" });

    res.status(200).send("Logout");
})

router.post("/decrypt", (req, res) =>
{
    const { iv, encryptedPassword } = req.body;

    return res.status(200).send(decrypt(encryptedPassword, iv));
})


module.exports = router;