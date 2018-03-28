# aws-sqs-highland

## An AWS SQS consumer, that produces a Highland.js stream

This module produces a [Highland.js](http://highlandjs.org/) stream as it consumes from AWS SQS.

### How to Use

```
    const sqs = require("aws-sqs-highland");
    sqs.consume(params);
```

The parameter options are:

```
{
  awsConfig: {
    accessKeyId: String,
    secretAccessKey: String,
    region: String
  },
  queueUrl: String [Required],
  maxNumberOfMessages: Number [Default: 5],
  visibilityTimeout: Number [Default: 0],
  waitTimeSeconds: Number [Default: 0]
}
```
