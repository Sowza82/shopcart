import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import styles from "./ProductCard.module.css";

const ProductCard = ({ product }) => {
  const { addToCart } = useCart();
  const { isLogged } = useAuth();
  const navigate = useNavigate();

  const handleAdd = () => {
    if (isLogged()) {
      addToCart(product);
      toast.success("Produto adicionado ao carrinho!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
    } else {
      toast.info("Faça login para adicionar produtos ao carrinho!", {
        position: "top-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
      });
      // Redireciona para a página de login
      setTimeout(() => {
        navigate("/login");
      }, 1500); // espera o toast aparecer antes de redirecionar
    }
  };

  return (
    <div className={styles.card}>
      <img src={product.image} alt={product.title} />
      <h3>{product.title}</h3>
      <p>R$ {product.price}</p>
      <button onClick={handleAdd}>Adicionar ao carrinho</button>
    </div>
  );
};

export default ProductCard;
