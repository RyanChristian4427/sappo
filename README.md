# Sappo Web Chat

This project was an assignment we were given in the first semester of third year university, and was based upon React and NodeJS. The proforma and rubric can be found in [proforma](proforma.pdf).

The main purpose of the app was to build a small chat platform that could be used for a citizen science project in Brazil, collecting data about frogs. This app will allow you to send and receive messages in real time, send images, and have them all persist.

The `improved` branch of this project contains the updates I applied after continuing to working with React and Express, while the `as-submitted` branch contains the code as it was at submission, along with my writeup for the submission in the [ReadMe](https://github.com/RyanChristian4427/sappo/blob/as-submitted/README.md).

Because this was very much a 'learn as you go' experience, many of the choices and design decisions I made in the original turned out to cause many pain points, and I elaborate on this quite a bit in the [ReadMe](https://github.com/RyanChristian4427/sappo/blob/as-submitted/README.md). As we continued on to do a much longer term project just after, what I learned here went on to make the second project a much smoother experience.

The `as-submitted` branch earned me a high first in marks.

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to run the software:

```
Node
NPM
```

### Running

A step by step series of examples that tell you how to get a development environment running.

Running the following command in both `react-client` and `express-server` will install the dependencies necessary for the client and server:

```
npm install
```

Once installation is complete, run the following in `react-client`:

```
npm run serve
```

And the following in `express-server` if you intend to use an already setup MongoDB.Atlas instance, instead of a locally hosted Mongo database:

```
npm run serve:prod
```

If you do choose to use a local database, I have included a docker-compose file in `express-server` that you can use, and the development profile is already set up to use. If you have a local install, you will need to edit the [.env](express-server/.env) file and enter your database's URL and credentials. The development profile can then be ran via:

```
npm run serve:dev
```

To use the application, navigate to `http://localhost:3000` in your browser of choice, and open a duplicate tab as well, to observe how a conversation would work. 3 messages should be loaded in from the database to simulate joining an on-going conversation. 

From there, you can choose a username from the top right of the screen, or alternatively, you will be prompted to choose one when sending a message. After choosing a name, a message will appear for other users, anonymous or those who have also chosen a name, letting them know someone new has joined the chat and has chosen a name (so supposedly they'd like to talk or contribute). You can see this message on the second browser tab, and is located towards the bottom of the screen, right above the text entry field. This message will fade once someone else joins, or after 20 seconds have passed, which ever comes first.

A message requires both a username and text, so fill out the input field at the bottom of the screen. Optionally, you can open the `Add Details` menu from the button on the end of the input bar, or simply send the message. The `Add Details` menu includes fields to enter an abundance, a species, provide your current coordinates using the Geolocation API, enter a temperature, and/or upload a picture. Each of these fields is optional, so you can add details for just one, all of them, or any combination you so choose. Pressing `Save Changes` from the `Add Details` menu will save without immediately sending, so you can overwrite the saved information by opening the menu again and filling it back out.
 
 Pressing send from the main screen will submit the message to all connected users. Messages matching your user name will appear on the right, and messages from others shall appear on the left. This message is then stored on the database so others who join the chat afterwards can see it as well.

## Built With

* [React](https://reactjs.org/) - Web Library used to build the Client
  * [TypeScript](https://www.typescriptlang.org/) - Language used
  * [Bulma](https://bulma.io/) - SCSS Styling Framework
  * [MobX](https://mobx.js.org/README.html) - State Management Tool
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool
* [Express](https://expressjs.com/) - Web Framework Used to Build the API
  * [TypeScript](https://www.typescriptlang.org/) - Language Used
  * [MongoDB](https://www.mongodb.com/) - Database System Used for Persistence
  * [Mongoose](https://mongoosejs.com/) - ODM Tool Used Interface with Mongo
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool

## Authors

* **Ryan Christian** - *All Around Developer* - [Ryan Christian](https://github.com/RyanChristian4427)

## Acknowledgments

* ### Logo

    The logo used in the favicon and header of the app was made by another student electronically, imitating the drawn version provided to us. This logo came from an SVG, so it was scalable, and also had a transparent background, making it far superior. The creator gave it out for free use. I of course can not take any credit for it as it was not my labor.
