import { AppBar, Badge, Box, Button, Toolbar, Typography } from "@mui/material";
import useMediaQuery from "@mui/material/useMediaQuery";
import { AdminContext, CheckoutContext, LoginContext } from "contexts";
import { ReactComponent as CloseIcon } from "icons/close.svg";
import { ReactComponent as LogoutIcon } from "icons/logout.svg";
import { ReactComponent as MenuIcon } from "icons/menu.svg";
import { ReactComponent as ProfileIcon } from "icons/profile.svg";
import { ReactComponent as ShopIcon } from "icons/shop.svg";
import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getImageUrl } from "utils/getImageUrl";
import styles from "./style.module.css";

const LoginButtons = ({ show }) => {
  return (
    show && (
      <Box className={styles.buttons}>
        <Link to="/login">
          <Button color="primary" variant="outlined" className={styles.button}>
            Login
          </Button>
        </Link>
        <Link to="/register">
          <Button
            color="secondary"
            variant="contained"
            className={styles.button}
          >
            Register
          </Button>
        </Link>
      </Box>
    )
  );
};

const LoggedInMenu = ({
  onMenuClick,
  isMenuOpen,
  showAdmin,
  handleLogout,
  checkoutCount,
}) => {
  const isMedium = useMediaQuery("(min-width: 600px)");

  return isMedium ? (
    <Box className={styles.buttons}>
      <Link to="/checkout">
        <Typography variant="span" color="primary">
          <Badge
            badgeContent={checkoutCount}
            invisible={!checkoutCount}
            color="secondary"
          >
            <ShopIcon />
          </Badge>
        </Typography>
      </Link>
      <Link to="/my-class">
        <Typography variant="subtitle1" color="primary">
          My Class
        </Typography>
      </Link>
      <Link to="/invoice">
        <Typography variant="subtitle1" color="primary">
          Invoice
        </Typography>
      </Link>
      <div className={styles.separator} />
      {showAdmin && (
        <Link to="/admin/dashboard">
          <Typography variant="span" color="secondary">
            <ProfileIcon />
          </Typography>
        </Link>
      )}
      <button
        onClick={handleLogout}
        style={{
          backgroundColor: "transparent",
          border: "none",
          outline: "none",
          cursor: "pointer",
        }}
      >
        <Typography variant="span" color="primary">
          <LogoutIcon />
        </Typography>
      </button>
    </Box>
  ) : (
    <button className={styles.menuButton} onClick={onMenuClick}>
      <Typography variant="span" color="primary">
        {isMenuOpen ? <CloseIcon /> : <MenuIcon />}
      </Typography>
    </button>
  );
};

export const Navbar = ({ isUser, isAdmin, showHeaderLink }) => {
  const [isMenuOpen, setMenuOpen] = useState(false);

  const navigate = useNavigate();
  const { setLoggedIn } = useContext(LoginContext);
  const { setAdminLoggedIn } = useContext(AdminContext);
  const { checkoutCount } = useContext(CheckoutContext);

  const handleLogout = () => {
    localStorage.clear();
    setLoggedIn(false);
    setAdminLoggedIn(false);
    setMenuOpen(false);
    navigate("/login");
  };

  return (
    <>
      <AppBar className={styles.navbar} position="sticky">
        <Toolbar className={styles.toolbar}>
          {showHeaderLink ? (
            <Link to="/">
              <img
                alt="logo"
                src={getImageUrl("assets/navbar/logo.png")}
                className={styles.logo}
              />
            </Link>
          ) : (
            <a href="/">
              <img
                alt="logo"
                src={getImageUrl("assets/navbar/logo.png")}
                className={styles.logo}
              />
            </a>
          )}
          {(isUser || isAdmin) && showHeaderLink ? (
            <LoggedInMenu
              onMenuClick={() => setMenuOpen(!isMenuOpen)}
              isMenuOpen={isMenuOpen}
              showAdmin={isAdmin}
              handleLogout={handleLogout}
              checkoutCount={checkoutCount}
            />
          ) : (
            <LoginButtons show={showHeaderLink} />
          )}
        </Toolbar>
      </AppBar>
      {isMenuOpen && (isUser || isAdmin) && (
        <Box className={styles.menuContainer}>
          <div className={styles.menuContent}>
            <Link to="/checkout" onClick={() => setMenuOpen(false)}>
              <Typography variant="h5" color="primary">
                <div className={styles.shopNav}>
                  Checkout
                  <Badge
                    badgeContent={checkoutCount}
                    invisible={!checkoutCount}
                    color="secondary"
                  >
                    <ShopIcon />
                  </Badge>
                </div>
              </Typography>
            </Link>
            <Link to="/my-class" onClick={() => setMenuOpen(false)}>
              <Typography variant="h5" color="primary">
                My Class
              </Typography>
            </Link>
            <Link to="/invoice" onClick={() => setMenuOpen(false)}>
              <Typography variant="h5" color="primary">
                Invoice
              </Typography>
            </Link>
          </div>
          <div className={styles.menuIcon}>
            {isAdmin && (
              <Link to="/admin/dashboard">
                <Typography variant="span" color="secondary">
                  <ProfileIcon />
                </Typography>
              </Link>
            )}
            <button
              onClick={handleLogout}
              style={{
                backgroundColor: "transparent",
                border: "none",
                outline: "none",
              }}
            >
              <Typography variant="span" color="primary">
                <LogoutIcon />
              </Typography>
            </button>
          </div>
        </Box>
      )}
    </>
  );
};
