import { keySelector, Operator } from "../common/types";
import { Enumerable } from "../enumerable_";
import { wrapInIterable, wrapInThunk, wrapInThunkIfOnlyFirstArgumentIsIterable } from "../common/wrap";

function _except<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>) {
    return wrapInIterable(function* () {
        if (typeof keySelector === "undefined") {
            keySelector = item => item;
        }
        var set = new Set<T>();
        var set2 = new Set<T>();
        var key;
        for (var s of source2) {
            set2.add(keySelector(s));
        }
        for (var item of source) {
            key = keySelector(item);
            if (!set.has(key)) {
                set.add(key);
                if (!set2.has(key)) {
                    yield item;
                }
            }
        }
    });
}

export function except<T>(source: Iterable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>): Iterable<T>;
export function except<T>(source2: Iterable<T>, keySelector?: keySelector<T, any>): Operator<T, T>;
export function except() {
    return wrapInThunkIfOnlyFirstArgumentIsIterable(arguments, _except);
}
declare module '../enumerable_' {
    interface Enumerable<T> {
        except(source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T>;
    }
}
Enumerable.prototype.except = function <T>(this: Enumerable<T>, source2: Iterable<T>, keySelector?: keySelector<T, any>): Enumerable<T> {
    return new Enumerable<T>(_except<T>(this, source2, keySelector));
};