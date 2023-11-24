# serverless-tag-resources-oss
A serverless plugin to tag all resources on AWS

This is a clone of the [`serverless-tag-resources`](https://www.npmjs.com/package/serverless-tag-resources) as open-source

## Features
 * Tag all resources created by serverless
 * Tag all resources specified on resources section
 * Fix tags on dict based tag specification resources like *AWS::SSM::Parameter*
 * Add *Resource* tag automatically, setting *LogicalID* as value
 * Add *Stage* tag automatically

## Instalation

```
npm i serverless-tag-resources
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
