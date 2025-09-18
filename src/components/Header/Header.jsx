import { useState } from "react";
import { FaBars, FaShoppingCart, FaTimes } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";
import { useCart } from "../../context/CartContext";
import styles from "./Header.module.css";

const Header = () => {
  const { getTotalItems } = useCart();
  const { user, isLogged, logout } = useAuth();
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => setIsOpen(!isOpen);
  const logged = !!user;

  const handleLogout = () => {
    logout();
    setIsOpen(false);
    navigate("/"); // volta para home
  };

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <h1 className={styles.logo} onClick={() => navigate("/")}>ShopCart</h1>

        <nav className={`${styles.nav} ${isOpen ? styles.active : ""}`}>
          <Link to="/" className={styles.link} onClick={() => setIsOpen(false)}>Home</Link>
          <Link to="/products" className={styles.link} onClick={() => setIsOpen(false)}>Produtos</Link>

          {logged ? (
            <>
              <Link to="/checkout" className={styles.link} onClick={() => setIsOpen(false)}>
                <FaShoppingCart /> ({getTotalItems()})
              </Link>
              <span className={styles.link} onClick={handleLogout}>Sair</span>
            </>
          ) : (
            <span className={styles.link} onClick={() => { setIsOpen(false); navigate("/login"); }}>
              Login
            </span>
          )}
        </nav>

        <div className={styles.menuIcon} onClick={toggleMenu}>
          {isOpen ? <FaTimes size={24} /> : <FaBars size={24} />}
        </div>
      </div>
    </header>
  );
};

export default Header;
