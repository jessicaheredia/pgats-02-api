const request = require('supertest');
const { expect }  = require('chai');

describe('Transfer', ()=>{
    describe('POST /transfer', () =>{
        it.only('Quando informo remetente e destinatario inexistente, recebo 400!', async () =>{
            const respostaLogin = await request('http://localhost:3000')
                .post('/login')
                .send({
                    username: 'Jessica',
                    password: '123456'
                });

            const token = respostaLogin.body.token;
            
            const resposta = await request('http://localhost:3000')
                .post('/transfer')
                .set('Authorization', `Bearer ${token}`)
                .send({
                from:"Jessica",
                to: "Wandinha",
                value: 200
            });
           expect(resposta.status).to.equal(400);
           expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });
    });
});