export abstract class LLMAdapter {
  abstract apiKey: string;

  abstract analyseText(text: string, prompt: string): Promise<any>;
}
