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
  // config (FIXME: these are w/e $persist type is...)
  apibase: string | null | any;
  apikey: string | null | any;
  model: string | null | any;
  antiglaze: boolean | any;

  // ui
  configmodal: boolean;

  constructor() {
    // config
    this.apibase = Alpine.$persist(null);
    this.apikey = Alpine.$persist(null);
    this.model = Alpine.$persist(null);
    this.antiglaze = Alpine.$persist(true);

    // ui
    this.configmodal = false;
  }

  autosize(bar: HTMLTextAreaElement): void {
    bar.style.height = "";
    bar.style.height = bar.scrollHeight + "px";
  }

  omnifunc(omni: string): void {
    // TODO: write the omnifunc???
    // [ ] decide how to score action selections in a common reference frame
    // [ ] determine what kind of input we got (command? natural language? etc)
    // [ ] rather, amongst all the shit we can do make a top-K spread
    console.log(omni);
  }

  doaction(): void {
    // TODO: lookup the action in our persist list -> do it
  }

  mkclient(): OpenAI {
    const baseURL = !!this.apibase
      ? this.apibase
      : "https://api.openai.com/v1/";

    const client = new OpenAI({
      baseURL: baseURL,
      apiKey: this.apikey,
      dangerouslyAllowBrowser: true,
    });

    return client;
  }
}
