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
import { v4 as uuidv4 } from "uuid";
import { createAvatar } from "@dicebear/core";
import { pixelArt } from "@dicebear/collection";

declare const window: any;

window.Alpine = Alpine;

Alpine.plugin(persist);

interface Workspace {
  ident: string;
}

interface App {
  // ui state
  configModal: boolean;
  workspaces: Workspace[];
  selected: number;

  // client config
  apiBaseURL: string | undefined;
  apiKey: string | undefined;
  model: string | undefined;

  // permissions
  nonsense: boolean;
  shenanigans: boolean;

  // api
  newWorkspace(): void;
  delWorkspace(): void;
  icon(seed: any, size: any): string;
  getClient(): OpenAI;
}

Alpine.data("app", function (this: { $persist: (v: any) => any }): App {
  let app: App = {
    configModal: false,
    workspaces: [],
    selected: 0, // TODO: persist ofc

    apiBaseURL: this.$persist(null),
    apiKey: this.$persist(null),
    model: this.$persist(null),

    nonsense: this.$persist(false),
    shenanigans: this.$persist(false),

    newWorkspace() {
      const ident = uuidv4();

      console.log(ident);

      this.workspaces.push({
        ident: ident,
      });

      this.selected = this.workspaces.length - 1;
    },

    delWorkspace() {
      this.workspaces.splice(this.selected, 1);

      if (this.workspaces.length === 0) {
        this.newWorkspace();
      }

      if (this.selected >= this.workspaces.length) {
        this.selected--;
      }
    },

    icon(seed, size) {
      const avatar = createAvatar(pixelArt, {
        seed: seed,
        size: size,
      });

      return avatar.toString();
    },

    getClient() {
      const baseURL = !!this.apiBaseURL
        ? this.apiBaseURL
        : "https://api.openai.com/v1/";

      const client = new OpenAI({
        baseURL: baseURL,
        apiKey: this.apiKey,
        dangerouslyAllowBrowser: true,
      });

      return client;
    },
  };

  return app;
});

Alpine.start();
