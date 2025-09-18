import { useState } from "react";
import { FaCcAmex, FaCcMastercard, FaCcVisa, FaFacebook, FaInstagram, FaTwitter } from "react-icons/fa";
import styles from "./Footer.module.css";

const Footer = () => {
  const [email, setEmail] = useState("");

  const handleSubscribe = (e) => {
    e.preventDefault();
    if (!email) {
      alert("Digite um email válido!");
      return;
    }
    alert(`Obrigado por se inscrever, ${email}!`);
    setEmail("");
  };

  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        {/* Marca */}
        <div className={styles.column}>
          <h3>ShopCart</h3>
          <p>O melhor lugar para comprar online com segurança e rapidez.</p>
        </div>

        {/* Links Rápidos */}
        <div className={styles.column}>
          <h3>Links Rápidos</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/products">Produtos</a></li>
            <li><a href="/checkout">Carrinho</a></li>
            <li><a href="/login">Contato</a></li>
          </ul>
        </div>

        {/* Contato */}
        <div className={styles.column}>
          <h3>Contato</h3>
          <p>Email: suporte@shopcart.com</p>
          <p>Telefone: (11) 99999-9999</p>
          <div className={styles.social}>
            <a href="#"><FaFacebook /></a>
            <a href="#"><FaInstagram /></a>
            <a href="#"><FaTwitter /></a>
          </div>
        </div>

        {/* Newsletter */}
        <div className={styles.column}>
          <h3>Inscreva-se:</h3>
          <p>Receba novidades e promoções por email:</p>
          <form className={styles.newsForm} onSubmit={handleSubscribe}>
            <input
              type="email"
              placeholder="Seu email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
            <button type="submit">Inscrever</button>
          </form>
        </div>
      </div>

      {/* Linha de pagamento e segurança */}
      <div className={styles.extra}>
        <div className={styles.payments}>
          <FaCcVisa size={36} />
          <FaCcMastercard size={36} />
          <FaCcAmex size={36} />
          <span>Pix & Boleto</span>
        </div>
        <div className={styles.security}>
          <p>Site seguro & criptografia SSL</p>
        </div>
      </div>

      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} ShopCart - Todos os direitos reservados.
      </div>
    </footer>
  );
};

export default Footer;
