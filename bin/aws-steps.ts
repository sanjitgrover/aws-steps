#!/usr/bin/env node
import 'source-map-support/register';
import * as cdk from 'aws-cdk-lib';
import { AwsStepsStack } from '../lib/aws-steps-stack';

const app = new cdk.App();
new AwsStepsStack(app, 'AwsStepsStack');