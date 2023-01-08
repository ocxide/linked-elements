export abstract class BaseScrollStrategy {
	abstract scrollIntoView(element: HTMLElement): void;
	abstract scrollTop(): void;
}
