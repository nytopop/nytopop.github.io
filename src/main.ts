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
import "./style.css";
import Alpine from "alpinejs";
import persist from "@alpinejs/persist";
import OpenAI from "openai";

declare const window: any;

window.Alpine = Alpine;

Alpine.plugin(persist);

interface App {
  // ui state
  configModal: boolean;

  // client config
  apiBaseURL: string | undefined;
  apiKey: string | undefined;
  model: string | undefined;

  // permissions
  nonsense: boolean;
  shenanigans: boolean;

  // api
  getClient(): OpenAI;
}

Alpine.data("app", function (this: { $persist: (v: any) => any }): App {
  return {
    configModal: false,

    apiBaseURL: this.$persist(""),
    apiKey: this.$persist(undefined),
    model: this.$persist(undefined),

    nonsense: this.$persist(false),
    shenanigans: this.$persist(false),

    getClient() {
      const baseURL =
        this.apiBaseURL == "" ? "https://api.openai.com/v1/" : this.apiBaseURL;

      const client = new OpenAI({
        baseURL: baseURL,
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true,
      });

      return client;
    },
  };
});

Alpine.start();
