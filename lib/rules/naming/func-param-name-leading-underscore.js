const BaseChecker = require('../base-checker')
const naming = require('../../common/identifier-naming')

const ruleId = 'func-param-name-leading-underscore'
const meta = {
  type: 'naming',

  docs: {
    description: 'Function param name must start a single underscore',
    category: 'Style Guide Rules',
  },

  isDefault: false,
  recommended: false,
  defaultSetup: 'warn',

  schema: null,
}

class FunctionParamNameLeadingUnderscoreChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  FunctionDefinition(node) {
    node.parameters.forEach((parameter) => {
      if (parameter.name === null) {
        return
      }
      if (!naming.hasLeadingUnderscore(parameter.name)) {
        this._error(parameter, parameter.name, true)
      }
    })
  }

  _error(node, name, shouldHaveLeadingUnderscore) {
    this.error(
      node,
      `'${name}' ${shouldHaveLeadingUnderscore ? 'should' : 'should not'} start with _`,
      this.fixStatement(node, shouldHaveLeadingUnderscore)
    )
  }

  fixStatement(node, shouldHaveLeadingUnderscore) {
    const range = node.identifier.range
    range[0] -= 1

    return (fixer) =>
      shouldHaveLeadingUnderscore
        ? fixer.insertTextBeforeRange(range, ' _')
        : fixer.removeRange([range[0] + 1, range[0] + 1])
  }
}

module.exports = FunctionParamNameLeadingUnderscoreChecker
