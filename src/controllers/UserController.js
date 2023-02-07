const {db, filedValue } = require("../config/firebaseconfig");
const dotenv = require("dotenv");
const { generateAccessCode, sendMessage , getUserData} = require("../helpers/appHelpers");
const userDataCollection = db.collection("users");
dotenv.config();
module.exports = UserController = {
  CreateNewAccessCode: async (req, res) => {
    const data = req.body;

    // Generate code
    const accessCode = generateAccessCode();
    const accountSid = process.env.ACCOUNT_SID;
    const authToken = process.env.AUTH_TOKEN;

    const client = require("twilio")(accountSid, authToken);

    try {

      //Save data into firebasea
      const userData=await getUserData(userDataCollection, data.phoneNumber);
      data["accessCode"] = accessCode;
      if(userData){
        await userDataCollection.doc(userData.id).update(data);
      }else{
        await userDataCollection.add(data);
      }
      if(process.env.NODE_ENV==='production'){
      // Send SMS to provided
        await sendMessage(data.phoneNumber, client, accessCode);
      }
      //Return response
      res.status(201).send({
        success: true,
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        success: false,
        error: e,
      });
    }
  },
  ValidateAccessCode: async (req, res) => {
    try{
      const { accessCode, phoneNumber } = req.body;
      const userData= await getUserData(userDataCollection,phoneNumber);
      const fields = userData?.data();
      if (accessCode == fields?.accessCode) {
        await userDataCollection.doc(userData.id).update({"accessCode": filedValue.delete()});
        res.status(200).send({
          success: true,
        });
      }else {
        res.status(400).send({
          success: false,
        });  
      }
    }catch(e){
      console.log(error)
      res.status(500).send({
        success: false,
      }); 
    }
   
  },
};
