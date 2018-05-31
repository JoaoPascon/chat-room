module.exports.loadChat = function(application, req, res){
   
    const dadosForm = req.body;
    
    req.assert('apelido', 'Email não pode ser vazio').notEmpty();
    req.assert('apelido', 'Email não valido').isEmail();

    const erros = req.validationErrors();

    if(erros){
        res.render('index', {validacao: erros});
        return;
    }

    /* recuperando uma variavel do express */
    application.get('io').emit('msgParaCliente',
     { apelido: dadosForm.apelido, 
        mensagem: ' acabou de entrar no chat !'});

    res.render('chat', {dadosForm: dadosForm});

}