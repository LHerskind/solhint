const assert = require('assert')
const linter = require('../../../lib/index')
const { contractWith, libraryWith } = require('../../common/contract-builder')

describe('Linter - private-func-leading-underscore', () => {
  const SHOULD_WARN_CASES = [
    // warn when private/internal/default names don't start with _

    contractWith('function foo() {}'),
    contractWith('function foo() private {}'),
    contractWith('function foo() internal {}'),

    // warn when public/external names start with _
    contractWith('function _foo() public {}'),
    contractWith('function _foo() external {}'),

    // warn when internal/private functions are in libraries start with _
    libraryWith('function _foo() {}'),
    libraryWith('function _foo() internal {}'),
    libraryWith('function _foo() private {}'),
    libraryWith('function _foo() public {}'),
    libraryWith('function _foo() external {}'),
  ]

  const SHOULD_NOT_WARN_CASES = [
    // don't warn when private/internal/default names start with _
    contractWith('function _foo() {}'),
    contractWith('function _foo() private {}'),
    contractWith('function _foo() internal {}'),

    // don't warn when public/external names don't start with _
    contractWith('function foo() public {}'),
    contractWith('function foo() external {}'),
    libraryWith('function foo() public {}'),
    libraryWith('function foo() external {}'),

    // don't warn when internal/private functions are in libraries don't start with _
    libraryWith('function foo() internal {}'),
    libraryWith('function foo() private {}'),

    // don't warn for constructors
    contractWith('constructor() public {}'),

    // other names (variables, parameters, returns) shouldn't be affected by this rule
    contractWith('uint foo;'),
    contractWith('uint private foo;'),
    contractWith('uint internal foo;'),
    contractWith('uint public foo;'),
    contractWith('uint public foo = 2;'),
    contractWith('uint _foo;'),
    contractWith('uint private _foo;'),
    contractWith('uint internal _foo;'),
    contractWith('uint public _foo;'),
    contractWith('uint public _foo = 2;'),
  ]

  SHOULD_WARN_CASES.forEach((code, index) => {
    it(`should emit a warning (${index})`, () => {
      const report = linter.processStr(code, {
        rules: { 'private-func-leading-underscore': 'error' },
      })

      assert.equal(report.errorCount, 1)
    })
  })

  SHOULD_NOT_WARN_CASES.forEach((code, index) => {
    it(`should not emit a warning (${index})`, () => {
      const report = linter.processStr(code, {
        rules: { 'private-func-leading-underscore': 'error' },
      })

      assert.equal(report.errorCount, 0)
    })
  })
})
