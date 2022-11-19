import { Observable } from 'rxjs';

export abstract class BaseRouteListener {
	abstract getRoute(): Observable<string | null | undefined>;
	abstract setRoute(route: string | null | undefined): void;
}
