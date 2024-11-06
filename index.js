"use strict";
const aws = require("aws-sdk");

class TagResourcesServerlessPlugin {
  constructor(serverless, options) {
    this.serverless = serverless;
    this.options = options;
    this.awsService = this.serverless.getProvider("aws");
    this.stage = this.awsService.getStage();
    this.region = this.awsService.getRegion();
    this.partition = this.awsService.partition || "aws";

    this.unsupportedTypes = [
      "AWS::Lambda::Version",
      "AWS::Lambda::EventSourceMapping",
      "AWS::Lambda::LayerVersion",
      "AWS::Lambda::EventInvokeConfig",
      "AWS::Lambda::Alias",
      "AWS::Lambda::Permission",
      "AWS::Lambda::EventSourceMapping",
      "AWS::Lambda::LayerVersionPermission",
      "AWS::Lambda::Url",
      "AWS::Logs::LogStream",
      "AWS::Logs::Destination",
      "AWS::Logs::MetricFilter",
      "AWS::Logs::QueryDefinition",
      "AWS::Logs::ResourcePolicy",
      "AWS::Logs::SubscriptionFilter",
      "AWS::ApiGateway::Account",
      "AWS::ApiGateway::ApiKey",
      "AWS::ApiGateway::Method",
      "AWS::ApiGateway::Deployment",
      "AWS::ApiGateway::UsagePlanKey",
      "AWS::ApiGateway::BasePathMapping",
      "AWS::ApiGateway::Resource",
      "AWS::ApiGateway::Model",
      "AWS::ApiGateway::RequestValidator",
      "AWS::ApiGateway::GatewayResponse",
      "AWS::ApiGateway::Authorizer",
      "AWS::ApiGatewayV2::Integration",
      "AWS::ApiGatewayV2::Route",
      "AWS::ApiGatewayV2::ApiMapping",
      "AWS::ApiGatewayV2::ApiGatewayManagedOverrides",
      "AWS::ApiGatewayV2::Authorizer",
      "AWS::ApiGatewayV2::Deployment",
      "AWS::ApiGatewayV2::Integration",
      "AWS::ApiGatewayV2::IntegrationResponse",
      "AWS::ApiGatewayV2::Model",
      "AWS::ApiGatewayV2::Route",
      "AWS::ApiGatewayV2::RouteResponse",
      "AWS::AppSync::DataSource",
      "AWS::AppSync::ApiKey",
      "AWS::AppSync::ApiCache",
      "AWS::AppSync::DomainName",
      "AWS::AppSync::DomainNameApiAssociation",
      "AWS::AppSync::FunctionConfiguration",
      "AWS::AppSync::GraphQLSchema",
      "AWS::AppSync::Resolver",
      "AWS::Backup::BackupVault",
      "AWS::Backup::BackupSelection",
      "AWS::Backup::BackupPlan",
      "AWS::CodeDeploy::Application",
      "AWS::CodeDeploy::DeploymentConfig",
      "AWS::Cognito::IdentityPool",
      "AWS::Cognito::IdentityPoolRoleAttachment",
      "AWS::Cognito::UserPool",
      "AWS::Cognito::UserPoolDomain",
      "AWS::Cognito::UserPoolClient",
      "AWS::Cognito::UserPoolGroup",
      "AWS::Cognito::UserPoolUser",
      "AWS::Cognito::UserPoolUserToGroupAttachment",
      "AWS::Cognito::UserPoolIdentityProvider",
      "AWS::CloudWatch::Dashboard",
      "AWS::CloudFront::CloudFrontOriginAccessIdentity",
      "AWS::CloudFront::OriginAccessControl",
      "AWS::CloudFront::OriginRequestPolicy",
      "AWS::CloudFront::Function",
      "AWS::CloudFront::ResponseHeadersPolicy",
      "AWS::ElasticBeanstalk::ApplicationVersion",
      "AWS::ElasticBeanstalk::ConfigurationTemplate",
      "AWS::ElasticLoadBalancingV2::Listener",
      "AWS::ElasticLoadBalancingV2::ListenerRule",
      "AWS::EC2::SecurityGroupEgress",
      "AWS::Events::Rule",
      "AWS::Events::EventBusPolicy",
      "AWS::Events::Connection",
      "AWS::Events::ApiDestination",
      "AWS::Events::Endpoint",
      "AWS::Events::Archive",
      "AWS::EFS::FileSystem",
      "AWS::EFS::MountTarget",
      "AWS::EFS::AccessPoint",
      "AWS::GlobalAccelerator::Listener",
      "AWS::GlobalAccelerator::EndpointGroup",
      "AWS::Glue::Database",
      "AWS::Glue::Classifier",
      "AWS::Glue::Connection",
      "AWS::Glue::DataCatalogEncryptionSettings",
      "AWS::Glue::Partition",
      "AWS::Glue::SchemaVersion",
      "AWS::Glue::SchemaVersionMetadata",
      "AWS::Glue::SecurityConfiguration",
      "AWS::Glue::Table",
      "AWS::KMS::Alias",
      "AWS::Route53::HostedZone",
      "AWS::Route53::RecordSet",
      "AWS::Route53::RecordSetGroup",
      "AWS::Route53::HealthCheck",
      "AWS::S3::AccessPoint",
      "AWS::S3::BucketPolicy",
      "AWS::SES::ReceiptRuleSet",
      "AWS::SES::ReceiptRule",
      "AWS::SES::ConfigurationSet",
      "AWS::SES::ConfigurationSetEventDestination",
      "AWS::SES::ReceiptFilter",
      "AWS::SES::Template",
      "AWS::SNS::Subscription",
      "AWS::SNS::TopicPolicy",
      "AWS::SQS::QueuePolicy",
      "AWS::SSM::ResourceDataSync",
      "AWS::SecretsManager::SecretTargetAttachment",
      "AWS::SecretsManager::RotationSchedule",
      "AWS::SecretsManager::ResourcePolicy",
      "AWS::IAM::Policy",
      "AWS::IAM::AccessKey",
      "AWS::IAM::UserToGroupAddition",
      "AWS::IAM::ServiceLinkedRole",
      "AWS::IAM::ManagedPolicy",
      "AWS::IAM::InstanceProfile",
      "AWS::IAM::Group",
      "AWS::IAM::RolePolicy",
      "AWS::EC2::VPCGatewayAttachment",
      "AWS::EC2::Route",
      "AWS::EC2::SubnetRouteTableAssociation",
      "AWS::EC2::VPCDHCPOptionsAssociation",
      "AWS::EC2::VPCEndpoint",
      "AWS::EC2::TransitGatewayRoute",
      "AWS::EC2::TransitGatewayRouteTableAssociation",
      "AWS::EC2::TransitGatewayRouteTablePropagation",
      "AWS::ApplicationAutoScaling::ScalableTarget",
      "AWS::ApplicationAutoScaling::ScalingPolicy",
      "AWS::WAFv2::WebACLAssociation",
      "AWS::WAFv2::LoggingConfiguration",
      "AWS::OpenSearchServerless::AccessPolicy",
      "AWS::OpenSearchServerless::SecurityPolicy",
      "AWS::OpenSearchServerless::VpcEndpoint",
      "AWS::PinpointEmail::ConfigurationSetEventDestination",
      "AWS::Pinpoint::ADMChannel",
      "AWS::Pinpoint::APNSChannel",
      "AWS::Pinpoint::APNSSandboxChannel",
      "AWS::Pinpoint::APNSVoipChannel",
      "AWS::Pinpoint::APNSVoipSandboxChannel",
      "AWS::Pinpoint::ApplicationSettings",
      "AWS::Pinpoint::BaiduChannel",
      "AWS::Pinpoint::EmailChannel",
      "AWS::Pinpoint::EventStream",
      "AWS::Pinpoint::GCMChannel",
      "AWS::Pinpoint::SMSChannel",
      "AWS::Pinpoint::VoiceChannel",
      "AWS::QLDB::Ledger",
      "AWS::Scheduler::Schedule",
      "AWS::MSK::Configuration",
      "AWS::MSK::BatchScramSecret",
    ];

    this.tagDictBasedTypes = [
      "AWS::SSM::Parameter",
      "AWS::ApiGatewayV2::Api",
      "AWS::ApiGatewayV2::DomainName",
      "AWS::ApiGatewayV2::VpcLink",
      "AWS::Batch::ComputeEnvironment",
      "AWS::Batch::JobQueue",
      "AWS::Batch::SchedulingPolicy",
      "AWS::MSK::Cluster",
    ];

    this.otherBasedTypes = [
      "AWS::RDS::DBCluster", // Does not work on every cluster type
    ];

    this.haveRelatedTypes = [];

    this.hooks = {
      "before:package:finalize": this.tagResources.bind(this),
      "before:deploy:deploy": this.loadAwsCredentials.bind(this),
      "after:deploy:deploy": this.updateTagsPostDeploy.bind(this),
    };
  }

  _getRegion() {
    return this.region;
  }

  _getStage() {
    return this.stage;
  }

  _getPartition() {
    return this.partition;
  }

  _getTagNames(srcArray) {
    var tagNames = [];
    srcArray.forEach(function (element) {
      tagNames.push(element["Key"].toLowerCase());
    });
    return tagNames;
  }

  _listBasedStackTags() {
    var stackTags = [];
    if (typeof this.serverless.service.provider.stackTags === "object") {
      var tags = this.serverless.service.provider.stackTags;
      Object.keys(tags).forEach(function (key) {
        stackTags.push({ Key: key, Value: tags[key] });
      });
    }
    //Add stage
    let stageTag = [{ Key: "Stage", Value: this._getStage() }];
    stackTags.concat(
      stageTag.filter(
        (obj) =>
          this._getTagNames(stackTags).indexOf(obj["Key"].toLowerCase()) === -1
      )
    );
    return stackTags;
  }

  _dictBasedStackTags() {
    let stackTags = new Object();
    if (typeof this.serverless.service.provider.stackTags === "object") {
      stackTags = this.serverless.service.provider.stackTags;
    }
    //Add stage
    stackTags.Stage = this._getStage();
    return stackTags;
  }

  _excludeAWSTagsFilter(tag) {
    if ("Key" in tag && tag.Key.toLowerCase().includes("aws:")) {
      return false;
    } else {
      return true;
    }
  }

  async getEc2Resources(reservations) {
    let resources = [];
    for (let reservation of reservations) {
      let owner = reservation.OwnerId;
      for (let instance of reservation.Instances) {
        //Adding Volumes
        instance.BlockDeviceMappings.forEach((volume) => {
          resources.push(volume.Ebs.VolumeId);
        });
        //Adding NI
        for (let network of instance.NetworkInterfaces) {
          resources.push(network.NetworkInterfaceId);
          //Verify & Adding EIP
          if (network.Association) {
            let association = network.Association;
            if (association.IpOwnerId === owner) {
              let eipParams = {
                PublicIps: [association.PublicIp],
              };
              let addressResult = await this.ec2Service
                .describeAddresses(eipParams)
                .promise();
              addressResult.Addresses.forEach((address) => {
                resources.push(address.AllocationId);
              });
            }
          }
          //Adding SG
          network.Groups.forEach((group) => {
            resources.push(group.GroupId);
          });
        }
      }
    }
    return resources;
  }

  tagDictBasedResources(objResources, logicalID) {
    let stackTags = Object.assign({}, this._dictBasedStackTags());
    const tags = objResources.Resources[logicalID]["Properties"]["Tags"];
    if (tags) {
      for (let key in stackTags) {
        objResources.Resources[logicalID]["Properties"]["Tags"][key] =
          stackTags[key];
      }
    } else {
      objResources.Resources[logicalID]["Properties"]["Tags"] = stackTags;
    }
    //Adding/Updating Resource tag
    let tagResource = false;
    if (objResources.Resources[logicalID]["Properties"]["Tags"]) {
      for (let key in objResources.Resources[logicalID]["Properties"]["Tags"]) {
        if (key === "Resource") {
          objResources.Resources[logicalID]["Properties"]["Tags"]["Resource"] =
            logicalID;
          tagResource = true;
        }
      }
    }
    if (!tagResource) {
      objResources.Resources[logicalID]["Properties"]["Tags"]["Resource"] =
        logicalID;
    }
  }

  tagListBasedResources(objResources, logicalID) {
    let stackTags = [...this._listBasedStackTags()];
    var tags = objResources.Resources[logicalID]["Properties"]["Tags"];
    if (tags) {
      objResources.Resources[logicalID]["Properties"]["Tags"] = tags.concat(
        stackTags.filter(
          (obj) =>
            this._getTagNames(tags).indexOf(obj["Key"].toLowerCase()) === -1
        )
      );
    } else {
      objResources.Resources[logicalID]["Properties"]["Tags"] = stackTags;
    }
    //Adding/Updating Resource tag
    let tagResource = false;
    if (objResources.Resources[logicalID]["Properties"]["Tags"]) {
      objResources.Resources[logicalID]["Properties"]["Tags"].forEach((tag) => {
        if (tag["Key"] === "Resource") {
          tag["Value"] = logicalID;
          tagResource = true;
        }
      });
    }
    if (!tagResource) {
      objResources.Resources[logicalID]["Properties"]["Tags"].push({
        Key: "Resource",
        Value: logicalID,
      });
    }
  }

  loadAwsCredentials() {
    this.region = this.awsService.getRegion();
    aws.config.update({ region: this.region });
    const credentials = this.awsService.getCredentials();
    this.cfnService = new aws.CloudFormation(credentials);
    this.ssmService = new aws.SSM(credentials);
    this.iamService = new aws.IAM(credentials);
    this.rdsService = new aws.RDS(credentials);
    this.pinpointService = new aws.Pinpoint(credentials);
    this.apigwv2Service = new aws.ApiGatewayV2(credentials);
    this.firehoseService = new aws.Firehose(credentials);
    this.ec2Service = new aws.EC2(credentials);
  }

  async updateTagsPostDeploy() {
    this.serverless.cli.log("TAGGING: Updating tags post deploy...");
    const awsService = this.serverless.getProvider("aws");
    const stackName = awsService.naming.getStackName();
    const cfParams = { StackName: stackName };

    let cfStackResources = await this.cfnService
      .describeStackResources(cfParams)
      .promise();

    await this.updateDictBasedTags(cfStackResources);
    await this.updateOtherResourcesTags(cfStackResources);
    await this.tagRelatedResources(cfStackResources);
  }

  async tagRelatedResources(cfStackResources) {
    this.serverless.cli.log(
      "TAGGING: Updating related resources on stackTags..."
    );
    cfStackResources.StackResources.forEach(async (resource) => {
      let tagsList = [...this._listBasedStackTags()];
      // tagsList.push({ "Key": 'Resource', "Value": resource.LogicalResourceId })
      if (this.haveRelatedTypes.indexOf(resource.ResourceType) !== -1) {
        switch (resource.ResourceType) {
          case "AWS::EC2::Instance":
            let paramsEc2 = {
              InstanceIds: [resource.PhysicalResourceId],
            };
            let instancesResult = await this.ec2Service
              .describeInstances(paramsEc2)
              .promise();
            let ec2Tags = instancesResult.Reservations[0].Instances[0].Tags;
            ec2Tags = ec2Tags.filter(this._excludeAWSTagsFilter);
            let resources = await this.getEc2Resources(
              instancesResult.Reservations
            );
            let tagsParams = {
              Resources: resources,
              Tags: ec2Tags,
            };
            await this.ec2Service.createTags(tagsParams).promise();
            this.serverless.cli.log(
              `Related Resources Ids tagged: ${JSON.stringify(resources)}`
            );
            break;
        }
      }
    });
  }

  async updateOtherResourcesTags(cfStackResources) {
    this.serverless.cli.log(
      "TAGGING: Updating others list based resources on stackTags..."
    );
    cfStackResources.StackResources.forEach(async (resource) => {
      let tagsList = [...this._listBasedStackTags()];
      tagsList.push({ Key: "Resource", Value: resource.LogicalResourceId });
      if (this.otherBasedTypes.indexOf(resource.ResourceType) !== -1) {
        switch (resource.ResourceType) {
          case "AWS::IAM::Role":
            let iamParams = {
              RoleName: resource.PhysicalResourceId,
              Tags: tagsList,
            };
            await this.iamService.tagRole(iamParams).promise();
            break;
          case "AWS::RDS::DBCluster":
            let cfStack = resource.StackId.split(":");
            let accountId = cfStack[4];
            let rdsParams = {
              ResourceName: `arn:${this._getPartition()}:rds:${this._getRegion()}:${accountId}:cluster:${resource.PhysicalResourceId
                }`,
              Tags: tagsList,
            };
            await this.rdsService.addTagsToResource(rdsParams).promise();
            break;
          case "AWS::KinesisFirehose::DeliveryStream":
            let firehoseParams = {
              DeliveryStreamName: resource.PhysicalResourceId,
              Tags: tagsList,
            };
            await this.firehoseService
              .tagDeliveryStream(firehoseParams)
              .promise();
            break;
        }
      }
    });
  }

  async updateDictBasedTags(cfStackResources) {
    this.serverless.cli.log(
      "TAGGING: Updating dict based resources on stackTags..."
    );
    cfStackResources.StackResources.forEach(async (resource) => {
      let tagsList = [...this._listBasedStackTags()];
      tagsList.push({ Key: "Resource", Value: resource.LogicalResourceId });
      let tagsMap = Object.assign({}, this._dictBasedStackTags());
      tagsMap.Resource = resource.LogicalResourceId;
      if (this.tagDictBasedTypes.indexOf(resource.ResourceType) !== -1) {
        switch (resource.ResourceType) {
          case "AWS::SSM::Parameter":
            let ssmParams = {
              ResourceId: resource.PhysicalResourceId,
              ResourceType: "Parameter",
              Tags: tagsList,
            };
            await this.ssmService.addTagsToResource(ssmParams).promise();
            break;
          case "AWS::Pinpoint::App":
            let appParams = {
              ApplicationId: resource.PhysicalResourceId,
            };
            let ppApp = await this.pinpointService.getApp(appParams).promise();
            // this.serverless.cli.log(`ppApp: ${JSON.stringify(ppApp)}`)
            let pinpParams = {
              ResourceArn: ppApp.ApplicationResponse.Arn,
              TagsModel: {
                tags: {
                  ...tagsMap,
                },
              },
            };
            await this.pinpointService.tagResource(pinpParams).promise();
            break;
          case "AWS::ApiGatewayV2::Api":
            let apiv2Params = {
              ResourceArn: `arn:${this._getPartition()}:apigateway:${this._getRegion()}::/apis/${resource.PhysicalResourceId
                }`,
              Tags: {
                ...tagsMap,
              },
            };
            await this.apigwv2Service.tagResource(apiv2Params).promise();
            break;
          case "AWS::ApiGatewayV2::Stage":
            let apiV2 = cfStackResources.StackResources.find(
              (resource) => resource.ResourceType == "AWS::ApiGatewayV2::Api"
            );
            let stageV2Params = {
              ResourceArn: `arn:${this._getPartition()}:apigateway:${this._getRegion()}::/apis/${apiV2.PhysicalResourceId
                }/stages/${resource.PhysicalResourceId}`,
              Tags: {
                ...tagsMap,
              },
            };
            await this.apigwv2Service.tagResource(stageV2Params).promise();
            break;
        }
      }
    });
  }

  tagResources() {
    this.serverless.cli.log("TAGGING: Updating tags based on stackTags...");
    let self = this;
    const cfTemplate =
      this.serverless.service.provider.compiledCloudFormationTemplate || null;
    const awsResources = this.serverless.service.resources || null;
    //Tag serverless resources
    if (cfTemplate && cfTemplate.Resources) {
      Object.keys(cfTemplate.Resources).forEach((logicalID) => {
        let resourceType = cfTemplate.Resources[logicalID]["Type"];
        this.serverless.cli.log(
          `TAGGING: validating resource type => ${resourceType}`
        );
        let stackTags = [...this._listBasedStackTags()];
        if (
          self.unsupportedTypes.indexOf(resourceType) == -1 &&
          Array.isArray(stackTags) &&
          resourceType.toLowerCase().indexOf("custom::") == -1
        ) {
          if (cfTemplate.Resources[logicalID]["Properties"]) {
            if (self.tagDictBasedTypes.indexOf(resourceType) !== -1) {
              this.tagDictBasedResources(awsResources, logicalID)
            } else if (self.otherBasedTypes.indexOf(resourceType) == -1) {
              this.tagListBasedResources(cfTemplate, logicalID);
            }
          } else {
            self.serverless.cli.log(
              "Properties not available for " + resourceType
            );
          }
        }
        if (self.unsupportedTypes.indexOf(resourceType) == -1) {
          cfTemplate.Resources[logicalID]["Properties"];
        }
      });
    }
    //Tag cloudformation specified resources
    if (awsResources && awsResources.Resources) {
      Object.keys(awsResources.Resources).forEach((logicalID) => {
        let resourceType = awsResources.Resources[logicalID]["Type"];
        let stackTags = [...this._listBasedStackTags()];
        if (
          self.unsupportedTypes.indexOf(resourceType) == -1 &&
          Array.isArray(stackTags) /*&& stackTags.length > 0*/
        ) {
          if (awsResources.Resources[logicalID]["Properties"]) {
            if (self.tagDictBasedTypes.indexOf(resourceType) !== -1) {
              this.tagDictBasedResources(awsResources, logicalID)
            } else if (self.otherBasedTypes.indexOf(resourceType) == -1) {
              this.tagListBasedResources(awsResources, logicalID);
            }
          } else {
            self.serverless.cli.log(
              "Properties not available for " + resourceType
            );
          }
        }
      });
    }
  }
}

module.exports = TagResourcesServerlessPlugin;
