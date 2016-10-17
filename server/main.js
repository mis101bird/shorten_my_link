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
    res.writeHead(307, { "Location": link.url }); //307 redirect request
    res.end();
  }else{
    // Not found the link
    next(); // Let someone else handle it 
  }
}
// http://localhost:3000    No match!
// http://localhost:3000/app    match "app" token!
const middleware = ConnectRoute(function(router){
   router.get("/:token", onRoute);
});

WebApp.connectHandlers.use(middleware);
