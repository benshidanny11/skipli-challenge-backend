# Project: Skipli challenge backend
> A challenge project
## Built With
- Languages: Node js(Javascript runtime environment)

## Getting started
To get a local copy of this project, Please follow these simple example steps.
### Prerequisites
- Node js [Get it here](https://nodejs.org/en/)

#### 1. Clone this repository or download the Zip folder:"

```bash command
$ git clone https://github.com/benshidanny11/skipli-challenge-backend.git
```
#### 2. Navigate to the location of the folder in your machine:
```bash command
you@your-Pc-name:~$ cd <skipli-challenge-backend>
```
#### 3. Press Enter to navigate to your local clone.

#### 4. Type `npm install` to istall dependencies 

#### 4. Type `npm run start-dev` to start development server.

Please remember to set environment variables using .env-example provided

### Requried variables
 
- ACCOUNT_SID: A String Identifier (SID) is a unique key that is used to identify specific resources provided by Twillio.
- AUTH_TOKEN: An auth token for accing Twillio SMS services provided by Twillio.
- GIT_TOKEN: We need this token to increase the number of request rate per hour. Get it from Github developer settings

## Live server

This [this link](https://skiplibackend.herokuapp.com/) is backend service and  [This](https://skiplichallenge.herokuapp.com/) is frontend.

## EndPoints

Below are the endpoints
 

| **Endpoint**               | **Methods**   | **Functionalities**    |**Data**                        |
| ---------------------------|---------------|------------------------|--------------------------------|
|/api/createaccesscode       | POST          | Create access code     |phoneNumber: String (Body data) |
|/api/validateaccessescode   | POST          | Validate access code   |phoneNumber: String (Body data), accessCode: String (Body data)| 
|/api/searchgithubusers      | GET           | Search github users    |query: String (Query string),page: Number (Query string), per_page:  Number (Query string)     |
|/api/getgithubprofile/{id}  | GET           | Get one github user    |id: String (Param)|
|/api/likegithubuse          | POST          | Like github user       |github_user_id: String (Query string), phone_number: String(Body data)|
|/api/getuserprofile         | GET           | Get user profile       |phone_number: String (Query string)


### Author

👤 **Daniel Urimubenshi**

- GitHub: [@benshidanny11](https://github.com/bensidanny11)
- Twitter: [@DBenshi](https://twitter.com/DBenshi)
- LinkedIn: [Daniel Urimubenshi](https://www.linkedin.com/in/danielurimubenshi/)

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

Feel free to check the [issues page](../../issues/).

## Show your support