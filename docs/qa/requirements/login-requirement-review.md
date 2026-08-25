

# Login Requirement Review

## Business Goal

- Permitir que usuários registrados acessem com segurança sua área pessoal e os dados da sua lista de filmes.


## Business Rules

Para o login ser bem sucedido:
- o usuário precisa estar registrado;
- o e-mail informado deve corresponder a uma conta existente;
- a senha deve corresponder à senha dessa conta;
- o sistema deve validar as credenciais e liberar o acesso.

## Missing Information

- Não está definido o comportamento quando o e-mail ou a senha estão vazios.
- Não está definido se o e-mail diferencia letras maiúsculas e minúsculas.
- Nao esta definida a quantidade de caracteres permitida para a senha
- A mensagem exibida para credenciais inválidas não foi especificada.
- Não está definido o destino do usuário após o login.
- Não há regra para contas bloqueadas ou inativas.
- Não está definido se existe limite de tentativas incorretas.
- A mensagem "login successful! redirecting" nao esta especificada de quando essa mensagem deve aparecer para u usuário


## Questions for the Product Owner

1. Qual mensagem deve ser exibida quando as credenciais forem inválidas?
2. A mesma mensagem deve ser usada para e-mail inexistente e senha incorreta?
3. O que deve acontecer quando um dos campos estiver vazio?
4. O e-mail deve ser tratado sem diferenciar maiúsculas e minúsculas?
5. Para qual página o usuário deve ser direcionado após o login?
6. Usuários inativos ou bloqueados podem fazer login?
7. Existe um número máximo de tentativas incorretas?
8. A mensagem "login successful! redirecting" presente no codigo, será mostrada para o usuário? em qual momento?


## Risks

- Mensagens diferentes para e-mail inexistente e senha incorreta podem revelar quais usuários estão cadastrados.
- A ausência de limite de tentativas pode facilitar ataques de força bruta.
- O tratamento inconsistente de maiúsculas e espaços pode impedir o acesso de usuários válidos.
- A falta de validação dos campos pode causar comportamentos inesperados.






### Algumas ambiguidades e informações ausentes:
não está definido o formato válido do e-mail;
não sabemos se e-mail e senha são obrigatórios;
não está claro se o e-mail diferencia letras maiúsculas e minúsculas;
não está definido qual mensagem aparece quando o login falha;
não sabemos se a mensagem deve indicar qual credencial está errada;
não há informação sobre bloqueio após várias tentativas;
não está explicado o que acontece com contas inativas ou bloqueadas;
não está definido para qual página o usuário será direcionado após entrar.

### Riscos ou comportamentos que precisaríamos testar:
um usuário pode conseguir entrar usando uma senha incorreta;
o sistema pode revelar que determinado e-mail está cadastrado, facilitando ataques;
campos vazios podem causar erro inesperado ou permitir o envio;
espaços antes ou depois do e-mail podem impedir o acesso de um usuário válido;
muitas tentativas incorretas podem ser permitidas sem qualquer proteção;
após o login, o usuário pode ser direcionado para a página errada ou não receber acesso à sua própria lista.