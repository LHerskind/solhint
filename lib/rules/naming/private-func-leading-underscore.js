const BaseChecker = require('../base-checker')
const naming = require('../../common/identifier-naming')
const { severityDescription } = require('../../doc/utils')

const DEFAULT_SEVERITY = 'warn'

const ruleId = 'private-func-leading-underscore'
const meta = {
  type: 'naming',

  docs: {
    description:
      'Private and internal function names must start with a single underscore, unless they are in a library.',
    category: 'Style Guide Rules',
    options: [
      {
        description: severityDescription,
        default: DEFAULT_SEVERITY,
      },
    ],
  },

  isDefault: false,
  recommended: false,
  defaultSetup: [DEFAULT_SEVERITY],

  schema: null,
}

class PrivateFuncLeadingUnderscoreChecker extends BaseChecker {
  constructor(reporter) {
    super(reporter, ruleId, meta)
  }

  ContractDefinition(node) {
    if (node.kind === 'library') {
      this.inLibrary = true
    }
  }

  'ContractDefinition:exit'() {
    this.inLibrary = false
  }

  FunctionDefinition(node) {
    if (!node.name) {
      return
    }

    const isPrivate = node.visibility === 'private'
    const isInternal = node.visibility === 'internal' || node.visibility === 'default'
    const shouldHaveLeadingUnderscore = !this.inLibrary && (isPrivate || isInternal)
    this.validateName(node, shouldHaveLeadingUnderscore)
  }

  validateName(node, shouldHaveLeadingUnderscore) {
    if (node.name === null) {
      return
    }

    if (naming.hasLeadingUnderscore(node.name) !== shouldHaveLeadingUnderscore) {
      this._error(node, node.name, shouldHaveLeadingUnderscore)
    }
  }

  _error(node, name, shouldHaveLeadingUnderscore) {
    this.error(
      node,
      `Function '${name}' ${shouldHaveLeadingUnderscore ? 'should' : 'should not'} start with _`,
      this.fixStatement(node, shouldHaveLeadingUnderscore)
    )
  }

  fixStatement(node, shouldHaveLeadingUnderscore) {
    const range = node.range
    range[0] += 8

    return (fixer) =>
      shouldHaveLeadingUnderscore
        ? fixer.insertTextBeforeRange(range, ' _')
        : fixer.removeRange([range[0] + 1, range[0] + 1])
  }
}

module.exports = PrivateFuncLeadingUnderscoreChecker
