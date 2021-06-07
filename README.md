# next-connect and Passport

This example creates a basic [CRUD](https://en.wikipedia.org/wiki/Create,_read,_update_and_delete)
app using [next-connect](https://github.com/hoangvvo/next-connect) and cookie-based authentication
with [Passport.js](http://www.passportjs.org/). The cookie is securely encrypted using
[@hapi/iron](https://github.com/hapijs/iron).

The example shows how to do a sign up, login, logout, and account deactivation. It utilizes
[React Query](https://react-query.tanstack.com/) to fetch the API.

For demo purpose, the users database is stored in the cookie session. You need to replace it with an
actual database to store users in [db.js](lib/db.js).

## How to use

After running `npm install` or `yarn` to install dependencies, you can start the dev server:

```sh
yarn dev
# or
npm run dev
```

Click "Login" in the navbar to visit the login page where you can login or create an account if you
don't have one. Once logged in, you can visit your profile by clicking "Profile" in the navbar to
edit your user details or deactivate your account.
