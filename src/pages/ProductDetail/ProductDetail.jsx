import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import styles from "./ProductDetail.module.css";

const ProductDetail = () => {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const { addToCart } = useCart();
  const { user } = useAuth();
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    fetch(`https://fakestoreapi.com/products/${id}`)
      .then(res => res.json())
      .then(data => setProduct(data));
  }, [id]);

  if (!product) return <p className={styles.loading}>Carregando...</p>;

  const handleAdd = () => {
    if (!user) {
      setIsModalOpen(true);
      return;
    }
    addToCart(product);
  };

  return (
    <>
      <div className={styles.container}>
        <img src={product.image} alt={product.title} className={styles.image}/>
        <div className={styles.details}>
          <h2>{product.title}</h2>
          <p>{product.description}</p>
          <h3>R$ {product.price}</h3>
          <button onClick={handleAdd}>Adicionar ao Carrinho</button>
        </div>
      </div>
      <LoginModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </>
  );
};

export default ProductDetail;
