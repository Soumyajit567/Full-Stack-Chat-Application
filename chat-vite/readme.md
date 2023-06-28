# Installation of Modules

This application uses several additional libraries and modules, which can be installed using npm (node package manager). Here are the main ones and how to install them:

* Once inside the src directory, install all the necessary packages using:
    `npm install`

* Additional Library Installation requirements:

    1. React Router: This library provides a collection of navigational components that compose declaratively with your application. It can be installed using the command npm install react-router-dom.

    2. Axios: This is a promise-based HTTP client for the browser and node.js, used in this application to send requests to the server. It can be installed using the command npm install axios.

    3. Font Awesome: This library provides a collection of scalable vector icons that can be customized with CSS. In this application, it's used for the thumbs up and thumbs down icons. It can be installed using the command npm install @fortawesome/fontawesome-svg-core @fortawesome/free-solid-svg-icons @fortawesome/react-fontawesome.

    4. React Context: This is built into React, so you don't need to install it separately. In this application, it's used for sharing the global state (user's username) across components.


# Running the frontend

1. First, navigate to the project's directory
   `cd C:\Users\Soumya\Nimble_full_stack\chat-vite\src`
2. Run the command: `npm run dev`

# How to Use the Chat Room Application
After setting up the frontend project following the instructions in the "Getting Started" section, you can use the application by starting it with npm run dev. This will open a new tab in your default web browser, pointing to http://localhost:5137/, where the chat application is running.

At the start, you'll be greeted with the sign-in page. If you don't have an account yet, you can navigate to the sign-up page by clicking on the "Sign Up" link. Once you've signed up, you can sign in using the same credentials.

Once signed in, you'll be redirected to the chat page. Here you can see all the messages sent by all users. Each message displays the sender's username, the content of the message, and buttons for upvoting and downvoting the message.

You can send a new message by typing it into the input field at the bottom of the page and clicking the "Send" button or pressing Enter. Your new message will appear at the bottom of the chat.

At any point, you can log out by clicking the "Logout" button at the top of the chat page. This will clear your sign-in information and redirect you back to the sign-in page.


# Code Structure
This project is structured into a main application component (App.tsx) and several child components (SignIn.tsx, SignUp.tsx, Chat.tsx, and Message.tsx). The App.tsx component sets up the application routes and provides the UserContext for managing the user's state across the application.

The `SignIn.tsx` and `SignUp.tsx` components handle user authentication. They provide input fields for the user's username and password and buttons for submitting this information. Upon successful sign-in or sign-up, these components update the global user state and navigate to the chat page.

The `Chat.tsx` component handles displaying messages and sending new ones. It fetches the list of messages from the server, displays them using the `Message.tsx` component, and provides an input field for sending new messages. It also provides upvote and downvote buttons, which call the onUpvote and onDownvote functions passed in as props when clicked. It also provides the "Logout" button for logging out and returning to the sign-in page.

The `UserContext.tsx` file sets up a React context for managing the user's state across the application. It provides a username state variable and a setUsername function for updating this state.


# Limitations
The frontend of this application was developed without the use of Docker due to some system constraints. Despite multiple attempts, Docker wasn't able to successfully build containers and images for the frontend, possibly due to issues related to the project setup or system configuration.

On the other hand, Docker worked seamlessly for the backend, building containers and images as expected. This led to a situation where only the backend is containerized while the frontend isn't. Therefore, for the frontend, you'll need to set up the development environment manually as described above.

This lack of containerization for the frontend means that its runtime environment isn't isolated from the rest of your system, so any changes you make to your system could potentially affect the behavior of the application.

As a result, deployment in the miniKube (additional requiremnt) couldn't be done.