import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  Container,
  Typography,
  Box,
  Paper,
  Grid,
  TextField,
  Button,
  Divider,
  Card,
  CardMedia,
  CardContent,
  Alert,
  IconButton,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  CircularProgress,
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";
import DeleteIcon from "@mui/icons-material/Delete";
import { useCart } from "../context/CartContext";

export function Order() {
  const navigate = useNavigate();
  const {
    cartItems,
    updateQuantity,
    removeFromCart,
    getTotalPrice,
    clearCart,
  } = useCart();

  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: "",
    note: "",
  });

  const [orderSuccess, setOrderSuccess] = useState(false);
  const [orderId, setOrderId] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState("");

  // ✅ đưa ra ngoài handleSubmitOrder để không bị "nuốt" vào try/catch
  const formatPrice = (price: string) => {
    return parseInt(price.replace(/[.,đ]/g, ""), 10);
  };

  const formatCurrency = (amount: number) => {
    return amount.toLocaleString("vi-VN") + "đ";
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCustomerInfo({
      ...customerInfo,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();

    if (cartItems.length === 0) {
      alert("Giỏ hàng trống! Vui lòng thêm sản phẩm.");
      return;
    }

    if (!customerInfo.name || !customerInfo.phone || !customerInfo.address) {
      alert("Vui lòng điền đầy đủ thông tin!");
      return;
    }

    try {
      setSubmitting(true);
      setError("");

      // ✅ TODO: Bạn đặt code gọi API tạo đơn ở đây
      // Ví dụ giả lập tạo orderId:
      const fakeId = crypto?.randomUUID?.() ?? String(Date.now());
      setOrderId(fakeId);

      setOrderSuccess(true);
    } catch (err) {
      setError("Đặt hàng thất bại, vui lòng thử lại.");
    } finally {
      setSubmitting(false);
    }
  };

  if (orderSuccess) {
    return (
      <Container maxWidth="md" sx={{ py: 8 }}>
        <Paper elevation={3} sx={{ p: 6, textAlign: "center" }}>
          <CheckCircleIcon sx={{ fontSize: 80, color: "#4CAF50", mb: 3 }} />
          <Typography
            variant="h4"
            sx={{ mb: 2, color: "#4CAF50", fontWeight: 600 }}
          >
            Đặt hàng thành công!
          </Typography>

          {orderId && (
            <Box
              sx={{
                mb: 3,
                p: 2,
                bgcolor: "#E8F5E9",
                borderRadius: 2,
                display: "inline-block",
              }}
            >
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 0.5 }}
              >
                Mã đơn hàng của bạn:
              </Typography>
              <Typography
                variant="h5"
                sx={{ color: "#388E3C", fontWeight: 700 }}
              >
                #{orderId.slice(-8).toUpperCase()}
              </Typography>
            </Box>
          )}

          <Typography variant="body1" sx={{ mb: 1, color: "text.secondary" }}>
            Cảm ơn bạn đã đặt hàng tại <strong>GIÀY CƯNG</strong>
          </Typography>
          <Typography variant="body1" sx={{ mb: 4, color: "text.secondary" }}>
            Chúng tôi sẽ liên hệ với bạn qua số điện thoại{" "}
            <strong>{customerInfo.phone}</strong> để xác nhận đơn hàng.
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Box
            sx={{
              textAlign: "left",
              mb: 4,
              bgcolor: "#F5F5F5",
              p: 3,
              borderRadius: 2,
            }}
          >
            <Typography variant="h6" sx={{ mb: 2, fontWeight: 600 }}>
              Thông tin đơn hàng:
            </Typography>

            <TableContainer sx={{ mb: 2 }}>
              <Table size="small">
                <TableHead>
                  <TableRow>
                    <TableCell>
                      <strong>Sản phẩm</strong>
                    </TableCell>
                    <TableCell align="center">
                      <strong>SL</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>Giá</strong>
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {cartItems.map((item, index) => (
                    <TableRow key={index}>
                      <TableCell>{item.title}</TableCell>
                      <TableCell align="center">{item.quantity}</TableCell>
                      <TableCell align="right">
                        {formatCurrency(
                          formatPrice(item.price) * item.quantity
                        )}
                      </TableCell>
                    </TableRow>
                  ))}
                  <TableRow>
                    <TableCell colSpan={2}>
                      <strong>Tổng cộng:</strong>
                    </TableCell>
                    <TableCell align="right">
                      <strong>{formatCurrency(getTotalPrice())}</strong>
                    </TableCell>
                  </TableRow>
                </TableBody>
              </Table>
            </TableContainer>

            <Divider sx={{ my: 2 }} />

            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Người nhận:</strong> {customerInfo.name}
            </Typography>
            <Typography variant="body2" sx={{ mb: 1 }}>
              <strong>Số điện thoại:</strong> {customerInfo.phone}
            </Typography>
            <Typography variant="body2">
              <strong>Địa chỉ:</strong> {customerInfo.address}
            </Typography>
          </Box>

          <Button
            variant="contained"
            size="large"
            onClick={() => {
              clearCart();
              navigate("/products");
            }}
            sx={{
              bgcolor: "#0288D1",
              "&:hover": { bgcolor: "#0277BD" },
              mr: 2,
            }}
          >
            Tiếp tục mua sắm
          </Button>
          <Button
            variant="outlined"
            size="large"
            onClick={() => {
              clearCart();
              navigate("/");
            }}
            sx={{
              borderColor: "#0288D1",
              color: "#0288D1",
              "&:hover": {
                borderColor: "#0277BD",
                bgcolor: "rgba(2, 136, 209, 0.04)",
              },
            }}
          >
            Về trang chủ
          </Button>
        </Paper>
      </Container>
    );
  }

  if (cartItems.length === 0) {
    return (
      <Container maxWidth="md" sx={{ py: 6, textAlign: "center" }}>
        <ShoppingCartIcon sx={{ fontSize: 100, color: "#B0BEC5", mb: 2 }} />
        <Typography variant="h5" sx={{ mb: 3, color: "text.secondary" }}>
          Giỏ hàng trống
        </Typography>
        <Button
          variant="contained"
          onClick={() => navigate("/products")}
          sx={{ bgcolor: "#0288D1", "&:hover": { bgcolor: "#0277BD" } }}
        >
          Mua sắm ngay
        </Button>
      </Container>
    );
  }

  return (
    <Box sx={{ py: 6, bgcolor: "#F5F5F5" }}>
      <Container maxWidth="lg">
        <Box sx={{ display: "flex", alignItems: "center", mb: 4 }}>
          <ShoppingCartIcon sx={{ fontSize: 40, color: "#0288D1", mr: 2 }} />
          <Typography variant="h3" sx={{ fontWeight: 700, color: "#01579B" }}>
            Giỏ Hàng
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {/* Danh sách sản phẩm */}
          <Grid size={{ xs: 12, md: 7 }}>
            <Paper elevation={3} sx={{ p: 3 }}>
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 600, color: "#0288D1" }}
              >
                Sản phẩm đã chọn ({cartItems.length})
              </Typography>

              {cartItems.map((item, index) => (
                <Card
                  key={index}
                  sx={{ display: "flex", mb: 2, "&:last-child": { mb: 0 } }}
                >
                  <CardMedia
                    component="img"
                    sx={{ width: 120, objectFit: "cover" }}
                    image={item.image}
                    alt={item.title}
                  />
                  <CardContent
                    sx={{
                      flex: 1,
                      display: "flex",
                      flexDirection: "column",
                      p: 2,
                    }}
                  >
                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        mb: 1,
                      }}
                    >
                      <Typography
                        variant="h6"
                        sx={{ fontWeight: 600, fontSize: "1rem" }}
                      >
                        {item.title}
                      </Typography>
                      <IconButton
                        size="small"
                        color="error"
                        onClick={() => removeFromCart(item.title)}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2, flexGrow: 1 }}
                    >
                      {item.description}
                    </Typography>

                    <Box
                      sx={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                      }}
                    >
                      <Box
                        sx={{ display: "flex", alignItems: "center", gap: 1 }}
                      >
                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.title, item.quantity - 1)
                          }
                          sx={{
                            bgcolor: "#E0E0E0",
                            "&:hover": { bgcolor: "#BDBDBD" },
                            width: 28,
                            height: 28,
                          }}
                        >
                          <RemoveIcon fontSize="small" />
                        </IconButton>

                        <Typography
                          sx={{
                            minWidth: 40,
                            textAlign: "center",
                            fontWeight: 600,
                            bgcolor: "#F5F5F5",
                            px: 2,
                            py: 0.5,
                            borderRadius: 1,
                          }}
                        >
                          {item.quantity}
                        </Typography>

                        <IconButton
                          size="small"
                          onClick={() =>
                            updateQuantity(item.title, item.quantity + 1)
                          }
                          sx={{
                            bgcolor: "#0288D1",
                            color: "white",
                            "&:hover": { bgcolor: "#0277BD" },
                            width: 28,
                            height: 28,
                          }}
                        >
                          <AddIcon fontSize="small" />
                        </IconButton>
                      </Box>

                      <Typography
                        variant="h6"
                        sx={{ color: "#FF6F00", fontWeight: 700 }}
                      >
                        {formatCurrency(
                          formatPrice(item.price) * item.quantity
                        )}
                      </Typography>
                    </Box>
                  </CardContent>
                </Card>
              ))}

              <Divider sx={{ my: 2 }} />

              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  p: 2,
                  bgcolor: "#E3F2FD",
                  borderRadius: 1,
                }}
              >
                <Typography variant="h6" sx={{ fontWeight: 600 }}>
                  Tổng tiền:
                </Typography>
                <Typography
                  variant="h4"
                  sx={{ color: "#FF6F00", fontWeight: 700 }}
                >
                  {formatCurrency(getTotalPrice())}
                </Typography>
              </Box>
            </Paper>
          </Grid>

          {/* Form thông tin khách hàng */}
          <Grid size={{ xs: 12, md: 5 }}>
            <Paper elevation={3} sx={{ p: 4, position: "sticky", top: 100 }}>
              <Typography
                variant="h5"
                sx={{ mb: 3, fontWeight: 600, color: "#0288D1" }}
              >
                Thông tin giao hàng
              </Typography>

              <Alert severity="info" sx={{ mb: 3 }}>
                Vui lòng điền đầy đủ thông tin để chúng tôi có thể liên hệ và
                giao hàng cho bạn.
              </Alert>

              {/* ✅ hiển thị lỗi nếu có */}
              {error && (
                <Alert severity="error" sx={{ mb: 2 }}>
                  {error}
                </Alert>
              )}

              <form onSubmit={handleSubmitOrder}>
                <TextField
                  fullWidth
                  required
                  label="Họ và tên"
                  name="name"
                  value={customerInfo.name}
                  onChange={handleInputChange}
                  sx={{ mb: 3 }}
                  placeholder="Nguyễn Văn A"
                />

                <TextField
                  fullWidth
                  required
                  label="Số điện thoại"
                  name="phone"
                  value={customerInfo.phone}
                  onChange={handleInputChange}
                  sx={{ mb: 3 }}
                  placeholder="0909 123 456"
                />

                <TextField
                  fullWidth
                  required
                  label="Địa chỉ giao hàng"
                  name="address"
                  value={customerInfo.address}
                  onChange={handleInputChange}
                  sx={{ mb: 3 }}
                  multiline
                  rows={2}
                  placeholder="Số nhà, tên đường, quận/huyện, thành phố"
                />

                <TextField
                  fullWidth
                  label="Ghi chú (tùy chọn)"
                  name="note"
                  value={customerInfo.note}
                  onChange={handleInputChange}
                  sx={{ mb: 4 }}
                  multiline
                  rows={3}
                  placeholder="Ghi chú thêm về đơn hàng (nếu có)"
                />

                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  fullWidth
                  sx={{
                    bgcolor: "#0288D1",
                    "&:hover": { bgcolor: "#0277BD" },
                    py: 1.5,
                    fontWeight: 600,
                    mb: 2,
                  }}
                >
                  {submitting ? (
                    <CircularProgress size={24} color="inherit" />
                  ) : (
                    "Xác nhận đặt hàng"
                  )}
                </Button>

                <Button
                  variant="outlined"
                  size="large"
                  fullWidth
                  onClick={() => navigate("/products")}
                  sx={{
                    borderColor: "#0288D1",
                    color: "#0288D1",
                    "&:hover": {
                      borderColor: "#0277BD",
                      bgcolor: "rgba(2, 136, 209, 0.04)",
                    },
                  }}
                >
                  Tiếp tục mua sắm
                </Button>
              </form>
            </Paper>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}
