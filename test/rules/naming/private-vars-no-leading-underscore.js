const assert = require('assert')
const linter = require('../../../lib/index')
const { contractWith, libraryWith } = require('../../common/contract-builder')

describe('Linter - private-vars-no-leading-underscore', () => {
  const SHOULD_WARN_CASES = [
    // warn when private/internal/default names don't start with _
    contractWith('uint _foo;'),
    contractWith('uint private _foo;'),
    contractWith('uint internal _foo;'),

    // warn when public/external names start with _
    contractWith('uint public _foo;'),
    contractWith('uint external _foo;'),
  ]

  const SHOULD_NOT_WARN_CASES = [
    // don't warn when private/internal/default names start with _
    contractWith('uint foo;'),
    contractWith('uint private foo;'),
    contractWith('uint internal foo;'),

    // don't warn when public/external names don't start with _
    contractWith('uint public foo;'),
    contractWith('uint public foo = 2;'),

    // other names (functions, parameters, returns) shouldn't be affected by this rule
    contractWith('function foo(uint bar) external {}'),
    contractWith('function foo() public { uint bar; }'),
    contractWith('function _foo() returns (uint256) {}'),
    contractWith('function _foo() returns (uint256 bar) {}'),
    libraryWith('function foo(uint bar) external {}'),
    libraryWith('function foo() public { uint bar; }'),
    libraryWith('function _foo() returns (uint256) {}'),
    libraryWith('function _foo() internal returns (uint256 bar) {}'),
  ]

  SHOULD_WARN_CASES.forEach((code, index) => {
    it(`should emit a warning (${index})`, () => {
      const report = linter.processStr(code, {
        rules: { 'private-vars-no-leading-underscore': 'error' },
      })

      assert.equal(report.errorCount, 1)
    })
  })

  SHOULD_NOT_WARN_CASES.forEach((code, index) => {
    it(`should not emit a warning (${index})`, () => {
      const report = linter.processStr(code, {
        rules: { 'private-vars-no-leading-underscore': 'error' },
      })

      assert.equal(report.errorCount, 0)
    })
  })
})
