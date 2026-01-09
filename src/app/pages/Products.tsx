import { useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Rating,
  Snackbar,
  Alert,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import { useCart } from "../context/CartContext"; // ✅ THÊM

// Mock data
const MOCK_PRODUCTS = [
  {
    id: "1",
    title: "Bộ Vệ Sinh Giày Crep Protect",
    description:
      "Bộ sản phẩm đầy đủ bao gồm bàn chải, dung dịch làm sạch và khăn chuyên dụng.",
    price: "450.000đ",
    rating: 5,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "2",
    title: "Xịt Nano Chống Thấm",
    description:
      "Bảo vệ đôi giày của bạn khỏi nước, bùn đất và các vết bẩn dạng lỏng.",
    price: "280.000đ",
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "3",
    title: "Bút Chữa Ố Đế (Repaint)",
    description:
      "Phục hồi lại vẻ trắng sáng cho phần đế giày bị ố vàng lâu ngày.",
    price: "150.000đ",
    rating: 4,
    imageUrl:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&q=80&w=400",
  },
  {
    id: "4",
    title: "Cây Giữ Form Giày (Shoetree)",
    description:
      "Giúp đôi giày luôn giữ được hình dáng ban đầu và hạn chế nếp nhăn.",
    price: "190.000đ",
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400",
  },
];

export function Products() {
  const [open, setOpen] = useState(false);

  // ✅ LẤY addToCart TỪ CONTEXT
  const { addToCart } = useCart();

  // ✅ THÊM VÀO GIỎ HÀNG THẬT
  const handleAddToCart = (product: (typeof MOCK_PRODUCTS)[number]) => {
    addToCart({
      title: product.title,
      price: product.price,
      image: product.imageUrl,
      description: product.description,
      rating: product.rating, // ✅ THÊM DÒNG NÀY
    });
    setOpen(true);
  };

  const handleClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") return;
    setOpen(false);
  };

  return (
    <Box component="section" sx={{ py: 8, bgcolor: "#ffffff" }}>
      <Container maxWidth="lg">
        {/* Title */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: 800, color: "#01579B" }}
          >
            Sản Phẩm Chăm Sóc Giày
          </Typography>
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Các dụng cụ chất lượng cao giúp bạn bảo quản giày bền đẹp tại nhà
          </Typography>
        </Box>

        {/* Products */}
        <Grid container spacing={4}>
          {MOCK_PRODUCTS.map((product) => (
            <Grid size={{ xs: 12, md: 6 }} key={product.id}>
              <Card
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  borderRadius: 4,
                  border: "1px solid #eee",
                  "&:hover": {
                    boxShadow: "0 12px 30px rgba(0,0,0,0.08)",
                    transform: "translateY(-4px)",
                    borderColor: "#0288D1",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  sx={{
                    width: { xs: "100%", sm: 180, md: 220 },
                    height: { xs: 200, sm: "auto" },
                    objectFit: "cover",
                  }}
                  image={product.imageUrl}
                  alt={product.title}
                />

                <CardContent
                  sx={{ flex: 1, display: "flex", flexDirection: "column" }}
                >
                  <Typography variant="h6" sx={{ fontWeight: 700 }}>
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ color: "text.secondary", my: 2 }}
                  >
                    {product.description}
                  </Typography>

                  <Rating value={product.rating} readOnly size="small" />

                  <Box
                    sx={{
                      mt: "auto",
                      display: "flex",
                      justifyContent: "space-between",
                      alignItems: "center",
                      pt: 2,
                    }}
                  >
                    <Typography sx={{ color: "#E65100", fontWeight: 800 }}>
                      {product.price}
                    </Typography>

                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      size="small"
                      sx={{ bgcolor: "#0288D1" }}
                      onClick={() => handleAddToCart(product)} // ✅ TRUYỀN PRODUCT
                    >
                      Mua ngay
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Snackbar */}
      <Snackbar
        open={open}
        autoHideDuration={3000}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <Alert severity="success" variant="filled">
          Đã thêm sản phẩm vào giỏ hàng!
        </Alert>
      </Snackbar>
    </Box>
  );
}
