🛒 ShopCart - E-commerce React
==============================

Um projeto de e-commerce completo desenvolvido em React, aplicando todos os conceitos fundamentais da biblioteca de forma prática e didática.

📋 Sobre o Projeto
==================

O ShopCart é uma aplicação de e-commerce que permite aos usuários navegar por produtos, adicionar itens ao carrinho e finalizar compras. Foi desenvolvido como projeto prático para consolidar o aprendizado dos conceitos fundamentais do React.

🎯 Objetivos de Aprendizado
===========================

Este projeto aplica na prática os seguintes conceitos:

- **Componentes React** e estrutura de projeto
- **Estado (useState)** e eventos
- **Props** e comunicação entre componentes
- **Roteamento** com React Router
- **Context API** para estado global
- **Hooks** (useState, useEffect, useParams, useNavigate)
- **Consumo de API** externa
- **Renderização condicional**

🚀 Funcionalidades
==================

### ✅ Implementadas

- [X] **Tela de Login** com validação de email e senha
- [X] **Listagem de Produtos** consumindo API externa
- [X] **Filtros por Categoria** dinâmicos
- [X] **Carrinho de Compras** com adição/remoção de itens
- [X] **Controle de Quantidade** de produtos
- [X] **Tela de Detalhes** do produto individual
- [X] **Checkout** com resumo da compra
- [X] **Navegação** entre páginas
- [X] **Cálculo de Totais** em tempo real

### 🔮 Melhorias Futuras

- [ ] Persistência do carrinho no localStorage
- [ ] Sistema de autenticação real
- [ ] Integração com gateway de pagamento
- [ ] Histórico de pedidos
- [ ] Sistema de avaliações
- [ ] Busca por produtos
- [ ] Responsividade mobile
- [ ] Testes unitários

🛠️ Tecnologias Utilizadas
===========================

- **React 18** - Biblioteca principal
- **React Router DOM** - Roteamento da aplicação
- **Vite** - Build tool e dev server
- **JavaScript ES6+** - Linguagem de programação
- **CSS3** - Estilização
- **Fake Store API** - API para produtos

🏗️ Estrutura do Projeto
=========================

    shopcart/
    ├── public/
    │   └── vite.svg
    ├── src/
    │   ├── components/
    │   │   ├── Login.jsx          # Tela de login
    │   │   ├── Products.jsx       # Listagem de produtos
    │   │   ├── ProductDetail.jsx  # Detalhes do produto
    │   │   ├── Checkout.jsx       # Finalização da compra
    │   │   └── Loading.jsx        # Componente de loading
    │   ├── context/
    │   │   └── CartContext.jsx    # Context do carrinho
    │   ├── App.jsx                # Componente principal
    │   ├── main.jsx              # Ponto de entrada
    │   └── index.css             # Estilos globais
    ├── package.json
    └── README.md

⚡ Como Executar
================

### Pré-requisitos

- Node.js (versão 16 ou superior)
- npm ou yarn

### Instalação

1. **Clone o repositório**

   git clone <https://github.com/seu-usuario/shopcart.git>
   cd shopcart
2. **Instale as dependências**

   npm install
3. **Execute o projeto**

   npm run dev
4. **Acesse no navegador**

   <http://localhost:5173>

🔑 Como Usar
============

### 1. Login

- Acesse a página inicial (`/`)
- Digite um email válido (formato: <usuario@email.com>)
- Digite uma senha com pelo menos 8 caracteres
- Clique em "Entrar" para acessar a loja

### 2. Navegação

- **Produtos** (`/products`) - Lista todos os produtos disponíveis
- **Detalhes** (`/products/:id`) - Mostra informações detalhadas do produto
- **Checkout** (`/checkout`) - Finaliza a compra

### 3. Carrinho de Compras

- Adicione produtos clicando em "Adicionar ao Carrinho"
- Ajuste quantidades usando os botões + e -
- Visualize o total em tempo real
- Finalize a compra no checkout

📡 API Utilizada
================

Este projeto consome a [Fake Store API](https://fakestoreapi.com/) para obter dados dos produtos:

- **Todos os produtos**: `GET https://fakestoreapi.com/products`
- **Produto por ID**: `GET https://fakestoreapi.com/products/{id}`

### Estrutura dos Dados

    {
      "id": 1,
      "title": "Nome do Produto",
      "price": 109.95,
      "description": "Descrição do produto...",
      "category": "categoria",
      "image": "https://...",
      "rating": {
        "rate": 3.9,
        "count": 120
      }
    }

🎨 Conceitos React Aplicados
============================

### Estados e Hooks

    // useState para estado local
    const [products, setProducts] = useState([])
    const [loading, setLoading] = useState(true)

    // useEffect para efeitos colaterais
    useEffect(() => {
      fetchProducts()
    }, [])

    // useParams para parâmetros da URL
    const { id } = useParams()

### Context API

    // Provedor do contexto`<CartProvider>`
      `<App />`
    `</CartProvider>`

    // Consumo do contexto
    const { cart, addToCart, removeFromCart } = useCart()

### Roteamento

    `<Routes>`
      <Route path="/" element={`<Login />`} />
      <Route path="/products" element={`<Products />`} />
      <Route path="/products/:id" element={`<ProductDetail />`} />
      <Route path="/checkout" element={`<Checkout />`} />
    `</Routes>`

### Event Handlers

    // Handler de formulário
    const handleLogin = (e) => {
      e.preventDefault()
      if (isFormValid) {
        navigate('/products')
      }
    }

    // Handler de botão
    const handleAddToCart = () => {
      addToCart(product)
    }

📚 Recursos de Aprendizado
==========================

Este projeto foi desenvolvido seguindo uma progressão didática baseada em:

1. **Introdução ao React** - Componentes e estrutura
2. **Estados e Eventos** - useState, useEffect, event handlers
3. **Componentes e Props** - Comunicação entre componentes
4. **Roteamento** - React Router DOM

📝 Licença
===========

Este projeto está sob a licença MIT. Veja o arquivo [LICENSE](LICENSE) para mais detalhes.

👥 Autores
==========

Tatiane Souza

🙏 Agradecimentos
=================

- [Fake Store API](https://fakestoreapi.com/) pelos dados de teste
- Comunidade React pela documentação e exemplos
- Contribuidores e mantenedores do React Router

═══════════════════════════════════════════════════════════════

⭐ **Gostou do projeto? Deixe uma estrela!**

📧 **Dúvidas?** Abra uma [issue](https://github.com/seu-usuario/shopcart/issues) ou entre em contato!

═══════════════════════════════════════════════════════════════

**🚀 Desenvolvido com React e ❤️**
