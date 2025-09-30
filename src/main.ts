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
import { App } from "./app.ts";

import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

declare const window: any;

window.Alpine = Alpine;

Alpine.plugin(persist);
Alpine.data("app", () => new App());
Alpine.start();
