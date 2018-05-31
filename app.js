

/* importar configurações do servidor */
var app = require('./config/server');

/* parametrizar a porta de escuta */
const server = app.listen(3000, function(){
    console.log('Servidor Online');
});

const io = require('socket.io').listen(server);

/* setando variavel dentro do objeto Express */
app.set('io', io);

io.on('connection', function(socket){
    console.log('Usuário Conectou');

    socket.on('disconnect', function(){
        console.log('Usuário Desconectou');
    });

    socket.on('msgParaServidor', function(data){
    /* eventos de dialogo */
    
    socket.emit('msgParaCliente', 
    {apelido: data.apelido, mensagem: data.mensagem});
    
     socket.broadcast.emit('msgParaCliente', 
    {apelido: data.apelido, mensagem: data.mensagem});
 
   /* eventos de pessoas no chat */
   if(parseInt(data.apelido_atualizado_nos_clientes) == 0){
    socket.emit('participantesParaCliente', 
    {apelido: data.apelido});

   socket.broadcast.emit('participantesParaCliente', 
   {apelido: data.apelido});
   }
});
});