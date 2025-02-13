import { Component } from '@angular/core';
import { ChatBotComponent } from 'ai-bot-snippet';

@Component({
  selector: 'app-root',
  imports: [ChatBotComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
