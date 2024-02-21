# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.4.2] - 2024-02-21

### Fix
- Readd `haveRelatedTypes` list

## [1.4.1] - 2024-02-21

### Changed
- Add `AWS::MSK::BatchScramSecret` to unsupported tag property list

## [1.4.0] - 2024-02-20

### Changed
- Re-enable dictionary based tagging
- Update dictionary based type list
- Add `AWS::MSK::Cluster` to dictionary based tag property
- Add `AWS::MSK::Configuration` to unsupported tag property list

## [1.3.1] - 2023-11-24

### Changed
- Update correct plugin list on README

## [1.3.0] - 2023-11-24

### Added
- It's Open Source now
- CHANGELOG file
- LICENSE file

### Changed
- Load AWS configurations on `before:deploy:deploy` hook instead of plugin load