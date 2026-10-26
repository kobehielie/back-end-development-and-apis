const caseConverter = require ("./index");
const assert = require ("node:assert/strict");

assert.strictEqual(
    caseConverter.getUpperCase ("hello free Code Camp!"),"HELLO FREE CODE CAMP!"
);
assert.strictEqual(
    caseConverter.getLowerCase ("hello free Code Camp!"),"hello free code camp!"
);

assert.strictEqual(
    caseConverter.getSentenceCase ("hello free Code Camp!"),"Hello free code camp!"
);
assert.strictEqual(
    caseConverter.getProperCase ("hello free Code Camp!"),"HELLO FREE CODE CAMP!"
);