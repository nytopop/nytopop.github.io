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
  configmodal: boolean = false;
  actions: Action[] = [];

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
        !models.data.some((m) => m.id === (this.model as unknown as string))
      ) {
        return "unknown model";
      }

      return "ok";
    } catch (err: any) {
      return err.status ? err.status : err.message;
    }
  }

  // TODO: write display logic => fill
  async omnifunc(omni: string): Promise<void> {
    // TODO: write the omnifunc???
    // [x] decide how to score action selections in a common reference frame [reranking task]
    //
    // [ ] figure out action generators over inputs ('here are possible actions in this context')
    //     ex: a 'config' builtin that does literal matching
    //
    // [ ] default task for reranking: coherent extrapolated volition (CEV) of input sender
    //     note: we want several (and we should permit 'compound' tasks (ux: display it somehow idk))
    //
    // [ ] figure out interface for how either of the above are applied (interface?)
    //
    // roughly, we need to produce a list of at most K potential actions based on input and ctx state.

    // pipeline so far: input ~> fanout ~> merge + rerank ~> top k
    console.log(omni);
  }

  doaction(): void {
    // TODO: lookup the action in our persist list -> do it
    // (action: string)
  }
}

interface Action {
  show: string; //
}
