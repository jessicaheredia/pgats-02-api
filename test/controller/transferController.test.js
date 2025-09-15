const request = require('supertest');
const sinon = require('sinon');
const { expect }  = require('chai');

const app = require('../../app');

const transferService = require('../../service/transferService');

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
           expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
        });
        it('Usando moks: Quando informo remetente e destinatario inexistente, recebo 400!', async () =>{
            const transferServiceMock = sinon.stub(transferService, 'transferValue');
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'))

            const resposta = await request(app)
            .post('/transfer')
            .send({
                from:'Jessica',
                to: 'Vinicius',
                value: 200
            });
           expect(resposta.status).to.equal(400);
           expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');

           sinon.restore();
        });
        it('Usando moks: Quando informo valores válidos eu tenho sucesso com 201 CREATED', async () =>{
            const transferServiceMock = sinon.stub(transferService, 'transferValue');
            transferServiceMock.returns({
                 from:'Jessica',
                 to: 'Vinicius',
                 value: 200
        });
             
            const resposta = await request(app)
            .post('/transfer')
            .send({
                from:'Jessica',
                to: 'Vinicius',
                value: 200
            });
         expect(resposta.status).to.equal(201);
         expect(resposta.body).to.have.property('from', 'Jessica');
         expect(resposta.body).to.have.property('to', 'Vinicius');
         expect(resposta.body).to.have.property('value', 200);

           sinon.restore();
        });        
    });
    describe('GET /transfer', () =>{
        
    });
});