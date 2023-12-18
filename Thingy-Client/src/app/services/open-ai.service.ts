// open-ai.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { environment } from '../../environments/environment';

interface OpenAiChatResponse {
    choices: Array<{
      message: {
        role: string;
        content: string;
      };
    }>;
  }

@Injectable({
  providedIn: 'root'
})
export class OpenAiService {
  private openAiEndpoint = 'https://api.openai.com/v1/chat/completions'; // Chat endpoint

  constructor(private http: HttpClient) {}

  getThresholdSuggestions(deviceDetails: string): Observable<OpenAiChatResponse> {
    const data = {
      model: "gpt-4-1106-preview", // Specify the model
      messages: [
        {
          "role": "system",
          "content": "You are a helpful assistant."
        },
        {
          "role": "user",
          "content": `Given an IoT device placed in the fruits and vegetables sections with details: ${deviceDetails}, suggest optimal threshold settings for temperature, humidity, and CO2 levels. Please provide concise and direct recommendations, not morethan 150 words please`
        }
      ],
      temperature: 1,
      max_tokens: 256, // Up to 256 words
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0
    };

    return this.http.post<OpenAiChatResponse>(this.openAiEndpoint, data, {
        headers: {
          'Authorization': `Bearer ${environment.openaiApiKey}`,
          'Content-Type': 'application/json'
        }
    });
  }
}
