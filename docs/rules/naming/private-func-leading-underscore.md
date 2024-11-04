---
warning:     "This is a dynamically generated file. Do not edit manually."
layout:      "default"
title:       "private-func-leading-underscore | Solhint"
---

# private-func-leading-underscore
![Category Badge](https://img.shields.io/badge/-Style%20Guide%20Rules-informational)
![Default Severity Badge warn](https://img.shields.io/badge/Default%20Severity-warn-yellow)

## Description
Private and internal function names must start with a single underscore, unless they are in a library or free.

## Options
This rule accepts an array of options:

| Index | Description                                           | Default Value |
| ----- | ----------------------------------------------------- | ------------- |
| 0     | Rule severity. Must be one of "error", "warn", "off". | warn          |


### Example Config
```json
{
  "rules": {
    "private-func-leading-underscore": ["warn"]
  }
}
```


## Examples
This rule does not have examples.

## Version
This rule is introduced in the latest version.

## Resources
- [Rule source](https://github.com/protofire/solhint/tree/master/lib/rules/naming/private-func-leading-underscore.js)
- [Document source](https://github.com/protofire/solhint/tree/master/docs/rules/naming/private-func-leading-underscore.md)
- [Test cases](https://github.com/protofire/solhint/tree/master/test/rules/naming/private-func-leading-underscore.js)
