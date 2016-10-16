import {Mongo} from 'meteor/mongo';
import validUrl from 'valid-url';
import { check, Match } from 'meteor/check';
// Default不會自動載入
// 要在client和server的main.js import

Meteor.methods({
    'links.insert':function(url){
        // validUrl.isUri(url); true: return url, false: return undefined
        // check(value, pattern)
        /* Match.Where(condition): 
        如果condition為true，check不做任何事
        如果condition為false，check throw Error 
        */
        check(url, Match.Where(url => validUrl.isUri(url)));
    }
});

export const Links=new Mongo.Collection("links");
