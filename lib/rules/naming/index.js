const ConstNameSnakecaseChecker = require('./const-name-snakecase')
const ContractNameCamelcaseChecker = require('./contract-name-camelcase')
const EventNameCamelcaseChecker = require('./event-name-camelcase')
const FuncNameMixedcaseChecker = require('./func-name-mixedcase')
const FuncParamNameMixedcaseChecker = require('./func-param-name-mixedcase')
const ModifierNameMixedcaseChecker = require('./modifier-name-mixedcase')
const PrivateVarsLeadingUnderscoreChecker = require('./private-vars-leading-underscore')
const UseForbiddenNameChecker = require('./use-forbidden-name')
const VarNameMixedcaseChecker = require('./var-name-mixedcase')
const NamedParametersMappingChecker = require('./named-parameters-mapping')
const ImmutableVarsNamingChecker = require('./immutable-vars-naming')
const FunctionNamedParametersChecker = require('./func-named-parameters')
const FoundryTestFunctionsChecker = require('./foundry-test-functions')
const ImportsOrderChecker = require('./imports-order')
const PrivateFuncLeadingUnderscoreChecker = require('./private-func-leading-underscore')
const PrivateVarsNoLeadingUnderscoreChecker = require('./private-vars-no-leading-underscore')
const FunctionParamNameLeadingUnderscoreChecker = require('./func-param-name-leading-underscore')

module.exports = function checkers(reporter, config) {
  return [
    new ConstNameSnakecaseChecker(reporter),
    new ContractNameCamelcaseChecker(reporter),
    new EventNameCamelcaseChecker(reporter),
    new FuncNameMixedcaseChecker(reporter),
    new FuncParamNameMixedcaseChecker(reporter),
    new ModifierNameMixedcaseChecker(reporter),
    new PrivateVarsLeadingUnderscoreChecker(reporter, config),
    new UseForbiddenNameChecker(reporter),
    new VarNameMixedcaseChecker(reporter),
    new NamedParametersMappingChecker(reporter),
    new ImmutableVarsNamingChecker(reporter, config),
    new FunctionNamedParametersChecker(reporter, config),
    new FoundryTestFunctionsChecker(reporter, config),
    new ImportsOrderChecker(reporter, config),
    new PrivateFuncLeadingUnderscoreChecker(reporter),
    new PrivateVarsNoLeadingUnderscoreChecker(reporter),
    new FunctionParamNameLeadingUnderscoreChecker(reporter),
  ]
}
