// src/pages/OrderSummary/OrderSummary.jsx
import { useLocation, useNavigate } from "react-router-dom";
import styles from "./OrderSummary.module.css";

const OrderSummary = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { total, items } = location.state || { total: 0, items: 0 };

  const handleGoHome = () => navigate("/products");

  return (
    <div className={styles.container}>
      <h2>Resumo da Compra</h2>
      <p>Total de itens: {items}</p>
      <p>Valor total: R$ {total.toFixed(2)}</p>
      <h3>Opções de pagamento:</h3>
      <button onClick={handleGoHome} className={styles.homeBtn}>
        Voltar para Produtos
      </button>
    </div>
  );
};

export default OrderSummary;
