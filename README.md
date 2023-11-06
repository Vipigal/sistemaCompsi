# website-dacompsci


# Alunos e cargos:
- Bianca Gabriela - Full stack
- Vinicius Pinho- Full stack
- Leo Soares- Back-end
- Felipe Zan- Front-end

# Tecnologias:
- Front-end: React.js
- Back-end: Node.js + Express.js
- Banco de dados: PostgreSQL

# Objetivo do Projeto
O projeto desenvolvido será um website para o DAcompsci do ICEx, que tem como objetivo centralizar várias das atividades que envolvem o DA em uma plataforma. 
Ele terá uma parte expositiva, com paginas voltadas ao usuário (aluno), além de uma parte que passe por um login para administradores acessarem e realizarem o controle do seu inventário.
A ideia principal é dar estrutura para permitir a divulgacao e venda de ingressos de eventos para os alunos (algo como um sympla) e para integrar um controle (admin dashboard) de tudo que pode ser alugado/vendido pelo DA (camisas, escaninhos e mais).

# Arquitetura 
A arquitetura hexagonal, é uma abordagem de design de software que visa tornar os sistemas mais flexíveis, testáveis e desacoplados. Ela alcança isso separando o sistema em camadas distintas, facilitando a manutenção e a evolução do software. Isso também torna os testes automatizados mais simples, permitindo uma adaptação fácil a mudanças nos requisitos ou tecnologias. A arquitetura promove a reutilização de código, isolamento de tecnologias e é útil em sistemas empresariais e aplicações críticas, onde a manutenção a longo prazo é fundamental.
No SistemaCompsi os adaptadores e portas são as pastas "adapters" e "repository", nos adaptadores são armazenadas rotas para a API, já no repository desempenha um papel na separação das preocupações e na implementação de um dos princípios-chave da arquitetura hexagonal: a separação entre a lógica de negócios e o acesso a dados.

Em resumo, a pasta "repository" em uma arquitetura hexagonal:

Define interfaces ou contratos para operações de acesso a dados.
Abstrai a camada de lógica de negócios do conhecimento sobre como os dados são armazenados ou recuperados.
Permite a fácil substituição de implementações de acesso a dados, tornando o sistema mais flexível e adaptável.
Facilita a escrita de testes unitários, uma vez que é possível criar implementações de repositório simuladas ou em memória para testes de unidade, sem a necessidade de acesso a um banco de dados real.


# Backlog do Produto:
- História 1: Como aluno, gostaria de saber de maneira simplificada informações sobre o Diretório Acadêmico na página inicial do site, tais como a gestão atual, notícias acadêmicas e posts do instagram.
- História 2: Como administrador, gostaria de customizar informações do site de modo a atrair mais os alunos, por meio da adição de banners, fotos e textos personalizados.
- História 3: Como aluno, devo conseguir comprar produtos pelo site quando disponíveis, sendo capaz de escolher atributos específicos dele (ingressos, camisas, canecas, etc…). 
- História 4: Como aluno, devo conseguir registrar um pedido indicando meu interesse em comprar um produto, caso não esteja disponível no momento, para que os administradores consigam ver o número de alunos interessados.
- História 5: Como aluno, gostaria de poder criar e acessar minha conta, onde poderei encontrar meu histórico de pedidos e meu histórico de tickets..
- História 6: Como aluno, devo ser capaz de visualizar uma lista de eventos futuros com detalhes, incluindo data, hora, local e preço do ingresso. 
- História 7: Como aluno, devo receber um e-mail de confirmação com os detalhes do meu pedido e um ingresso eletrônico para o evento, após a confirmação do pagamento bem-sucedida. 
- História 8: Como aluno devo poder revisar meu pedido antes de confirmar qualquer compra.
- História 9: Como administrador quero ver uma lista de todos os pedidos em aberto e concluídos.

# Backlog da Sprint
História 1: 
- Como aluno, gostaria de saber de maneira simplificada informações sobre o Diretório Acadêmico na página inicial do site, tais como a gestão atual, notícias acadêmicas e posts do instagram.
Tarefas da História 1: 
- Instalar, criar e configurar banco de dados. [geral]
- Instalar node.js e express [back]
- Configurar .env (variáveis de ambiente) [back e front]
- Instalar vite e react.js [front]
- Implementar primeira versão de homepage [front]
- Adicionar seção de banner principal + menu
- Adicionar seção sobre a gestão do DA
- Adicionar seção expositiva sobre o que é o DA e seu propósito
- Adicionar seção de comunicação (links para contato) - footer
- Implementar tabela de posts (para salvar os textos e imagens - pesquisar) [back]
- Estruturar as rotas de CRUD para os posts [back]. 	

História 2: 
- Como administrador, gostaria de customizar informações do site de modo a atrair mais os alunos, por meio da adição de banners, fotos e textos personalizados.
Tarefas da História 2: 
- Criar CRUD de usuarios e definir suas roles (admin, aluno) [back]
- Criar lógica de autenticação para login [back]
- Criar página de login [front]
- Criar lógica para adicionar botão de edição de conteúdo caso usuário logado seja admin [front]
- Criar lógica para adicionar um post (imagem + texto) caso usuário seja admin [front] 	

História 3: 
- Como aluno, devo conseguir comprar produtos pelo site quando disponíveis, sendo capaz de escolher atributos específicos dele (ingressos, camisas, canecas, etc…). 
Tarefas da História 3: 
- Criar CRUD de produtos (genérico) [back]
- Criar página da loja [front]


História 4: 
- Como aluno, devo conseguir registrar um pedido indicando meu interesse em comprar um produto, caso não esteja disponível no momento, para que os administradores consigam ver o número de alunos interessados.
Tarefas da História 4: 
- Adicionar um modal para realizar o pedido em meu nome [front]
- Adicionar tabela para monitorar requisiçõs de pedidos [back]
- Adicionar e-mails automatizados para os admins quando houver muitos pedidos [back]

História 5: 
- Como aluno, gostaria de poder criar e acessar minha conta, onde poderei encontrar meu histórico de pedidos e meu histórico de tickets..
Tarefas da História 5: 
- Criar página de cadastro para aluno [front] (Informações obrigatórias: nome completo, endereço de e-mail válido, senha e curso. A senha deve atender aos requisitos de segurança, incluindo ao menos oito caracteres, uma letra maiúscula e um número. Dados pessoais devem ser criptografados e armazenados com segurança.) 
- Validar dados de registro [back]
- Confirmação de e-mail
- Requisitos de segurança para senhas.
- Armazenar dados de usuário de maneira segura [back]
- Criptografar senhas
- Editar dados pessoais
- Criar novo ticket
- Histórico de tickets
- Histórico de pedidos

História 6: 
- Como aluno, devo ser capaz de visualizar uma lista de eventos futuros com detalhes, incluindo data, hora, local e preço do ingresso.
Tarefas da História 6: 
- Adicionar filtros para que os alunos possam ordenar e filtrar eventos baseados em diferentes critérios (data, local, etc.) [front]
- Adicionar CRUD de eventos [back]
- Adicionar seção de eventos (estudar) [front]

História 7: 
- Como aluno, devo receber um e-mail de confirmação com os detalhes do meu pedido e um ingresso eletrônico para o evento, após a confirmação do pagamento bem-sucedida. 
Tarefas da História 7: 
- Criar um template de e-mail para confirmar o pedido [front]

História 8: 
- Como aluno devo poder revisar meu pedido antes de confirmar qualquer compra.
Tarefas da História 8: 
- Adicionar um botão de “Confirmar Compra” para finalizar o pedido [front]






