import { Meteor } from 'meteor/meteor';
import { Links } from '../imports/collections/links';
import { WebApp } from  'meteor/webapp'; // Server Component of meteor
import ConnectRoute from 'connect-route';

Meteor.startup(() => {
  // code to run on server at startup
  Meteor.publish('links', function() {
    return Links.find({}); // Only send cursor back
  });

});
// Execute whenever a user visit the url "localhost:3000/abcd"
function onRoute(req, res, next/*call next middleware to handle*/){
  // 將token從req取出，並從Link Collection找出token所對應的物件
  const link=Links.findOne({ token: req.params.token });

  if(link){
    // do redirect

    // Already on server, 不用使用Meteor.methods
    // 當client side發送操作資料庫的命令時，才需使用Meteor.methods
    Links.update(link, { $inc: { clicks: 1 }}); //click增加1
    res.writeHead(307, { "Location": link.url }); //307 redirect request
    res.end();
  }else{
    // Not found the link
    next(); // pass control to the next handler
  }
}
// http://localhost:3000    No match!
// http://localhost:3000/app    match "app" token!
const middleware = ConnectRoute(function(router){
   router.get("/:token", onRoute);
});

WebApp.connectHandlers.use(middleware); //use the middleware
