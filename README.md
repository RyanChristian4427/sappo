# Sappo Web Chat

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.

### Prerequisites

What things you need to install the software and how to install them

```
Node / NPM
```

### Running

A step by step series of examples that tell you how to get a development env running.

Running the following command in both `react-client` and `express-server` will do all that is necessary to get the local servers running:

```
npm run serve
```

To use the application, navigate to `http://localhost:3000` in your browser of choice, and open a duplicate of that as well, to observe how a conversation would work. From there, you can choose a username from the top right of the screen, or alternatively, you will be prompted to choose one when sending a message. After choosing a name, a message will appear on the other tab alerting the "second user" that someone new has joined chat. This message will fade once someone else joins, or after 20 seconds have passed, which ever comes first. A message requires both a username and a text, so fill out the input field at the bottom of the screen. From there, you can open the `Add Details` menu from the button on the end of the input bar, or simply send the message. It will appear on your screen on the right-hand side, to indicate you've sent it, and on the "second user's", it will appear on the left.

## Project Creation Methods

The React Client was generated using Create React App, along with the optional '--typescript' flag. I made a small template before the project began, which included a basic example of routing, bulma (SASS style framework, mobx, and an API connection. The repository for that can be found [here](https://github.com/RyanChristian4427/react-typescript-mobx-boilerplate). Most of the template was cut out, as it was unnecessary.

The Express Server was originally a Microsoft Express-Typescript Template that can be found [here](https://github.com/Microsoft/TypeScript-Node-Starter), but I drastically had cut it down prior to the assessment starting. The cut down version can be found [here](https://github.com/RyanChristian4427/express-typescript-mongo-boilerplate).

## Major Choices

### Language

From the start, I chose to use TypeScript (TS), Microsoft's superset of JavaScript (JS) for both projects. TS at its core is just JS with types, so for little added complexity, you get all the reassurance of a strong type system, the effects of which are most pronounced when developing. Using TS saves valuable developer time by not forcing the developer to write long variable names to explicitly label types or just having them memorize the types; TS ensures that a string is assigned to a string typed variable, and a boolean to a boolean typed, and so on. A TS project can be picked up on months from now and the developer has to look no further than a variable declaration to remember what type something is. And, if the developer so chooses (though this isn't recommended), TS has an `any` type, which is the exact same as vanilla JS. So if a type is too complex or too open to future change, using `any` gives you the same level of flexibility that JS has, while keeping TS's benefits where you want them.

### Style

The choice for styling framework was quite a simple one, and I chose Bulma. Bulma is a free, open source CSS Framework that is built on Flexbox, and is designed to be mobile first, which is something that would be desired by the client. While other frameworks are also suited for this scope of project, I have existing experience with Bulma, so I can more quickly style with it, but it also allows me to justify using SASS/SCSS variables. It is incredibly convenient to make a color scheme that can be easily accessed across the project with variables, and it's especially convenient to use SASS color maps, which are basically pairings. You take two colors, a primary and a secondary, and you map that to a name. Using Bulma, you can then style components with `is-[color-name]` as a class name. Very quick, and very consistent, as well as scalable. These maps make dark or light modes very easy to implement in the future.

With my styling, while obviously using Bulma to its strengths (it uses more heros and simple navbars than Bootstrap's drawer menus or dashboard feel), I aimed to be as minimalistic as possible. As such, the hero header text will catch your attention as soon as you load the page, and you'll always have an easy way to see your current user name. The button for choosing your username is in the top right, which is where the user naturally tends to go to look for an options menu. Then, the chat is wide open. Simple scrolling chat container, with a clear input field at the bottom. Both the username and additional details modals shade the background to reduce any "busy" look that may arise. 

To choose the color scheme, I used [coolors.co](https://coolors.co/), a color pallet generator, that creates 5 colors. I simply ran this until I received an appealing theme that had a green-focus. The site specializes in creating color schemes that mesh well together, so I trust their judgement and experience over my own when it comes to color design.

### State Management
In some areas, I decided to use global state management in React, and for that I chose MobX, which is something I partly regret. MobX is a great state management tool, but some issues begin to arise when using TS specifically, like [this issue](https://github.com/mobxjs/mobx-react/issues/256). Unfortunately, `@inject`, which is the old way of injecting stores into components, fundamentally does not work with TS. There are many workarounds and half-solutions, but none can fix the problem. This was something I learned too late. I had used old resources to learn MobX (those resources still being less than a year old, but the environment moves quickly), and I did not realize that this way was frowned upon. So using MobX as I did required some workarounds that do not result in the most clean code, and while I would have liked to switch this system over, time is not unlimited. In retrospect, I'm not sure that I wouldn't cut MobX out entirely, as global state isn't strictly required. I do enjoy MobX, and it is a much cleaner and much less opinionated system than Redux, so I would choose it over Redux, but my implementation of it is not superb. 


### Code Style

Both the client and the server have their own `.eslintrc.js` files that dictate styling rules used, which are more or less identical. The differences arise where the client extends the react rules, and the server obviously does not. These rules are strictly adhered to. 

Unfortunately, Create React App (CRA) ships with their own eslint configuration that can not be edited by the user in anyway without ejecting, as Dan Abramov, the lead developer behind Redux and CRA, says [Create React App config is not about tastes](https://github.com/facebook/create-react-app/issues/808#issuecomment-252936434). As such, there are some incorrect linting errors that come up when running the React client that I can not turn off. For instance, warnings about type coercion using `==` instead of `===`, even though there is no type coercion in TS. It seems foolish to eject over such a minor issue like linting warnings, so I simply ignored them and used my own linting config, which can be ran by: `npm run lint`.


## Built With

* [React](https://reactjs.org/) - Web Library used to build the Client
  * [TypeScript](https://www.typescriptlang.org/) - Language used
  * [Bulma](https://bulma.io/) - SCSS Styling Framework
  * [MobX](https://mobx.js.org/README.html) - State Management Tool
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool
* [Express](https://expressjs.com/) - Web Framework Used to Build the API
  * [TypeScript](https://www.typescriptlang.org/) - Language Used
  * [MongoDB](https://www.mongodb.com/) - Database System Used for Persistence
  * [NPM](https://www.npmjs.com/) - Dependency Management Tool
