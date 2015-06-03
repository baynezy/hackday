//DB Setup
var AWS = require('aws-sdk');
AWS.config.region = 'eu-west-1';

AWS.config.accessKeyId = process.env.ACCESS_KEY_ID;

AWS.config.secretAccessKey = process.env.SECRET_ACCESS_KEY;

var dd = new AWS.DynamoDB();
var tableName = 'bbchack-day-annotation';
  
  exports.createAnnotationForVideo = function(annotationID, currentTime, videoID) {
     
	 var annotation = {
        'annotationID': { 'S': annotationID },
        'currentTime': { 'N': currentTime },
		'videoID':{'S': videoID }
      };
      // if (userID) item.userID = { 'N': userID };
      // item.level = { 'S': (level || 'info') };
      // if (message) item.message = { 'S': message };
      // if (details) item.details = { 'S': details }; 
      dd.putItem({
         'TableName': tableName,
         'Item': annotation
      }, function(err, data) {
         err && console.log(err);
      });
   };
// Use the function we just created...