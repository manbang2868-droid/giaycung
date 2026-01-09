import {
  Box,
  Grid,
  Card,
  CardContent,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { motion } from "framer-motion";

export function AdminDashboardHome() {
  // Mock recent orders
  const recentOrders = [
    {
      id: "#ORD-001",
      customer: "Nguyễn Văn A",
      service: "Vệ sinh cao cấp",
      amount: "150.000đ",
      status: "completed",
    },
    {
      id: "#ORD-002",
      customer: "Trần Thị B",
      service: "Phục hồi giày",
      amount: "300.000đ",
      status: "processing",
    },
    {
      id: "#ORD-003",
      customer: "Lê Văn C",
      service: "Vệ sinh cơ bản",
      amount: "80.000đ",
      status: "completed",
    },
    {
      id: "#ORD-004",
      customer: "Phạm Thị D",
      service: "Nhuộm màu",
      amount: "200.000đ",
      status: "pending",
    },
    {
      id: "#ORD-005",
      customer: "Hoàng Văn E",
      service: "Vệ sinh cao cấp",
      amount: "150.000đ",
      status: "completed",
    },
  ];

  const getStatusColor = (
    status: string
  ): "success" | "info" | "warning" | "default" => {
    switch (status) {
      case "completed":
        return "success";
      case "processing":
        return "info";
      case "pending":
        return "warning";
      default:
        return "default";
    }
  };

  const getStatusText = (status: string): string => {
    switch (status) {
      case "completed":
        return "Hoàn thành";
      case "processing":
        return "Đang xử lý";
      case "pending":
        return "Chờ xác nhận";
      default:
        return status;
    }
  };

  return (
    <Box>
      {/* Welcome Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Box sx={{ mb: 4 }}>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#01579B", mb: 1 }}
          >
            Chào mừng trở lại! 👋
          </Typography>
          <Typography variant="body1" sx={{ color: "text.secondary" }}>
            Đây là tổng quan về hoạt động kinh doanh của bạn
          </Typography>
        </Box>
      </motion.div>

      {/* Recent Orders */}
      <Grid container spacing={3}>
        <Grid size={{ xs: 12 }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            <Card
              sx={{ boxShadow: "0 2px 12px rgba(0,0,0,0.08)", borderRadius: 3 }}
            >
              <CardContent sx={{ p: 3 }}>
                <Typography variant="h6" sx={{ fontWeight: 700, mb: 3 }}>
                  Đơn Hàng Gần Đây
                </Typography>
                <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                  {recentOrders.map((order) => (
                    <Paper
                      key={order.id}
                      sx={{
                        p: 2.5,
                        bgcolor: "#FAFBFC",
                        border: "1px solid #E0E0E0",
                        borderRadius: 2,
                        transition: "all 0.3s ease",
                        "&:hover": {
                          bgcolor: "white",
                          boxShadow: "0 4px 12px rgba(0,0,0,0.08)",
                        },
                      }}
                    >
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          flexWrap: "wrap",
                          gap: 2,
                        }}
                      >
                        <Box sx={{ flex: 1, minWidth: 200 }}>
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 600, mb: 0.5 }}
                          >
                            {order.id} - {order.customer}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          >
                            {order.service}
                          </Typography>
                        </Box>
                        <Box
                          sx={{ display: "flex", alignItems: "center", gap: 2 }}
                        >
                          <Typography
                            variant="body1"
                            sx={{ fontWeight: 700, color: "#FF6F00" }}
                          >
                            {order.amount}
                          </Typography>
                          <Chip
                            label={getStatusText(order.status)}
                            color={getStatusColor(order.status)}
                            size="small"
                            sx={{ minWidth: 100 }}
                          />
                        </Box>
                      </Box>
                    </Paper>
                  ))}
                </Box>
              </CardContent>
            </Card>
          </motion.div>
        </Grid>
      </Grid>
    </Box>
  );
}
