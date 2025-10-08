/* Copyright (C) 2025  Eric Izoita
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU Affero General Public License as published
 * by the Free Software Foundation, either version 3 of the License, or
 * (at your option) any later version.
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU Affero General Public License for more details.
 *
 * You should have received a copy of the GNU Affero General Public License
 * along with this program.  If not, see <https://www.gnu.org/licenses/>.
 */
import Alpine from "alpinejs";
import OpenAI from "openai";

export class App {
  // config
  apiurl = Alpine.$persist(null);
  apikey = Alpine.$persist(null);
  model = Alpine.$persist(null);
  glazing = Alpine.$persist("suppress");
  deception = Alpine.$persist("suppress");
  aislop = Alpine.$persist("suppress");
  rolemodel = Alpine.$persist(null);

  // state
  wide: boolean = false;
  configmodal: boolean = false;
  ntokens: number = 4103209; // TODO: actually tho
  actions: Action[] = [];

  lorem(n: number): string {
    const lorem: string =
      "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

    return lorem.repeat(n);
  }

  // TODO: context
  // TODO: store usage stats on tokens, steps, etc in persistent storage

  autosize(bar: HTMLTextAreaElement): void {
    bar.style.height = "";
    bar.style.height = bar.scrollHeight + "px";
  }

  collapse(bar: HTMLTextAreaElement): void {
    bar.style.height = "";
  }

  apiclient(): OpenAI {
    const baseURL = !!this.apiurl
      ? (this.apiurl as unknown as string)
      : "https://api.openai.com/v1/";

    return new OpenAI({
      baseURL: baseURL,
      apiKey: this.apikey as unknown as string,
      dangerouslyAllowBrowser: true,
    });
  }

  async apistatus(): Promise<string> {
    try {
      const models = await this.apiclient().models.list();

      if (
        this.model &&
        !models.data.some(
          (m: { id: string }) => m.id === (this.model as unknown as string),
        )
      ) {
        return "unknown model";
      }

      return "ok";
    } catch (err: any) {
      return err.status ? err.status : err.message;
    }
  }

  async omnifunc(input: string): Promise<void> {
    // input ~> fanout ~> merge + rerank ~> top k
    console.log(input);
    console.log("input.length =", input.length);
  }

  // TODO: write the code
  //       ↵: do and kill buffer
  // shift ↵: do but keep buffer and leave sel open (lets you keep picking)
  doaction(): void {}
}

interface Action {
  show: string;
}
