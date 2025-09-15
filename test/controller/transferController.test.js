const request = require('supertest');
const sinon = require('sinon');
const { expect }  = require('chai');

const app = require('../../app');
const transferService = require('../../service/transferService');

describe('Transfer Controller', ()=>{
    describe('POST /transfer', () =>{

        beforeEach(async () => {
             const respostaLogin = await request(app)
            .post('/login')
            .send({
                username: 'Jessica',
                password: '123456'
            });
            
            token = respostaLogin.body.token;
        })

        it('Quando informo remetente e destinatario inexistente, recebo 400!', async () =>{
            const resposta = await request(app)
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

        it('Usando moks: Quando informo remetente e destinatario inexistente, recebo 400!', async () =>{
            const transferServiceMock = sinon.stub(transferService, 'transferValue');
            transferServiceMock.throws(new Error('Usuário remetente ou destinatário não encontrado'))

            const resposta = await request(app)
            .post('/transfer')
            .set('Authorization', `Bearer ${token}`)
            .send({
                from:'Jessica',
                to: 'Vinicius',
                value: 200
            });
           expect(resposta.status).to.equal(400);
           expect(resposta.body).to.have.property('error', 'Usuário remetente ou destinatário não encontrado');
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
            .set('Authorization', `Bearer ${token}`)
            .send({
                from:'Jessica',
                to: 'Vinicius',
                value: 200
            });
         expect(resposta.status).to.equal(201);

         const respostaEsperada = require('../fixture/respostas/quandoInformoValoresValidosEuTenhoSucessoCom201Created.json')
         expect(resposta.body).to.deep.equal(respostaEsperada);
        
         //expect(resposta.body).to.have.property('from', 'Jessica');
         //expect(resposta.body).to.have.property('to', 'Vinicius');
         //expect(resposta.body).to.have.property('value', 200);
         //console.log(resposta.body)

        }); 
        afterEach(() =>{
            sinon.restore();
        })
    });
    describe('GET /transfer', () =>{
        
    });
});