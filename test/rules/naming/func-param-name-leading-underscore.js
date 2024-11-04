const assert = require('assert')
const linter = require('../../../lib/index')
const { contractWith, libraryWith } = require('../../common/contract-builder')

describe('Linter - func-param-name-leading-underscore', () => {
  const SHOULD_WARN_CASES = [
    // warn when param names don't start with _
    contractWith('struct foo { uint bar; }\nfunction foo(foo memory bar) {}'),

    contractWith('function foo(uint bar) {}'),
    contractWith('function foo(uint bar) internal {}'),
    contractWith('function foo(uint bar) private {}'),
    contractWith('function foo(uint bar) public {}'),
    contractWith('function foo(uint bar) external {}'),

    libraryWith('function foo(uint bar) {}'),
    libraryWith('function foo(uint bar) internal {}'),
    libraryWith('function foo(uint bar) private {}'),
    libraryWith('function foo(uint bar) public {}'),
    libraryWith('function foo(uint bar) external {}'),
  ]

  const SHOULD_NOT_WARN_CASES = [
    contractWith('struct foo { uint bar; }\nfunction foo(foo memory _bar) {}'),

    // don't warn when public/external names don't start with _
    contractWith('uint public foo;'),
    contractWith('uint public foo = 2;'),
    contractWith('function foo() public {}'),
    contractWith('function foo() external {}'),
    libraryWith('function foo() public {}'),
    libraryWith('function foo() external {}'),

    // don't warn for constructors
    contractWith('constructor() public {}'),

    // other names (variables, parameters, returns) shouldn't be affected by this rule
    contractWith('function foo() public { uint bar; }'),
    contractWith('function _foo() returns (uint256) {}'),
    contractWith('function _foo() returns (uint256 bar) {}'),
    libraryWith('function foo() public { uint bar; }'),
    libraryWith('function _foo() returns (uint256) {}'),
    libraryWith('function _foo() internal returns (uint256 bar) {}'),
    contractWith('uint _foo;'),
    contractWith('uint private _foo;'),
    contractWith('uint internal _foo;'),
    contractWith('function _foo() {}'),
    contractWith('function _foo() private {}'),
    contractWith('function _foo() internal {}'),
    libraryWith('function _foo() {}'),
    libraryWith('function _foo() internal {}'),
    libraryWith('function _foo() private {}'),
  ]

  SHOULD_WARN_CASES.forEach((code, index) => {
    it(`should emit a warning (${index})`, () => {
      const report = linter.processStr(code, {
        rules: { 'func-param-name-leading-underscore': 'error' },
      })

      assert.equal(report.errorCount, 1)
    })
  })

  SHOULD_NOT_WARN_CASES.forEach((code, index) => {
    it(`should not emit a warning (${index})`, () => {
      const report = linter.processStr(code, {
        rules: { 'func-param-name-leading-underscore': 'error' },
      })

      assert.equal(report.errorCount, 0)
    })
  })
})
