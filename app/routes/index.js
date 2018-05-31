module.exports = function(application){
    application.get('/', function(req, res){
        application.app.controllers.index.loadIndex(application, req ,res);
    });
}