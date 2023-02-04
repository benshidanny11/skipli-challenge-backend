const axios = require("axios");
const { db } = require("../config/firebaseconfig");
const { getUserData, getGitUser } = require("../helpers/appHelpers");
const dotenv = require("dotenv");
const userDataCollection = db.collection("users");
dotenv.config();
module.exports = GithubController = {
  searchUsers: async (req, res) => {
    const { query, page, per_page } = req.query;
    try {
      const response = await axios.get(
        `https://api.github.com/search/users?q=${query}&page=${page}&per_page=${per_page}`
      );

      //Return response
      res.status(200).send({
        users: response.data.items.filter((user) => user.login.includes(query)),
      });
    } catch (e) {
      console.log(e);
      res.status(500).send({
        success: false,
        error: e,
      });
    }
  },
  getGitubUserProfile: async (req, res) => {
    const { userid } = req.params;
    try {
      const response = await axios.get(`https://api.github.com/user/${userid}`);

      //Return response
      res.status(200).send({
        user: {
          login: response.data.login,
          id: response.data.id,
          avatar_url: response.data.avatar_url,
          html_url: response.data.html_url,
          public_repos: response.data.public_repos,
          followers: response.data.followers,
        },
      });
    } catch (e) {
      res.status(404).send({
        user: {},
      });
    }
  },
  likeGithubUser: async (req, res) => {
    const { github_user_id } = req.query;
    const { phone_number } = req.body;
    try {
      //Return response

      const user = await getUserData(userDataCollection, phone_number);
      const gihubUser = await getGitUser(
        userDataCollection,
        user,
        github_user_id
      );

      if (gihubUser) {
        res.status(400).send({ error: "You already liked this user" });
        return;
      }

      userDataCollection
        .doc(user.id)
        .collection("favorite_github_users")
        .add({ github_user_id: github_user_id });
      res.status(200).send({ status: 200 });
    } catch (e) {
      res.status(500).send({
        success: false,
        error: e,
      });
    }
  },
  getUserProfile: async (req, res) => {
    const { phone_number } = req.body;
    try {
      const user = await getUserData(userDataCollection, phone_number);
      const favoliteUsers = await (
        await userDataCollection
          .doc(user.id)
          .collection("favorite_github_users")
          .get()
      ).docs;
      const dataGithubUsers = [];
      favoliteUsers.forEach((user) => dataGithubUsers.push(user.data()));
      let index = 0;
      const completeGithubProfiles = [];
      while (index < dataGithubUsers.length) {
        const response = await axios.get(
          `https://api.github.com/user/${dataGithubUsers[index].github_user_id}`
        );
        completeGithubProfiles.push(response.data);
        index++;
      }
      res.status(200).send({
        users: completeGithubProfiles,
      });
    } catch (e) {
      res.status(500).send({
        success: false,
        error: e,
      });
    }
  },
};
