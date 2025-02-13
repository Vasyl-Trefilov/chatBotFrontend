# ChatBot Angular Component

## Description

This is a chat bot component written in Angular that can be integrated into web applications to create an interactive chat with users. The component supports customization of appearance and settings such as colors, sizes, animations, and other parameters.

## Features

- Support for customizing chat appearance (background color, text color, size, and other parameters).
- Animations for opening and closing the chat window using GSAP.
- Integration with an API (e.g., using `axios`) to send messages and receive responses.
- Message storage using Cookies.
- Simple API for configuration via `@Input` parameters.
- Responsive design support (you can set the chat window and button positions and sizes).

## Installation

To install and use the component, follow these steps:

1. Install dependencies (if not already installed):

   ```bash
   npm install gsap axios js-cookie
   ```

2. Import the component into your Angular project:

   In your module (e.g., `app.module.ts`), add the import:

   ```typescript
   import { ChatBotComponent } from "ai-bot-snippet";
   ```

   And add it to the `declarations` section (if using a regular module) or `imports` (if it's a standalone component):

   ```typescript
   @NgModule({
     declarations: [
       /* other components */
     ],
     imports: [, /* other modules */ ChatBotComponent],
   })
   export class AppModule {}
   ```

3. Use the component in your template:

   ```html
   <app-chat-bot [aiUrl]="'http://your-api-url.com'" [show]="true" [width]="'350px'" [height]="'450px'" [backgroundColor]="'#fff'" [inputColor]="'#000'" [startMessage]="'Hello! How can I assist you today?'" [btnText]="'Chat with us!'"> </app-chat-bot>
   ```

## Input Parameters

The component provides many customizable parameters so you can adapt the chat's appearance and behavior to your needs:

- **backgroundColor**: The background color of the chat window.
- **inputColor**: The color of the text in the input field.
- **botMassageColor**: The color of the bot's messages.
- **userMassageColor**: The color of the user's messages.
- **sendColor**: The color of the send button.
- **scrollbarColor**: The color of the scrollbar.
- **scrollbarTrackColor**: The color of the scrollbar track.
- **aiUrl**: The URL for your API that will handle chat requests.
- **width**: The width of the chat window.
- **height**: The height of the chat window.
- **startMessage**: The message shown when the chat is first opened.
- **btnText**: The text on the button to open the chat.
- **show**: Determines if the chat window will be shown (true/false).
- **... and many others.**

You can find the full list of parameters in the component code.

## Usage

1. **Opening and Closing the Chat**: The chat can be opened or closed by clicking the button, which will automatically animate the chat window using `toggleChat()`.

2. **Sending Messages**: Messages are sent via the API URL specified in `aiUrl`. The component sends the user's text and receives a response from the server, which is added to the chat.

3. **Clearing the Chat**: You can clear the chat by using the `clearChat()` method. This will remove all messages and display the initial message.

4. **Animations**: The component uses the GSAP library for animations when opening and closing the chat window.

## Example

```html
<app-chat-bot [show]="true" [width]="'400px'" [height]="'500px'" [backgroundColor]="'#fff'" [inputColor]="'#333'" [startMessage]="'Welcome to our chat service! How can we assist you today?'" [aiUrl]="'http://api.example.com/chat'" [btnText]="'Open Chat'"> </app-chat-bot>
```

## Notes

- **API**: The component sends POST requests to the provided server via `axios`. You need to configure your server to handle the requests and respond with a message.
- **Cookies**: Messages are stored in cookies so that they persist between sessions.

## License

This project is licensed under the MIT License.
