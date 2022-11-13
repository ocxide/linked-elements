import { Injectable } from "@angular/core";
import { LinkedElementsModule } from "../linked-elements.module";
import { BaseScrollStrategy } from "./base-scroll-strategy";

@Injectable({
    providedIn: "root"
})
export class RawScrollStrategy implements BaseScrollStrategy {
    scrollIntoView(element: HTMLElement): void {
        element.scroll();
    }
}