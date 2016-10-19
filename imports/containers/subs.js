export const subs = new SubsManager({
    // maximum number of cache subscriptions
    cacheLimit: 30,
    // any subscription will be expire after 5 minute, if it's not subscribed again
    expireIn: 15
});
