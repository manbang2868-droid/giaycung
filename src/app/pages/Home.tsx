import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Button,
  Snackbar,
  Alert,
  Stack,
  Chip,
  Rating,
} from "@mui/material";
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useNavigate } from "react-router-dom"; // ✅ THÊM
import TrackChangesIcon from "@mui/icons-material/TrackChanges"; // ✅ THÊM

// Icons
import PhoneInTalkIcon from "@mui/icons-material/PhoneInTalk";
import SearchIcon from "@mui/icons-material/Search";
import AssignmentIcon from "@mui/icons-material/Assignment";
import BuildIcon from "@mui/icons-material/Build";
import PhotoCameraIcon from "@mui/icons-material/PhotoCamera";
import PaymentIcon from "@mui/icons-material/Payment";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import StarsIcon from "@mui/icons-material/Stars";
import SpeedIcon from "@mui/icons-material/Speed";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Dữ liệu mẫu (Static Data)
const MOCK_SERVICES = [
  {
    id: "1",
    title: "Vệ Sinh Cơ Bản",
    description:
      "Làm sạch bề mặt, dây giày và đế giữa. Phù hợp cho giày đi hàng ngày ít bẩn.",
    price: "80.000đ",
    duration: "24h - 48h",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff",
    features: ["Giặt tay 100%", "Khử mùi thảo mộc", "Sấy khô chuyên dụng"],
  },
  {
    id: "2",
    title: "Vệ Sinh Chuyên Sâu",
    description:
      "Làm sạch sâu mọi ngóc ngách, loại bỏ vết ố khó trị và khử khuẩn tia UV.",
    price: "120.000đ",
    duration: "2 - 3 ngày",
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86",
    features: ["Khử khuẩn UV", "Tẩy ố đế", "Vệ sinh lót giày"],
  },
  {
    id: "3",
    title: "Chăm Sóc Giày Da (Luxury)",
    description:
      "Quy trình riêng biệt cho giày da thật, da lộn. Dưỡng da và phục hồi độ bóng.",
    price: "250.000đ",
    duration: "3 - 5 ngày",
    imageUrl: "https://images.unsplash.com/photo-1614594975525-e45190c55d0b",
    features: ["Dưỡng Lotion cao cấp", "Đánh bóng thủ công", "Bảo vệ bề mặt"],
  },
  {
    id: "4",
    title: "Repaint - Nhuộm Màu",
    description:
      "Phục hồi màu sắc bị phai hoặc thay đổi màu mới theo yêu cầu khách hàng.",
    price: "Từ 300.000đ",
    duration: "5 - 7 ngày",
    imageUrl: "https://images.unsplash.com/photo-1516478177764-9fe5bd7e9717",
    features: ["Sơn Angelus chính hãng", "Phủ nano bảo vệ", "Độ bền màu cao"],
  },
];

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
    title: "Cây Giữ Form Giày (Shoetree)",
    description:
      "Giúp đôi giày luôn giữ được hình dáng ban đầu và hạn chế nếp nhăn.",
    price: "190.000đ",
    rating: 4.5,
    imageUrl:
      "https://images.unsplash.com/photo-1603808033192-082d6919d3e1?auto=format&fit=crop&q=80&w=400",
  },
];

const PROCESS_STEPS = [
  {
    step: 1,
    title: "Nhận yêu cầu",
    desc: "Liên hệ qua Hotline/Zalo",
    icon: PhoneInTalkIcon,
  },
  {
    step: 2,
    title: "Đánh giá",
    desc: "Kiểm tra tình trạng giày",
    icon: SearchIcon,
    highlight: true,
  },
  {
    step: 3,
    title: "Báo giá",
    desc: "Chi tiết chi phí & thời gian",
    icon: AssignmentIcon,
  },
  {
    step: 4,
    title: "Vệ sinh",
    desc: "Quy trình làm sạch chuyên sâu",
    icon: BuildIcon,
  },
  {
    step: 5,
    title: "Xác nhận",
    desc: "Gửi ảnh kết quả qua Zalo",
    icon: PhotoCameraIcon,
  },
  {
    step: 6,
    title: "Thanh toán",
    desc: "Nhận giày và thanh toán",
    icon: PaymentIcon,
  },
  {
    step: 7,
    title: "Bảo hành",
    desc: "Hỗ trợ trong 48h sau giặt",
    icon: ThumbUpIcon,
  },
];

export function Home() {
  const [openSnackbar, setOpenSnackbar] = useState(false);

  const navigate = useNavigate(); // ✅ THÊM
  const { addToCart } = useCart();

  const handleAddToCart = (product: (typeof MOCK_PRODUCTS)[number]) => {
    addToCart({
      title: product.title,
      price: product.price,
      image: product.imageUrl,
      description: product.description,
      rating: product.rating,
    });
    setOpenSnackbar(true);
  };

  return (
    <Box>
      {/* 1. Hero Section */}
      <Box
        sx={{ bgcolor: "#E1F5FE", py: { xs: 8, md: 12 }, textAlign: "center" }}
      >
        <Container maxWidth="md">
          <Typography
            variant="h2"
            sx={{
              mb: 2,
              fontWeight: 800,
              color: "#01579B",
              fontSize: { xs: "2.5rem", md: "3.75rem" },
            }}
          >
            Dịch Vụ Chăm Sóc Giày <br /> Chuyên Nghiệp
          </Typography>
          <Typography
            variant="h6"
            sx={{ mb: 4, color: "#0277BD", fontWeight: 400, opacity: 0.9 }}
          >
            Chúng tôi chăm sóc đôi giày của bạn bằng cả trái tim.
          </Typography>
          <Stack direction="row" spacing={2} justifyContent="center">
            <Button
              variant="contained"
              size="large"
              sx={{ bgcolor: "#01579B", px: 4, borderRadius: 2 }}
            >
              Tư vấn ngay
            </Button>
          </Stack>
        </Container>
      </Box>

      {/* 2. Services Section */}
      <Container maxWidth="lg" sx={{ py: 10 }}>
        <Typography
          variant="h4"
          sx={{ mb: 6, fontWeight: 800, color: "#01579B", textAlign: "center" }}
        >
          Dịch Vụ
        </Typography>
        <Grid container spacing={4}>
          {MOCK_SERVICES.map((service) => (
            <Grid size={{ xs: 12, md: 6 }} key={service.id}>
              <Card
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #e0e0e0",
                  transition: "0.3s",
                  "&:hover": {
                    boxShadow: "0 8px 24px rgba(0,0,0,0.1)",
                    transform: "translateY(-4px)",
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
                  image={service.imageUrl}
                  alt={service.title}
                />

                <CardContent
                  sx={{
                    flex: 1,
                    p: 3,
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{ mb: 1, fontWeight: 700, color: "#01579B" }}
                  >
                    {service.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{ mb: 2, color: "text.secondary", flexGrow: 1 }}
                  >
                    {service.description}
                  </Typography>

                  {service.features && (
                    <Box
                      sx={{
                        mb: 2,
                        display: "flex",
                        flexWrap: "wrap",
                        gap: 0.5,
                      }}
                    >
                      {service.features.map((feature, idx) => (
                        <Chip
                          key={idx}
                          label={feature}
                          size="small"
                          icon={
                            <CheckCircleOutlineIcon sx={{ fontSize: 16 }} />
                          }
                          sx={{
                            bgcolor: "#E1F5FE",
                            color: "#0288D1",
                            fontWeight: 500,
                          }}
                        />
                      ))}
                    </Box>
                  )}

                  <Box
                    sx={{
                      mt: "auto",
                      pt: 2,
                      borderTop: "1px solid #eee",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                    }}
                  >
                    <Box>
                      <Typography
                        variant="h5"
                        sx={{ color: "#E65100", fontWeight: 800 }}
                      >
                        {service.price}
                      </Typography>
                      {service.duration && (
                        <Stack
                          direction="row"
                          alignItems="center"
                          spacing={0.5}
                          sx={{ color: "text.secondary" }}
                        >
                          <AccessTimeIcon sx={{ fontSize: 16 }} />
                          <Typography variant="caption">
                            {service.duration}
                          </Typography>
                        </Stack>
                      )}
                    </Box>

                    <Button
                      variant="contained"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        bgcolor: "#0288D1",
                        fontWeight: 600,
                      }}
                    >
                      Đặt lịch
                    </Button>
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* 3. Process Section */}
      <Box sx={{ bgcolor: "#f9f9f9", py: 10 }}>
        <Container maxWidth="lg">
          <Box sx={{ textAlign: "center", mb: 8 }}>
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#01579B" }}>
              Quy Trình 7 Bước Chuyên Nghiệp
            </Typography>
            <Typography variant="body1" color="text.secondary">
              Đảm bảo đôi giày của bạn được chăm sóc tốt nhất
            </Typography>
          </Box>

          <Grid container spacing={4} justifyContent="center" sx={{ py: 4 }}>
            {PROCESS_STEPS.map((step) => {
              const IconComponent = step.icon;
              const isStepTwo = step.step === 2;

              return (
                <Grid size={{ xs: 12, sm: 6, md: 4, lg: 3 }} key={step.step}>
                  <Card
                    elevation={0}
                    sx={{
                      textAlign: "center",
                      p: 4,
                      height: "300",
                      borderRadius: 4,
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "center",
                      border: isStepTwo
                        ? "2px solid #FF6F00"
                        : "2px solid #0288D1",
                      bgcolor: isStepTwo ? "#FFF3E0" : "white",
                      transition: "all 0.3s ease-in-out",
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                        borderColor: isStepTwo ? "#E65100" : "#01579B",
                      },
                    }}
                  >
                    <Box
                      sx={{
                        width: 42,
                        height: 42,
                        borderRadius: "50%",
                        bgcolor: isStepTwo ? "#FF6F00" : "#0288D1",
                        color: "white",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        mb: 2,
                        fontWeight: 700,
                        fontSize: "1.1rem",
                      }}
                    >
                      {step.step}
                    </Box>

                    <IconComponent
                      sx={{
                        fontSize: 40,
                        mb: 2,
                        color: isStepTwo ? "#FF6F00" : "#0288D1",
                      }}
                    />

                    <Typography
                      variant="h6"
                      sx={{
                        mb: 1,
                        fontWeight: 700,
                        color: isStepTwo ? "#E65100" : "#01579B",
                        lineHeight: 1.3,
                      }}
                    >
                      {step.title}
                    </Typography>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", px: 1 }}
                    >
                      {step.desc}
                    </Typography>
                  </Card>
                </Grid>
              );
            })}
          </Grid>
        </Container>
      </Box>

      {/* 4. Mini Products Section */}
      <Container maxWidth="lg" sx={{ py: 6 }}>
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: 800, color: "#01579B" }}
          >
            Sản Phẩm Chăm Sóc Giày
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", fontWeight: 400 }}
          >
            Các dụng cụ chất lượng cao giúp bạn bảo quản giày bền đẹp tại nhà
          </Typography>
        </Box>

        <Grid container spacing={4}>
          {MOCK_PRODUCTS.map((product) => (
            <Grid size={{ xs: 12, md: 6 }} key={product.id}>
              <Card
                elevation={0}
                sx={{
                  display: "flex",
                  flexDirection: { xs: "column", sm: "row" },
                  height: "100%",
                  borderRadius: 4,
                  border: "1px solid #eeeeee",
                  transition: "0.3s cubic-bezier(0.4, 0, 0.2, 1)",
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
                  sx={{
                    flex: 1,
                    display: "flex",
                    flexDirection: "column",
                    p: 3,
                  }}
                >
                  <Typography
                    variant="h6"
                    sx={{ mb: 1, fontWeight: 700, color: "#333" }}
                  >
                    {product.title}
                  </Typography>

                  <Typography
                    variant="body2"
                    sx={{
                      mb: 2,
                      color: "text.secondary",
                      flexGrow: 1,
                      lineHeight: 1.6,
                    }}
                  >
                    {product.description}
                  </Typography>

                  <Box sx={{ mb: 2, display: "flex", alignItems: "center" }}>
                    <Rating
                      value={product.rating}
                      readOnly
                      precision={0.5}
                      size="small"
                    />
                    <Typography
                      variant="caption"
                      sx={{ ml: 1, color: "text.secondary" }}
                    >
                      ({product.rating})
                    </Typography>
                  </Box>

                  <Box
                    sx={{
                      mt: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      pt: 2,
                      borderTop: "1px solid #f5f5f5",
                    }}
                  >
                    <Typography
                      variant="h6"
                      sx={{ color: "#E65100", fontWeight: 800 }}
                    >
                      {product.price}
                    </Typography>

                    <Button
                      variant="contained"
                      startIcon={<ShoppingCartIcon />}
                      size="small"
                      sx={{
                        borderRadius: 2,
                        textTransform: "none",
                        bgcolor: "#0288D1",
                        "&:hover": { bgcolor: "#01579B" },
                      }}
                      onClick={() => handleAddToCart(product)}
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

      {/* 5. Trust Badges */}
      <Box sx={{ py: 6, borderTop: "1px solid #eee" }}>
        <Container maxWidth="lg">
          <Grid container spacing={4} textAlign="center">
            <Grid size={{ xs: 12, md: 6 }}>
              <StarsIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Chất lượng cao
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <ThumbUpIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Tin cậy tuyệt đối
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <SpeedIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Giao nhanh 48h
              </Typography>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <PaymentIcon color="primary" sx={{ fontSize: 40 }} />
              <Typography variant="subtitle1" fontWeight={700}>
                Giá cả hợp lý
              </Typography>
            </Grid>
          </Grid>
        </Container>
      </Box>

      {/* ✅ Order Tracking Section */}
      <Box sx={{ bgcolor: "#E3F2FD", py: 8 }}>
        <Container maxWidth="md">
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <TrackChangesIcon sx={{ fontSize: 56, color: "#0288D1", mb: 1 }} />
            <Typography variant="h4" sx={{ fontWeight: 800, color: "#01579B" }}>
              Tra Cứu Đơn Hàng
            </Typography>
            <Typography sx={{ color: "text.secondary", mt: 1 }}>
              Nhập mã đơn hàng để theo dõi tiến độ vệ sinh giày của bạn.
            </Typography>
          </Box>

          <Card
            sx={{
              borderRadius: 3,
              overflow: "hidden",
              boxShadow: "0 6px 24px rgba(0,0,0,0.12)",
            }}
          >
            <Box
              sx={{
                px: 3,
                py: 2,
                background: "linear-gradient(90deg, #0288D1, #01579B)",
              }}
            >
              <Typography sx={{ color: "white", fontWeight: 700 }}>
                Theo dõi trạng thái
              </Typography>
            </Box>

            <Box sx={{ p: 3, display: "flex", gap: 2, flexWrap: "wrap" }}>
              <Typography
                sx={{ color: "text.secondary", flex: 1, minWidth: 240 }}
              >
                Bạn có thể tra cứu để xem tiến độ từng đôi giày ngay tại đây!!!
              </Typography>

              <Button
                variant="contained"
                size="large"
                onClick={() => navigate("/track-order")}
                sx={{
                  bgcolor: "#0288D1",
                  borderRadius: 2,
                  px: 4,
                  "&:hover": { bgcolor: "#0277BD" },
                  whiteSpace: "nowrap",
                }}
              >
                Tra Cứu Ngay
              </Button>
            </Box>
          </Card>
        </Container>
      </Box>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={2000}
        onClose={() => setOpenSnackbar(false)}
      >
        <Alert severity="success" variant="filled">
          Sản phẩm đã được thêm vào giỏ!
        </Alert>
      </Snackbar>
    </Box>
  );
}
