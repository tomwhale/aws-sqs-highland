const H = require('highland');
const AWS = require('aws-sdk');
const sqs = new AWS.SQS({apiVersion: '2012-11-05'});

module.exports = ( { count, queueUrl, visibilityTimeout, waitTimeSeconds, maxRetry } = { } ) => {
  const generator = ( attempt ) => {
    return H ( ( push, next ) => {
      return H.wrapCallback ( receiveMessage ) ( {
         MaxNumberOfMessages: count || 5,
         QueueUrl: queueUrl,
         VisibilityTimeout: visibilityTimeout || 0,
         WaitTimeSeconds: waitTimeSeconds || 0
      } )
       .each ( items => {
         if ( items.length ) {
           retries = 0;

           items.forEach ( item => {
               push ( null, item );
           } );

           return setTimeout ( () => {
               next ( generator ( 0 ) );
           }, 0 );
         }

         if ( attempt < ( maxRetry || 3 ) ) {
           return setTimeout ( () => {
               next ( generator ( attempt + 1 ) );
           }, 0 );
         }

         return push ( null, H.nil );
       } )
    } );
  }

  return generator ( 0 );
};