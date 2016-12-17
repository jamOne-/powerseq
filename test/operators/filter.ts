import * as assert from "assert";
import { Enumerable, filter } from "../../src/index";

it('filter', function () {
    assert.deepEqual(Array.from(filter([1, 2, 3, 4], x => x % 2 === 0)), [2, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).filter(x => x % 2 === 0).toarray(), [2, 4]);
    assert.deepEqual(Enumerable.from([1, 2, 3, 4]).filter((x, index) => index % 2 === 0).toarray(), [1, 3]);
});

export const linq = "Where";