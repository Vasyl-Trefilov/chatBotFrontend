/**
 * @input {string} backgroundColor - Background color of the chat window.
 * @input {string} inputColor - Color of the text in the input field.
 * @input {string} botMassageColor - Color of the bot's messages.
 * @input {string} userMassageColor - Color of the user's messages.
 * @input {string} sendColor - Color of the send button (button to send a message).
 * @input {string} scrollbarColor - Color of the scrollbar.
 * @input {string} scrollbarTrackColor - Color of the scrollbar track.
 * @input {string} aiUrl - URL endpoint for the AI service to handle chat requests.
 * @input {string} left - The left position of the chat window on the screen.
 * @input {string} bottom - The bottom position of the chat window on the screen.
 * @input {string} top - The top position of the chat window on the screen.
 * @input {string} right - The right position of the chat window on the screen.
 * @input {string} width - Width of the chat window.
 * @input {string} height - Height of the chat window.
 * @input {string} borderRadius - The border radius of the chat window for rounded corners.
 * @input {string} boxShadow - The box shadow applied to the chat window for a 3D effect.
 * @input {string} placeholder - Just placeholder for chat input.
 * @input {boolean} show - Determines whether the chat window is shown (true) or hidden (false).
 * @input {string} btnBackgroundImage - Background image of the button that opens the chat window.
 * @input {string} btnBackgroundSize - The size of the background image on the open button.
 * @input {string} btnLeft - The left position of the button that opens the chat window.
 * @input {string} btnBottom - The bottom position of the button that opens the chat window.
 * @input {string} btnTop - The top position of the button that opens the chat window.
 * @input {string} btnRight - The right position of the button that opens the chat window.
 * @input {string} btnWidth - The width of the button that opens the chat window.
 * @input {string} btnHeight - The height of the button that opens the chat window.
 * @input {string} btnBorderRadius - The border radius of the button that opens the chat window for rounded corners.
 * @input {string} btnBoxShadow - The box shadow applied to the button that opens the chat window.
 * @input {string} btnText - The text displayed on the button that opens the chat window.
 */

import {
  Component,
  ElementRef,
  ViewChild,
  AfterViewInit,
  OnDestroy,
  Input,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import gsap from 'gsap';
import axios from 'axios';
import Cookies from 'js-cookie';

interface Message {
  sender: 'user' | 'bot';
  text: string;
}
@Component({
  selector: 'app-chat-bot',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './chat-bot.component.html',
  styleUrls: ['./chat-bot.component.css'],
})
export class ChatBotComponent implements AfterViewInit, OnDestroy {
  @ViewChild('chatContainer') chatContainer!: ElementRef;
  @Input() backgroundColor: string = '#333';
  @Input() inputColor: string = 'white';
  @Input() botMassageColor: string = 'blue';
  @Input() userMassageColor: string = 'green';
  @Input() sendColor: string = 'green';
  @Input() scrollbarColor: string = 'gray';
  @Input() scrollbarTrackColor: string = '#333';
  @Input() aiUrl: string = 'http://localhost:5555';
  @Input() left: string = '10px';
  @Input() bottom: string = '';
  @Input() top: string = '';
  @Input() right: string = '';
  @Input() width: string = '300px';
  @Input() height: string = '400px';
  @Input() borderRadius: string = '10px';
  @Input() boxShadow: string = '0px 4px 10px rgba(0, 0, 0, 0.2)';
  @Input() placeholder: string = 'Write message...';
  @Input() show: boolean = false;
  @Input() btnBackgroundImage: string = '';
  @Input() btnBackgroundSize: string = '';
  @Input() btnLeft: string = '';
  @Input() btnBottom: string = '10px';
  @Input() btnTop: string = '';
  @Input() btnRight: string = '10px';
  @Input() btnWidth: string = '70px';
  @Input() btnHeight: string = '70px';
  @Input() btnBorderRadius: string = '999px';
  @Input() startMessage: string =
    "Hi, I'm your personal assistant, how can I help you?";
  @Input() btnBoxShadow: string = '0px 4px 10px rgba(0, 0, 0, 0.2)';
  @Input() btnText: string = 'Open Chat';
  @Input() errorCon: string = '';
  @Input() webSiteUrl: string = 'https://www.quellwerke.de/';

  messages: Message[] = [];
  inputText: string = '';
  error: string = '';
  loading: boolean = false;
  isClosing: boolean = false;
  isClearing: boolean = false;
  showBlock: boolean = true;

  constructor() {}

  get widthInPixels(): number {
    const numericWidth = parseInt(this.width, 10);
    return numericWidth / 1.5;
  }

  toggleChat() {
    if (this.show) {
      this.animateClose();
    } else {
      this.animateOpen();
    }
  }

  ngAfterViewInit() {
    if (this.startMessage.trim() === '') {
      this.startMessage =
        "Hi, I'm your personal assistant, how can I help you?";
    }
    if (this.show === false) {
      this.showBlock = false;
    } else {
      if (this.show) {
        this.animateOpen();
      } else {
        this.animateClose();
      }
    }

    setTimeout(() => {
      this.loadMessages();
      this.show = true;
      this.showBlock = true;
    });
  }

  startAnimation() {
    const chatBotElement = document.getElementById('chatBot');
    if (chatBotElement) {
      gsap.to(chatBotElement, {
        scale: 0,
        duration: 0.001,
        onComplete: () => {
          this.show = false;
        },
      });
    }
  }

  ngOnDestroy() {
    this.animateClose();
  }

  loadMessages() {
    const savedMessages = Cookies.get('chatMessages');
    this.messages = savedMessages
      ? JSON.parse(savedMessages)
      : [
          {
            sender: 'bot',
            text: this.startMessage,
          },
        ];
  }

  saveMessages() {
    Cookies.set('chatMessages', JSON.stringify(this.messages), { expires: 7 });
  }

  animateOpen() {
    if (this.chatContainer) {
      const chatBotElement = this.chatContainer.nativeElement;
      gsap.to(chatBotElement, {
        opacity: 1,
        scale: 1,
        y: 0,
        duration: 0.6,
        onComplete: () => {
          this.show = true;
        },
      });
    }
  }

  animateClose() {
    const chatBotElement = document.getElementById('chatBot');
    if (chatBotElement) {
      gsap.to(chatBotElement, {
        opacity: 0,
        scale: 0,
        duration: 0.6,
        y: -100,
        onComplete: () => {
          this.show = false;
        },
      });
    }
  }

  async sendMessage() {
    if (this.isClearing || !this.inputText.trim()) return;

    this.error = '';
    this.messages.push({ sender: 'user', text: this.inputText });
    const userInput = this.inputText;

    this.inputText = '';

    this.loading = true;
    try {
      const response = await axios.post(this.aiUrl, {
        text: userInput,
        url: this.webSiteUrl,
      });

      this.messages.push({ sender: 'bot', text: response.data.reply });
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        if (
          error.response &&
          error.response.data &&
          error.response.data.reply
        ) {
          this.messages.push({
            sender: 'bot',
            text: error.response.data.reply,
          });
        } else {
          this.messages.push({ sender: 'bot', text: 'Error, server problem.' });
          this.error = this.errorCon;
        }
      } else {
        this.messages.push({
          sender: 'bot',
          text: this.errorCon,
        });
        this.error = this.errorCon;
      }
    } finally {
      this.loading = false;
      this.saveMessages();
    }
  }

  clearChat() {
    this.isClearing = true;
    this.messages = [
      {
        sender: 'bot',
        text: this.startMessage,
      },
    ];
    this.error = '';
    this.loading = false;
    this.isClearing = false;
    this.saveMessages();
  }
}
