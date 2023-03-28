//Reference DOC: https://docs.aws.amazon.com/cdk/api/v2/docs/aws-cdk-lib.aws_stepfunctions-readme.html

import {Stack, StackProps} from 'aws-cdk-lib';
import { Construct } from 'constructs';
// import * as sqs from 'aws-cdk-lib/aws-sqs';
import {join} from 'path';
import { Code, Function as LambdaFunction, Runtime } from "aws-cdk-lib/aws-lambda";
import * as sfn from "aws-cdk-lib/aws-stepfunctions";
import * as tasks from "aws-cdk-lib/aws-stepfunctions-tasks";

export class AwsStepsStack extends Stack {
  constructor(scope: Construct, id: string, props?: StackProps) {
    super(scope, id, props);

    const helloLambda = new LambdaFunction(this, 'helloLambda', {
            runtime: Runtime.NODEJS_16_X,
            code: Code.fromAsset(join(__dirname, '..','services','hello')),
            handler: 'hello.main'
        })
        
    const taskFn1 = new tasks.LambdaInvoke(this, 'Function 1',{
      lambdaFunction: helloLambda,
      // Lambda's result is in the attribute `guid`
      outputPath: '$.guid',
    })
  
  const taskFn2 = new tasks.LambdaInvoke(this, 'Function 2',{
      lambdaFunction: helloLambda,
      // Lambda's result is in the attribute `guid`
      inputPath: '$.guid',
      outputPath: '$.status'
    })
  
  const taskFn3 = new tasks.LambdaInvoke(this, 'Function 3',{
      lambdaFunction: helloLambda,
      // Lambda's result is in the attribute `guid`
      inputPath: '$.guid',
      outputPath: '$.status'
    })
  
  const taskFn4 = new tasks.LambdaInvoke(this, 'Function 4',{
      lambdaFunction: helloLambda,
      // Lambda's result is in the attribute `guid`
      inputPath: '$.guid',
      outputPath: '$.status'
    })
  
  const definition = taskFn1
    .next(taskFn2)
    .next(taskFn3)
    .next(taskFn4);
  
  
  new sfn.StateMachine(this, 'StateMachine',{
    definition,
    
  })
   
  }
}
