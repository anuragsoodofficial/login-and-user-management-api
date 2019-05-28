const Types = require('./Common/CommonTypeDefs.type'); 
const Query = require('../types/Query/Query.type');
const Mutation = require('../types/Mutation/Mutation.type');

const typeDefs = [Types, Query, Mutation];
module.exports = typeDefs;