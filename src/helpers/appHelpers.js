module.exports = {
  generateAccessCode: () => {
    let result = "";
    const characters = "0123456789";
    for (var i = 0; i < 6; i++) {
      result += characters.charAt(
        Math.floor(Math.random() * characters.length)
      );
    }
    return result;
  },
  sendMessage: async (to, client, accessCode) => {
    console.log("====Sending message======");
    try {
      const response = await client.messages.create({
        body: `Your access code is ${accessCode}. Please type it to verify your phone number:`,
        to: to,
        from: "+12526514107",
      });
      console.log("====Message sent successfully======");
      return response;
    } catch (err) {
      console.log("====Error occured while sending message======", err);
    }
  },

  getUserData: async (userCollection, phoneNumber) => {
    const userData = await (
      await userCollection
        .where("phoneNumber", "==", phoneNumber)
        .limit(1)
        .get()
    ).docs[0];

    return userData;
  },

  getGitUser: async (userCollection, user, gitUserId) => {
    try {
      const githubUser = await (
        await userCollection
          .doc(user.id)
          .collection("favorite_github_users")
          .where("github_user_id", "==", gitUserId)
          .limit(1).get()
      ).docs[0];
      console.log(githubUser);
      return githubUser
    }catch(error){
      console.log(err)
      return null;
    }
    }
  
};
