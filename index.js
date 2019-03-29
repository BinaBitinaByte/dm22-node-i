const express = require("express");
const app = express();
const users = require("./users");

/** In a regular JS function, we can pass
 * data in as parameters and use it
 * in the function. With HTTP requests,
 * we can only pass data through the URL
 * or the request Body, which we will cover Monday.
 */
function getUser(id) {
  // return the one user with that id
  const user = users.find(user => user.id === id);
  return user;
}
function getUserByEmail(email) {
  // return the one user with that email
  return users.find(user => user.email === email);
}
function getGoogleUsers() {
  // return all users with a google email as an array
  return users.filter(user => user.email.includes("google"));
}

app.get("/api/users", (request, response) => {
  /** A query comes in the form
   *  /api/users/?property=value
   * It does not change the route/path itself
   * and is optional for the server to handle.
   * Any queries on a request's URL are available
   * through request.query.
   * If our server doesn't handle a query, it
   * will just be ignored. */
  if (request.query.email) {
    const filteredUsers = users.filter(
      user =>
        user.email.includes(request.query.email) &&
        user.first_name.includes(request.query.first_name)
    );
    response.json(filteredUsers);
  } else {
    /** response.json sends a response
     * back to the client with the data
     * formatted as JSON
     */
    response.json(users);
  }
});

/**
 * We commented this route out so that
 * the /api/users/:email route could run.
 * Otherwise, Express will always
 * choose the first route that matches.
 */

// app.get("/api/users/:id", (request, response) => {
//   console.log(request.params);
//   const user = users.find(user => user.id === +request.params.id);
//   response.json(user);
// });

app.get("/api/users/:email", (request, response) => {
  /** request.params will always be an object.
   * Any values in the path/route that start
   * with ':' will be keys in the object
   */
  console.log(request.params);

  const user = users.find(user => user.email === request.params.email);
  console.log(user);
  if (user) {
    /** A status of 200 is the default,
     * so .status(200) is optional
     */
    response.status(200).json(user);
  } else {
    /**
     * If we want to provide more info
     * about why a request failed,
     * we can add a status with a specific meaning.
     * Reference http.cat for status codes.
     */
    response
      .status(404)
      .json({ error: "Not found. Please try a different email." });
  }
});

/**
 * app.listen tells Node to always
 * wait for http requests to our
 * IP address at the specified port,
 * in this case 5050.
 */

app.listen(5050, () => console.log("Listening on 5050"));
