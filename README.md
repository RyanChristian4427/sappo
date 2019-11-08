# Sappo Web Chat

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

And the following in `express-server` if you intend to use an already setup MongoDB.Atlas instance, instead of a locally hosted docker image (which is included in a docker-compose file within `express-server`):

```
npm run serve:prod
```

To use the application, navigate to `http://localhost:3000` in your browser of choice, and open a duplicate tab as well, to observe how a conversation would work. 3 messages should be loaded in from the database to simulate joining an on-going conversation. 

From there, you can choose a username from the top right of the screen, or alternatively, you will be prompted to choose one when sending a message. After choosing a name, a message will appear for other users, anonymous or those who have also chosen a name, letting them know someone new has joined the chat and has chosen a name (so supposedly they'd like to talk or contribute). You can see this message on a second browser tab. This message will fade once someone else joins, or after 20 seconds have passed, which ever comes first.

A message requires both a username and a text, so fill out the input field at the bottom of the screen. Optionally, you can open the `Add Details` menu from the button on the end of the input bar, or simply send the message. The `Add Details` menu includes fields to enter an abundance, a species, provide your current coordinates using the Geolocation API, enter a temperature, and/or upload a picture. Each of these fields is optional, so you can add details for just one, all of them, or any combination you so choose. Pressing `Save Changes` from the `Add Details` menu will save without immediately sending, so you can overwrite the saved information by opening the menu again and filling it back out.
 
 Pressing send from the main screen will submit the message to all connected users. Messages matching your user name will appear on the right, and messages from others shall appear on the left. 

## Project Creation Methods

The React Client was generated using Create React App, along with the optional '--typescript' flag. I made a small template before the project began, which included a basic example of routing, Bulma (SASS style framework), MobX, and an API connection. The repository for that can be found [here](https://github.com/RyanChristian4427/react-typescript-mobx-boilerplate). Most of the template was cut out, as it was unnecessary.

The Express Server was originally a Microsoft Express-Typescript Template that can be found [here](https://github.com/Microsoft/TypeScript-Node-Starter), but I drastically had cut it down prior to the assessment starting. The cut down version can be found [here](https://github.com/RyanChristian4427/express-typescript-mongo-boilerplate). As I did not complete it before the project began, it was in a more cut down state than it needed to be, so throughout the project I referenced the original template to re-add some features like Mongoose and the Mongo connection. 

## Major Choices

### Language

From the start, I chose to use TypeScript (TS), Microsoft's superset of JavaScript (JS) for both sub-projects. TS at its core is just JS with types, so for little added complexity, you get all the reassurance of a strong type system, which gives developers confidence and speed as they know what types of values they are working with at any given point. Additional benefits include a better IDE experience thanks to predicted types, no type coercion (so you can't add 5 and 5 to accidentally get 55), and best of all, it's completely optional. TS includes a type called `any`, which, while very much discouraged, makes the variable act like a standard JS variable, without any type at all. 
 
TS gives the developer all the power to have additional safety where they want it, and to use vanilla JS everywhere else. It is only additional features with no real major drawback, although using TS does require you to compile your code before it can be executed, so for some large code bases, this could potentially be an annoyance. This project is small enough however where the compile time is not noticed.

### Style

The choice for styling framework was quite a simple one, and I chose Bulma. Bulma is a free, open source CSS Framework that is built on Flexbox, and is designed to be mobile first, which is something that would be desired by the client. While other frameworks wouldn't necessarily be poor choices, the combination of mobile-first philosophy and my previous experience using Bulma made it a better choice than the alternatives.

With my styling, while obviously using Bulma to its strengths (it uses more heros and simple navbars than Bootstrap's drawer menus or dashboard feel), I aimed to be as minimalistic as possible. As such, the hero header text will catch your attention as soon as you load the page, and you'll always have an easy way to see your current user name. The button for choosing your username is in the top right, which is where the user naturally tends to go to look for an options menu. Then, the chat is wide open. Simple scrolling chat container, with a clear input field at the bottom. Both the username and additional details modals shade the background to reduce any "busy" look that may arise. 

To choose the color scheme, I used [coolors.co](https://coolors.co/), a color pallet generator, that creates 5 colors. I simply ran this until I received an appealing theme that had a green-focus, to match the stereotypical frog.

### State Management
In some areas, I decided to use global state management in React, and for that I chose MobX, which was not without issue. MobX is a great state management tool, but some issues begin to arise when using TS specifically, like [this issue](https://github.com/mobxjs/mobx-react/issues/256). Unfortunately, `@inject`, which is the old way of injecting stores into components, fundamentally does not work with TS. There are many workarounds and half-solutions, but none can fix the problem.

This is one of the situations where the fast moving ecosystem can be extremely difficult to navigate, as resources less than a year old became outdated by just slightly newer sources. But the realization of the issue came too late. Knowing what I know now, I would not use class based components to avoid this issue, or maybe I would just try to cut MobX entirely, as while the global state is very convenient, it isn't strictly necessary. MobX  was however the right choice over Redux, as there is far less boilerplate needed, and while Redux is [said to be more scalable](https://blog.logrocket.com/redux-vs-mobx/), an application of this size likely wouldn't see the benefits. The simpler to implement solution was the better choice.

### Code Style

Both the client and the server have their own `.eslintrc.js` files that dictate styling rules used, which are more or less identical. The differences arise where the client extends the react rules, and the server does not. These rules are strictly adhered to. 

Unfortunately, Create React App (CRA) ships with their own eslint configuration that can not be edited by the user in anyway without ejecting, as Dan Abramov, the lead developer behind Redux and CRA, says "[Create React App config is not about tastes](https://github.com/facebook/create-react-app/issues/808#issuecomment-252936434)". As such, there are some incorrect linting errors that come up when running the React client that can not be turned off. For instance, warnings about type coercion using `==` instead of `===`, even though there is no type coercion in TS. It seems foolish to eject over such a minor issue like linting warnings, so the choice was made to simply appease those warnings where possible and using `===` even though it is not strictly necessary.

My own linting configurations can be access by running the following command: `npm run lint` in either directory.

## Testing

### Client
TS makes testing the client rather trivial: if an error does arise on compile, and if it doesn't arise on render, it's either a fundamental issue with logic, or it stems from incorrect data being passed in from an outside source. So the easiest method to test the client is to add tests to render each component, and that done.

This leaves logic errors, and the data entry errors. Logic errors that don't cause render issues tend to be misplacements of data, or giving incorrect values. For example, having an error message component render text while there are no errors, and disappear while there are. These issues unfortunately require a developer to look at them, so they were not considered for testing. This leaves incorrect data being passed through. While we the client can't ensure all data that's incoming will be correct, by routing all data through the server, we can use it instead to check the outgoing data, keeping the client safe from unwanted behaviour. As such, that was implemented, and when a new message is posted to the server, the server tests make sure that the right configuration of data is sent back to the clients to interpret.

### Server
Because of the rather limited scope of the server, it was quite easy to test. With only 2 API routes, a GET and a POST, a total of 3 tests covered 85% of the lines on the server, with the config file dragging down the percentage. 

Firstly, I tested the GET route to ensure it returns a 200 OK status, and then I tested that it returned the correct data (a saved message that would be loaded into the client on startup). With those two working, I tested the POST route by just sending the expected data, and ensuring it was added to the DB correctly. If the data had issues entering, it would return a 500 Server Error, but if it was successful, it too would return 200 OK. 

### Assumptions Made
* Moderately fast and accessible internet connections
* Access to devices to even use this service
* The users would speak English
* The users would prefer to use Celsius (It seems to be a safe assumption, but an assumption nonetheless)
* That as a Citizen Science project, there is no need to have secure, password protected user accounts. Simple screen names should suffice.

## Mocked Aspects
* The production database comes with 3 mocked messages to simulate an on-going conversation
* It could be said that the current "pick a user name" system is a mock for a real login, though I'm not sure a real login system is necessary

## Paradigms Used

#### Class-based Object Orientated
React Components, MobX Stores, Type Interfaces,

#### Prototype-base Object Orientated
Entirety of the Express Server, as it is still using Object Orientated TS, but without any classes

#### Imperative
Typescript is an imperative language, and as such, describes step by step how to achieve the end state, rather than leaving that up to the language to decide. 

#### Declarative
All HTML written counts as declarative, as it does nothing to state how a button gets drawn to the screen, only that it does get drawn. This is the opposite of imperative.

#### Event-Driven
Both React and Express would be examples of the event-driven, as React waits and listens for user input or state change, and Express waits for API calls. They don't necessarily follow any flow overall, but just wait for input, process the input, and wait again.

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

#### Logo

The logo used in the favicon and header of the app was made by another student electronically, imitating the drawn version provided to us. This logo came from an SVG, so it was scalable, and also had a transparent background, making it far superior. The creator gave it out for free use. I of course can not take any credit for it as it was not my labor.
