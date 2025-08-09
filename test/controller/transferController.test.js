const request = require('supertest');
const sinon = require('sinon');
const { expect }  = require('chai');

const app = require('../../app');

describe('Transfer Controller', ()=>{
    describe('POST /transfer', () =>{
        it('Quando informo remetente e destinatario inexistente, recebo 400!', async () =>{
            const resposta = await request(app)
            .post('/transfer')
            .send({
                from:"Jessica",
                to: "Vinicius",
                value: 200
            });
           expect(resposta.status).to.equal(400);
           expect(resposta.body).to.have.property('error', "Usuário remetente ou destinatário não encontrado");
        });
    });
    describe('GET /transfer', () =>{
        
    });
});