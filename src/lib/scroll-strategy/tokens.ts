import { InjectionToken } from "@angular/core";
import { BaseScrollStrategy } from "./base-scroll-strategy";

export const PrimaryScrollStrategy = new InjectionToken<BaseScrollStrategy>('PRIMARY_SCROLL_STRATEGY');
export const SecondaryScrollStrategy = new InjectionToken<BaseScrollStrategy>('SECONDARY_SCROLL_STRATEGY');