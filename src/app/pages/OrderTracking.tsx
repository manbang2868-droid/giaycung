import { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import {
  Container,
  Box,
  Typography,
  Card,
  CardContent,
  Chip,
  TextField,
  Button,
  Alert,
  Stepper,
  Step,
  StepLabel,
  Divider,
  ImageList,
  ImageListItem,
  LinearProgress,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import PersonIcon from "@mui/icons-material/Person";
import PhoneIcon from "@mui/icons-material/Phone";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import HourglassEmptyIcon from "@mui/icons-material/HourglassEmpty";
import BuildIcon from "@mui/icons-material/Build";

interface Shoe {
  id: string;
  name: string;
  service: string;
  status: "received" | "processing" | "completed";
  images: string[];
  notes?: string;
}

interface ServiceOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  createdDate: string;
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  shoes: Shoe[];
}

// Mock data - sẽ thay bằng API call sau
const mockOrders: ServiceOrder[] = [
  {
    id: "1",
    orderNumber: "ORD-001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    createdDate: "2025-01-08",
    totalAmount: 450000,
    status: "processing",
    shoes: [
      {
        id: "s1",
        name: "Nike Air Max 90",
        service: "Vệ sinh cao cấp",
        status: "completed",
        images: [
          "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
        ],
        notes: "Đã hoàn thành tốt",
      },
      {
        id: "s2",
        name: "Adidas Superstar",
        service: "Vệ sinh cơ bản",
        status: "processing",
        images: [
          "https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400",
        ],
        notes: "Đang thực hiện",
      },
      {
        id: "s3",
        name: "Converse Chuck Taylor",
        service: "Phục hồi giày",
        status: "received",
        images: [
          "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400",
        ],
        notes: "Chưa bắt đầu",
      },
    ],
  },
  {
    id: "2",
    orderNumber: "ORD-002",
    customerName: "Trần Thị B",
    customerPhone: "0912345678",
    createdDate: "2025-01-07",
    totalAmount: 300000,
    status: "completed",
    shoes: [
      {
        id: "s4",
        name: "Vans Old Skool",
        service: "Vệ sinh cao cấp",
        status: "completed",
        images: [
          "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
        ],
        notes: "Hoàn thành xuất sắc",
      },
      {
        id: "s5",
        name: "New Balance 574",
        service: "Nhuộm màu",
        status: "completed",
        images: [
          "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
        ],
        notes: "Đã nhuộm màu đen theo yêu cầu",
      },
    ],
  },
];

export function OrderTracking() {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const orderFromUrl = searchParams.get("order") || "";

  const [searchCode, setSearchCode] = useState(orderFromUrl);
  const [order, setOrder] = useState<ServiceOrder | null>(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSearch = () => {
    if (!searchCode.trim()) {
      setError("Vui lòng nhập mã đơn hàng");
      return;
    }

    setLoading(true);
    setError("");

    // Simulate API call
    setTimeout(() => {
      const foundOrder = mockOrders.find(
        (o) => o.orderNumber === searchCode.toUpperCase()
      );
      if (foundOrder) {
        setOrder(foundOrder);
        setError("");
      } else {
        setOrder(null);
        setError("Không tìm thấy đơn hàng. Vui lòng kiểm tra lại mã đơn.");
      }
      setLoading(false);
    }, 500);
  };

  const getStatusColor = (
    status: string
  ): "success" | "info" | "warning" | "error" | "default" => {
    switch (status) {
      case "completed":
        return "success";
      case "processing":
        return "info";
      case "received":
        return "warning";
      case "pending":
        return "warning";
      case "cancelled":
        return "error";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case "completed":
        return "Đã hoàn thành";
      case "processing":
        return "Đang thực hiện";
      case "received":
        return "Đã tiếp nhận";
      case "pending":
        return "Chờ xử lý";
      case "cancelled":
        return "Đã hủy";
      default:
        return status;
    }
  };

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "completed":
        return <CheckCircleIcon />;
      case "processing":
        return <BuildIcon />;
      case "received":
        return <HourglassEmptyIcon />;
      default:
        return <HourglassEmptyIcon />;
    }
  };

  const getOrderProgress = (order: ServiceOrder): number => {
    if (order.status === "completed") return 100;
    if (order.status === "cancelled") return 0;

    const total = order.shoes.length;
    const completed = order.shoes.filter(
      (s) => s.status === "completed"
    ).length;
    const processing = order.shoes.filter(
      (s) => s.status === "processing"
    ).length;

    return Math.round(((completed + processing * 0.5) / total) * 100);
  };

  return (
    <Box sx={{ bgcolor: "#F5F7FA", minHeight: "100vh", py: 6 }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 5 }}>
          <Typography
            variant="h3"
            sx={{
              fontWeight: 700,
              color: "#01579B",
              mb: 2,
            }}
          >
            🔍 Tra Cứu Đơn Hàng
          </Typography>
          <Typography
            variant="body1"
            sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}
          >
            Nhập mã đơn hàng để theo dõi trạng thái vệ sinh giày của bạn
          </Typography>
        </Box>

        {/* Search Box */}
        <Card
          sx={{
            mb: 4,
            borderRadius: 3,
            boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          }}
        >
          <CardContent sx={{ p: 4 }}>
            <Box sx={{ display: "flex", gap: 2, flexWrap: "wrap" }}>
              <TextField
                fullWidth
                placeholder="Nhập mã đơn hàng"
                value={searchCode}
                onChange={(e) => setSearchCode(e.target.value.toUpperCase())}
                onKeyPress={(e) => {
                  if (e.key === "Enter") {
                    handleSearch();
                  }
                }}
                sx={{
                  flex: 1,
                  minWidth: 300,
                  "& .MuiOutlinedInput-root": {
                    borderRadius: 2,
                    bgcolor: "white",
                  },
                }}
              />
              <Button
                variant="contained"
                size="large"
                startIcon={loading ? null : <SearchIcon />}
                onClick={handleSearch}
                disabled={loading}
                sx={{
                  bgcolor: "#0288D1",
                  px: 4,
                  borderRadius: 2,
                  minWidth: 150,
                  "&:hover": {
                    bgcolor: "#0277BD",
                  },
                }}
              >
                {loading ? "Đang tìm..." : "Tra Cứu"}
              </Button>
            </Box>
          </CardContent>
        </Card>

        {/* Error Alert */}
        {error && (
          <Alert
            severity="error"
            sx={{ mb: 3, borderRadius: 2 }}
            onClose={() => setError("")}
          >
            {error}
          </Alert>
        )}

        {/* Order Details */}
        {order && (
          <Box>
            {/* Order Info Card */}
            <Card
              sx={{
                mb: 3,
                borderRadius: 3,
                boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
              }}
            >
              <CardContent sx={{ p: 4 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    alignItems: "start",
                    mb: 3,
                    flexWrap: "wrap",
                    gap: 2,
                  }}
                >
                  <Box>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#01579B", mb: 1 }}
                    >
                      Đơn Hàng: {order.orderNumber}
                    </Typography>
                    <Chip
                      label={getStatusText(order.status)}
                      color={getStatusColor(order.status)}
                      sx={{ fontWeight: 600 }}
                    />
                  </Box>
                  <Box sx={{ textAlign: "right" }}>
                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 0.5 }}
                    >
                      Tổng tiền
                    </Typography>
                    <Typography
                      variant="h5"
                      sx={{ fontWeight: 700, color: "#FF6F00" }}
                    >
                      {order.totalAmount.toLocaleString("vi-VN")}đ
                    </Typography>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                <Box
                  sx={{
                    display: "grid",
                    gridTemplateColumns: { xs: "1fr", sm: "repeat(3, 1fr)" },
                    gap: 3,
                  }}
                >
                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PersonIcon sx={{ color: "#0288D1" }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", display: "block" }}
                      >
                        Khách hàng
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {order.customerName}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <PhoneIcon sx={{ color: "#0288D1" }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", display: "block" }}
                      >
                        Số điện thoại
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {order.customerPhone}
                      </Typography>
                    </Box>
                  </Box>

                  <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                    <CalendarTodayIcon sx={{ color: "#0288D1" }} />
                    <Box>
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary", display: "block" }}
                      >
                        Ngày tạo
                      </Typography>
                      <Typography variant="body1" sx={{ fontWeight: 600 }}>
                        {order.createdDate}
                      </Typography>
                    </Box>
                  </Box>
                </Box>

                <Divider sx={{ my: 3 }} />

                {/* Progress */}
                <Box sx={{ mb: 2 }}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "space-between",
                      mb: 1,
                    }}
                  >
                    <Typography variant="body2" sx={{ fontWeight: 600 }}>
                      Tiến độ hoàn thành
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{ fontWeight: 600, color: "#0288D1" }}
                    >
                      {getOrderProgress(order)}%
                    </Typography>
                  </Box>
                  <LinearProgress
                    variant="determinate"
                    value={getOrderProgress(order)}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      bgcolor: "rgba(2, 136, 209, 0.1)",
                      "& .MuiLinearProgress-bar": {
                        borderRadius: 4,
                        bgcolor: "#0288D1",
                      },
                    }}
                  />
                </Box>
              </CardContent>
            </Card>

            {/* Shoes List */}
            <Typography
              variant="h6"
              sx={{ fontWeight: 700, mb: 2, color: "#01579B" }}
            >
              Danh Sách Giày ({order.shoes.length} đôi)
            </Typography>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "repeat(2, 1fr)",
                  lg: "repeat(3, 1fr)",
                },
                gap: 3,
              }}
            >
              {order.shoes.map((shoe, index) => (
                <Card
                  key={shoe.id}
                  sx={{
                    borderRadius: 3,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  {/* Images */}
                  {shoe.images.length > 0 && (
                    <ImageList
                      cols={shoe.images.length > 1 ? 2 : 1}
                      gap={4}
                      sx={{ m: 0 }}
                    >
                      {shoe.images.map((image, imgIndex) => (
                        <ImageListItem key={imgIndex}>
                          <img
                            src={image}
                            alt={`${shoe.name} ${imgIndex + 1}`}
                            loading="lazy"
                            style={{
                              height: 160,
                              objectFit: "cover",
                              borderRadius: "12px 12px 0 0",
                            }}
                          />
                        </ImageListItem>
                      ))}
                    </ImageList>
                  )}

                  <CardContent sx={{ p: 3 }}>
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 1,
                        mb: 1,
                      }}
                    >
                      <Box
                        sx={{
                          width: 32,
                          height: 32,
                          borderRadius: "50%",
                          bgcolor: "#0288D1",
                          color: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontWeight: 700,
                          fontSize: "0.9rem",
                        }}
                      >
                        {index + 1}
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700 }}>
                        {shoe.name}
                      </Typography>
                    </Box>

                    <Typography
                      variant="body2"
                      sx={{ color: "text.secondary", mb: 2 }}
                    >
                      {shoe.service}
                    </Typography>

                    <Chip
                      icon={getStatusIcon(shoe.status)}
                      label={getStatusText(shoe.status)}
                      color={getStatusColor(shoe.status)}
                      sx={{
                        fontWeight: 600,
                        width: "100%",
                        justifyContent: "flex-start",
                        mb: shoe.notes ? 2 : 0,
                      }}
                    />

                    {shoe.notes && (
                      <Alert
                        severity="info"
                        sx={{
                          mt: 2,
                          borderRadius: 2,
                          bgcolor: "rgba(2, 136, 209, 0.1)",
                          border: "1px solid rgba(2, 136, 209, 0.2)",
                          "& .MuiAlert-icon": {
                            color: "#0288D1",
                          },
                        }}
                      >
                        <Typography variant="caption" sx={{ fontWeight: 600 }}>
                          📝 Ghi chú:
                        </Typography>
                        <Typography variant="body2">{shoe.notes}</Typography>
                      </Alert>
                    )}
                  </CardContent>
                </Card>
              ))}
            </Box>

            {/* Back Button */}
            <Box sx={{ textAlign: "center", mt: 5 }}>
              <Button
                variant="outlined"
                onClick={() => navigate("/")}
                sx={{
                  borderColor: "#0288D1",
                  color: "#0288D1",
                  px: 4,
                  py: 1.5,
                  borderRadius: 2,
                  "&:hover": {
                    borderColor: "#0277BD",
                    bgcolor: "rgba(2, 136, 209, 0.05)",
                  },
                }}
              >
                Về Trang Chủ
              </Button>
            </Box>
          </Box>
        )}

        {/* Empty State */}
        {!order && !error && (
          <Card
            sx={{
              p: 6,
              textAlign: "center",
              borderRadius: 3,
              boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
            }}
          >
            <SearchIcon sx={{ fontSize: 80, color: "#E0E0E0", mb: 2 }} />
            <Typography variant="h6" sx={{ color: "text.secondary", mb: 1 }}>
              Nhập mã đơn hàng để tra cứu
            </Typography>
            <Typography variant="body2" sx={{ color: "text.secondary" }}>
              Mã đơn hàng được cung cấp khi bạn gửi giày tại cửa hàng
            </Typography>
          </Card>
        )}
      </Container>
    </Box>
  );
}
