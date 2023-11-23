const aws = require('aws-sdk')

module.exports = class CloudformationClient {
  constructor(options = {}) {
    this.CloudFormation = new aws.CloudFormation(options)
  }

  async describeStackResources(stackName){
    let params = {
      StackName: stackName
    }
    try {
      let stackResources = await this.CloudFormation.describeStackResources(params).promise()
      return stackResources
    } catch (error) {
      console.log(`CloudformationClient::describeStackResources An error has occurred: ${JSON.stringify(error)}`)
      return false
    }
  }
}