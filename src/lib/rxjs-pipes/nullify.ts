import type { OperatorFunction } from 'rxjs';
import { map } from 'rxjs/operators';

export function nullify<T>(): OperatorFunction<T | undefined | null, T | null> {
	return obs => obs.pipe(map(t => (t == null ? null : t)));
}
