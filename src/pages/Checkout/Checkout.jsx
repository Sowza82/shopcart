import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import styles from "./Checkout.module.css";

const Checkout = () => {
  const { cart, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  const [paymentMethod, setPaymentMethod] = useState("credit");
  const [error, setError] = useState("");

  const handleFinish = () => {
    if (!cart.length) {
      setError("Seu carrinho está vazio.");
      return;
    }

    // Apenas para simulação
    alert(`Compra finalizada com sucesso!\nMétodo: ${paymentMethod}\nTotal: R$ ${getTotal().toFixed(2)}`);
    clearCart(); // limpa o carrinho
    navigate("/"); // volta para Home
  };

  return (
    <div className={styles.container}>
      <h2>Carrinho</h2>
      {error && <p className={styles.error}>{error}</p>}

      <div className={styles.cartItems}>
        {cart.length === 0 ? <p>Carrinho vazio</p> :
          cart.map(item => (
            <div key={item.id} className={styles.item}>
              <img src={item.image} alt={item.title} />
              <div>
                <p>{item.title}</p>
                <p>Qtd: {item.quantity}</p>
                <p>R$ {(item.price * item.quantity).toFixed(2)}</p>
              </div>
            </div>
          ))
        }
      </div>

      <div className={styles.payment}>
        <h3>Escolha a forma de pagamento:</h3>
        <select value={paymentMethod} onChange={(e) => setPaymentMethod(e.target.value)}>
          <option value="credit">Cartão de Crédito</option>
          <option value="debit">Cartão de Débito</option>
          <option value="pix">PIX</option>
          <option value="boleto">Boleto</option>
        </select>
      </div>

      <div className={styles.total}>
        <h3>Total: R$ {getTotal().toFixed(2)}</h3>
      </div>

      <button onClick={handleFinish} className={styles.finish}>Finalizar Compra</button>
    </div>
  );
};

export default Checkout;
