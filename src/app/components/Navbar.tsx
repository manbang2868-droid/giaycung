import {
  AppBar,
  Toolbar,
  Box,
  Button,
  Container,
  Badge,
  IconButton,
  Menu,
  MenuItem,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { Link } from "react-router-dom";
import PhoneIcon from "@mui/icons-material/Phone";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import MenuIcon from "@mui/icons-material/Menu";
import { useState } from "react";
import logo from "../../assets/logo.png";
import { useCart } from "../context/CartContext";

export function Navbar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("md"));

  // ✅ LẤY GIỎ HÀNG TỪ CONTEXT
  const { cartItems } = useCart();
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const menuItems = [
    { label: "Trang chủ", path: "/" },
    { label: "Dịch vụ", path: "/services" },
    { label: "Sản phẩm", path: "/products" },
    { label: "Tin tức", path: "/news" },
    { label: "Liên hệ", path: "/contact" },
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: "#0288D1", boxShadow: 2 }}>
      <Container maxWidth="lg">
        <Toolbar
          sx={{ display: "flex", justifyContent: "space-between", py: 1 }}
        >
          {/* Logo */}
          <Link to="/" style={{ textDecoration: "none" }}>
            <Box
              component="img"
              src={logo}
              alt="Giày Cưng Logo"
              sx={{
                height: { xs: 60, md: 80 },
                cursor: "pointer",
                borderRadius: "50%",
                objectFit: "cover",
                width: { xs: 60, md: 80 },
                bgcolor: "transparent",
              }}
            />
          </Link>

          {/* Desktop Navigation */}
          {!isMobile && (
            <Box sx={{ display: "flex", gap: 3, alignItems: "center" }}>
              <Button
                component={Link}
                to="/"
                sx={{ color: "white", textTransform: "none", fontSize: "16px" }}
              >
                Trang chủ
              </Button>
              <Button
                component={Link}
                to="/services"
                sx={{ color: "white", textTransform: "none", fontSize: "16px" }}
              >
                Dịch vụ
              </Button>
              <Button
                component={Link}
                to="/products"
                sx={{ color: "white", textTransform: "none", fontSize: "16px" }}
              >
                Sản phẩm
              </Button>
              <Button
                component={Link}
                to="/news"
                sx={{ color: "white", textTransform: "none", fontSize: "16px" }}
              >
                Tin tức
              </Button>
              <Button
                component={Link}
                to="/contact"
                sx={{ color: "white", textTransform: "none", fontSize: "16px" }}
              >
                Liên hệ
              </Button>

              {/* ✅ Cart Button (Desktop) */}
              <IconButton component={Link} to="/order" sx={{ color: "white" }}>
                <Badge badgeContent={totalQuantity} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Hotline Button */}
              <Button
                variant="contained"
                startIcon={<PhoneIcon />}
                sx={{
                  bgcolor: "#FF6F00",
                  color: "white",
                  "&:hover": { bgcolor: "#E65100" },
                  px: 3,
                  py: 1,
                }}
              >
                0909 255 285
              </Button>
            </Box>
          )}

          {/* Mobile Navigation */}
          {isMobile && (
            <Box sx={{ display: "flex", gap: 1, alignItems: "center" }}>
              {/* ✅ Cart Button (Mobile) */}
              <IconButton component={Link} to="/order" sx={{ color: "white" }}>
                <Badge badgeContent={totalQuantity} color="error">
                  <ShoppingCartIcon />
                </Badge>
              </IconButton>

              {/* Hotline Button - Phone Icon Only */}
              <IconButton
                href="tel:0909255285"
                sx={{
                  bgcolor: "#FF6F00",
                  color: "white",
                  "&:hover": { bgcolor: "#E65100" },
                  width: 40,
                  height: 40,
                }}
              >
                <PhoneIcon />
              </IconButton>

              {/* Hamburger Menu */}
              <IconButton onClick={handleMenuOpen} sx={{ color: "white" }}>
                <MenuIcon />
              </IconButton>

              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
                PaperProps={{
                  sx: {
                    mt: 1,
                    minWidth: 200,
                    bgcolor: "#0288D1",
                    color: "white",
                  },
                }}
              >
                {menuItems.map((item) => (
                  <MenuItem
                    key={item.path}
                    component={Link}
                    to={item.path}
                    onClick={handleMenuClose}
                    sx={{
                      color: "white",
                      "&:hover": { bgcolor: "rgba(255,255,255,0.1)" },
                    }}
                  >
                    {item.label}
                  </MenuItem>
                ))}
              </Menu>
            </Box>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
}
