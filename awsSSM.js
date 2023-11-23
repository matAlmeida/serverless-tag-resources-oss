const aws = require('aws-sdk')

module.exports = class SSMClient {
  constructor(options = {}) {
    this.SSM = new aws.SSM(options)
  }

  async addTagsToResource(pResourceId, pResourceType, pTags){
    let params = {
      ResourceId: pResourceId,
      ResourceType: pResourceType,
      Tags: pTags
    }
    try {
      let addUpdateTags = await this.SSM.addTagsToResource(params).promise()
      return addUpdateTags
    } catch (error) {
      console.log(`SSMClient::addTagsToResource An error has occurred: ${JSON.stringify(error)}`)
      return false
    }
  }
}