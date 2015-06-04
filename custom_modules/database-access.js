//DB Setup
var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

AWS.config.accessKeyId = process.env.ACCESS_KEY_ID;

AWS.config.secretAccessKey = process.env.SECRET_ACCESS_KEY;

var dd = new AWS.DynamoDB();
var tableName = 'bbchack-day-annotation';
  
exports.createAnnotationForVideo = function(annotationID, currentTime, videoID, name) {
   console.log(AWS.config.accessKeyId);
   console.log(AWS.config.secretAccessKey);
   
   var annotation = {
      'annotationID': { 'S': annotationID },
      'currentTime': { 'N': currentTime },
      'videoID':{'S': videoID },
      'name' : {'S' : name}
   };
   
   console.log(annotation);
   dd.putItem({
      'TableName': tableName,
      'Item': annotation
   }, function(err, data) {
      console.log(err);
      console.log(data);
   });
};
  
exports.updateAnnotationForVideo = function(annotationID, currentTime, videoID, name, quote, comment) {
   console.log(AWS.config.accessKeyId);
   console.log(AWS.config.secretAccessKey);
   
   var annotation = {
      'annotationID': { 'S': annotationID },
      'currentTime': { 'N': currentTime },
      'videoID':{'S': videoID },
      'name' : {'S' : name}
   };
   
   if (quote != '') annotation.quote = {'S': quote };
   if (comment != '') annotation.comment = {'S': comment };  
   
   console.log(annotation);
   
   dd.putItem({
      'TableName': tableName,
      'Item': annotation
   }, function(err, data) {
      console.log(err);
      console.log(data);
   });
};

exports.getDataCards = function(name, callback) {
   console.log(name);
   dd.getItem({
      'TableName': 'bbchack-day-datacard',
      'Key': {'dataCardID' : {'S' : name.toLowerCase()}}
   }, function(err, data) {
      console.log(err)
      console.log(data);
      callback(err, data);
   });
};