const test = require('node:test');
const assert = require('node:assert/strict');


test('fixture catalog is maintained', () => {
  const catalog = require('../../cypress/fixtures/users.json');
  assert.ok(Array.isArray(catalog));
  assert.ok(catalog.length >= 1);
});

test('base config uses retries', () => {
  const config = require('../../cypress.config.js');
  assert.equal(config.e2e.retries.runMode, 2);
});
