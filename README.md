# serverless-tag-resources-oss

A serverless plugin to tag all resources on AWS

[![NPM Version](https://img.shields.io/npm/v/serverless-tag-resources-oss)](https://www.npmjs.com/package/serverless-tag-resources-oss) [![NPM Downloads](https://img.shields.io/npm/dt/serverless-tag-resources-oss)](https://www.npmjs.com/package/serverless-tag-resources-oss)

This is a clone of the [`serverless-tag-resources`](https://www.npmjs.com/package/serverless-tag-resources) as open-source

## Features

- Tag all resources created by serverless
- Tag all resources specified on resources section
- Fix tags on dict based tag specification resources like _AWS::SSM::Parameter_
- Add _Resource_ tag automatically, setting _LogicalID_ as value
- Add _Stage_ tag automatically

## Instalation

```
npm i serverless-tag-resources-oss
```

then add it in your plugins list:

```
plugins:
  - serverless-tag-resources-oss
```

## Tags Configuration

Using the tags configuration makes it possible to add key / value tags on all AWS Resources.

This plugin use stackTags values from provider specification.

```
  stackTags:
    Component: ${self:service}
    Scheduled: no
    Scope: protected
    Developer: ysaborit
    Customer: Common
```

## License

MIT
