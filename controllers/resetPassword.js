

const JWT_SECRET ="hvdvay6ert72839289()aiyg8t87qt72393293883uhefiuh78ttq3ifi78272jbkj?[]]pou89ywe";
export const resetPassword=async(req,res)=>{
    const email = ({email:req.body})
    try {
      const oldUser = await User.findOne({ email });
      if (!oldUser) {
        return res.json({ status: "User Not Exists!!" });
      }
      const secret = JWT_SECRET + oldUser.password;
      const token = jwt.sign({ email: oldUser.email, id: oldUser._id }, secret, {
        expiresIn: "5m",
      });
      const link = `http://localhost:8800/reset-password/${oldUser._id}/${token}`;
      return res.status(200).json(link)
    } catch (error) {
        res.status(400).json(error)
    }

}


