import { Logout } from "@mui/icons-material";
import AdminPanelSettingsIcon from "@mui/icons-material/AdminPanelSettings";
import MenuIcon from "@mui/icons-material/Menu";
import PaymentsIcon from "@mui/icons-material/Payments";
import PersonIcon from "@mui/icons-material/Person";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import * as React from "react";
import { Link, Outlet, useNavigate } from "react-router-dom";
import { getImageUrl } from "utils/getImageUrl";
import { useContext } from "react";
import { AdminContext } from "contexts";

const drawerWidth = 240;

export const Layout = () => {
  const navigate = useNavigate();
  const navigationMenu = [
    {
      name: "User",
      path: "user",
      icon: <PersonIcon color="primary" />,
    },
    {
      name: "Payment Method",
      path: "payment-method",
      icon: <PaymentsIcon color="primary" />,
    },
  ];

  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { setAdminLoggedIn } = useContext(AdminContext);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleLogout = () => {
    localStorage.clear();
    setAdminLoggedIn(false);
    navigate("/login");
  };

  const drawer = (
    <div>
      <Toolbar>
        <img
          alt="logo"
          src={getImageUrl("assets/navbar/logo.png")}
          width={50}
          style={{ marginInline: "auto" }}
        />
      </Toolbar>
      <Divider />
      <List>
        {navigationMenu.map((item, idx) => (
          <ListItem key={idx} disablePadding>
            <Link
              style={{ width: "100%", textDecoration: "none" }}
              to={item.path}
            >
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText>
                  <Typography
                    variant="subtitle1"
                    fontWeight={500}
                    color="primary"
                  >
                    {item.name}
                  </Typography>
                </ListItemText>
              </ListItemButton>
            </Link>
          </ListItem>
        ))}
        <ListItem disablePadding>
          <ListItemButton onClick={handleLogout}>
            <ListItemIcon>
              <Logout color="error" />
            </ListItemIcon>
            <ListItemText>
              <Typography variant="subtitle1" fontWeight={500} color="error">
                Logout
              </Typography>
            </ListItemText>
          </ListItemButton>
        </ListItem>
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
        position="fixed"
        sx={{
          width: { sm: `calc(100% - ${drawerWidth}px)` },
          ml: { sm: `${drawerWidth}px` },
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: "none" } }}
          >
            <MenuIcon color="primary.light" />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            Dashboard
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Drawer
          variant="temporary"
          open={mobileOpen}
          onClose={handleDrawerToggle}
          ModalProps={{
            keepMounted: true, // Better open performance on mobile.
          }}
          sx={{
            display: { xs: "block", sm: "none" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
        >
          {drawer}
        </Drawer>
        <Drawer
          variant="permanent"
          sx={{
            display: { xs: "none", sm: "block" },
            "& .MuiDrawer-paper": {
              boxSizing: "border-box",
              width: drawerWidth,
            },
          }}
          open
        >
          {drawer}
        </Drawer>
      </Box>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 3,
          width: { sm: `calc(100% - ${drawerWidth}px)` },
        }}
      >
        <Toolbar />
        <Outlet />
      </Box>
    </Box>
  );
};
