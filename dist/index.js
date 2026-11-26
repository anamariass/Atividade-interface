"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const Cliente_1 = require("./Cliente");
const Conta_1 = require("./Conta");
const SMS_1 = require("./interface/SMS");
const Email_1 = require("./interface/Email");
const NotificacaoApp_1 = require("./interface/NotificacaoApp");
const SaqueException_1 = require("./excecoes/SaqueException");
const cliente1 = new Cliente_1.Cliente("Luiza Ferreira", "333.333.333-33", "Avenida Central", 3200);
const cliente2 = new Cliente_1.Cliente("Rafael Costa", "444.444.444-44", "Rua das Flores", 4100);
cliente1.adicionarCanal(new Email_1.Email());
cliente1.adicionarCanal(new NotificacaoApp_1.NotificacaoApp());
cliente2.adicionarCanal(new SMS_1.SMS());
cliente2.adicionarCanal(new Email_1.Email());
const conta1 = new Conta_1.Conta(205, 2, "10/10/2026", 120, 450, cliente1);
const conta2 = new Conta_1.Conta(310, 3, "15/10/2026", 850, 250, cliente2);
function testarSaque(conta, valor) {
    try {
        conta.sacar(valor);
    }
    catch (erro) {
        if (erro instanceof SaqueException_1.SaqueException) {
            console.log("ERRO:", erro.message);
            conta.titular.notificar(erro.message);
        }
        else {
            console.log("Erro inesperado:", erro);
        }
    }
    console.log("-------------------------");
}
console.log("TESTES DE VALOR INVÁLIDO");
testarSaque(conta1, -25);
testarSaque(conta1, 0);
console.log("TESTES DE CONTA BLOQUEADA");
conta1.bloqueada = true;
testarSaque(conta1, 75);
testarSaque(conta1, 90);
conta1.bloqueada = false;
console.log("TESTES DE SALDO INSUFICIENTE");
testarSaque(conta1, 180);
testarSaque(conta1, 200);
console.log("TESTES DE LIMITE DIÁRIO");
testarSaque(conta2, 150);
testarSaque(conta2, 120);
testarSaque(conta2, 100);
console.log("TESTES DE SAQUE COM SUCESSO");
testarSaque(conta2, 40);
testarSaque(conta2, 30);
console.log("SALDOS FINAIS");
console.log("Saldo de Luiza:", conta1.consultarSaldo());
console.log("Saldo de Rafael:", conta2.consultarSaldo());
//# sourceMappingURL=index.js.map