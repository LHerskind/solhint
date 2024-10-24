---
warning:     "This is a dynamically generated file. Do not edit manually."
layout:      "default"
title:       "custom-error-over-require | Solhint"
---

# custom-error-over-require
![Recommended Badge](https://img.shields.io/badge/-Recommended-brightgreen)
![Category Badge](https://img.shields.io/badge/-Best%20Practise%20Rules-informational)
![Default Severity Badge warn](https://img.shields.io/badge/Default%20Severity-warn-yellow)
> The {"extends": "solhint:recommended"} property in a configuration file enables this rule.


## Description
Require should be replaced with Custom Errors reverts from solidity 0.8.4 and on.

## Options
This rule accepts an array of options:

| Index | Description                                           | Default Value |
| ----- | ----------------------------------------------------- | ------------- |
| 0     | Rule severity. Must be one of "error", "warn", "off". | warn          |


### Example Config
```json
{
  "rules": {
    "custom-error-over-require": ["warn"]
  }
}
```


## Examples
This rule does not have examples.

## Version
This rule is introduced in the latest version.

## Resources
- [Rule source](https://github.com/protofire/solhint/tree/master/lib/rules/best-practises/revert-custom-over-require.js)
- [Document source](https://github.com/protofire/solhint/tree/master/docs/rules/best-practises/revert-custom-over-require.md)
- [Test cases](https://github.com/protofire/solhint/tree/master/test/rules/best-practises/revert-custom-over-require.js)
