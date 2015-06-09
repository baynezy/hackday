//DB Setup
var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

AWS.config.accessKeyId = process.env.ACCESS_KEY_ID;

AWS.config.secretAccessKey = process.env.SECRET_ACCESS_KEY;

var dd = new AWS.DynamoDB();
var tableName = 'bbchack-day-annotation';
  
exports.createAnnotationForVideo = function(annotationID, currentTime, videoID, name) {
  var annotation = {
      'annotationID': { 'S': annotationID },
      'currentTime': { 'N': currentTime },
      'videoID':{'S': videoID },
      'name' : {'S' : name}
   };
   
   
   dd.putItem({
      'TableName': tableName,
      'Item': annotation
   }, function(err, data) {
      console.log(err);
      console.log(data);
   });
};
  
exports.updateAnnotationForVideo = function(annotationID, currentTime, videoID, name, quote, comment) {
   var annotation = {
      'annotationID': { 'S': annotationID },
      'currentTime': { 'N': currentTime },
      'videoID':{'S': videoID },
      'name' : {'S' : name}
   };
   
   if (quote != '') annotation.quote = {'S': quote };
   if (comment != '') annotation.comment = {'S': comment };  
   
   dd.putItem({
      'TableName': tableName,
      'Item': annotation
   }, function(err, data) {
      console.log(err);
      console.log(data);
   });
};

exports.getDataCards = function(name, callback) {
   dd.getItem({
      'TableName': 'bbchack-day-datacard',
      'Key': {'dataCardID' : {'S' : name.toLowerCase()}}
   }, function(err, data) {
      console.log(err)
      console.log(data);
      callback(err, data);
   });
};