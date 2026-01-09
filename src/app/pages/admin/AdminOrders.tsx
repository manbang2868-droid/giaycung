import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Alert,
  CircularProgress,
  Grid,
  Card,
  CardContent,
  Tabs,
  Tab,
  Divider,
} from "@mui/material";
import VisibilityIcon from "@mui/icons-material/Visibility";
import DeleteIcon from "@mui/icons-material/Delete";
import PendingIcon from "@mui/icons-material/Pending";
import LocalShippingIcon from "@mui/icons-material/LocalShipping";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";

interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
}

interface Order {
  id: string;
  customerName: string;
  customerPhone: string;
  customerAddress: string;
  items: OrderItem[];
  totalAmount: number;
  status: "pending" | "processing" | "completed" | "cancelled";
  createdDate: string;
  notes?: string;
}

// Mock data - Dữ liệu mẫu đơn hàng
const INITIAL_ORDERS: Order[] = [
  {
    id: "ORD-001",
    customerName: "Nguyễn Văn A",
    customerPhone: "0901234567",
    customerAddress: "123 Đường ABC, Quận 1, TP.HCM",
    items: [
      {
        productId: "1",
        productName: "Xịt Chống Nước Premium",
        quantity: 2,
        price: 150000,
      },
      {
        productId: "2",
        productName: "Kem Dưỡng Da Cao Cấp",
        quantity: 1,
        price: 120000,
      },
    ],
    totalAmount: 420000,
    status: "pending",
    createdDate: "2024-01-20",
    notes: "Giao giờ hành chính",
  },
  {
    id: "ORD-002",
    customerName: "Trần Thị B",
    customerPhone: "0912345678",
    customerAddress: "456 Đường XYZ, Quận 3, TP.HCM",
    items: [
      {
        productId: "3",
        productName: "Bộ Dụng Cụ Vệ Sinh",
        quantity: 1,
        price: 80000,
      },
    ],
    totalAmount: 80000,
    status: "processing",
    createdDate: "2024-01-19",
  },
  {
    id: "ORD-003",
    customerName: "Lê Văn C",
    customerPhone: "0923456789",
    customerAddress: "789 Đường KLM, Quận 5, TP.HCM",
    items: [
      {
        productId: "4",
        productName: "Lót Giày Khử Mùi",
        quantity: 3,
        price: 50000,
      },
      {
        productId: "5",
        productName: "Nước Tẩy Vết Bẩn",
        quantity: 2,
        price: 90000,
      },
    ],
    totalAmount: 330000,
    status: "completed",
    createdDate: "2024-01-18",
  },
  {
    id: "ORD-004",
    customerName: "Phạm Thị D",
    customerPhone: "0934567890",
    customerAddress: "321 Đường NOP, Quận 7, TP.HCM",
    items: [
      {
        productId: "6",
        productName: "Đánh Bóng Giày Da",
        quantity: 1,
        price: 70000,
      },
    ],
    totalAmount: 70000,
    status: "cancelled",
    createdDate: "2024-01-17",
    notes: "Khách hủy đơn",
  },
  {
    id: "ORD-005",
    customerName: "Hoàng Văn E",
    customerPhone: "0945678901",
    customerAddress: "654 Đường QRS, Quận 10, TP.HCM",
    items: [
      {
        productId: "1",
        productName: "Xịt Chống Nước Premium",
        quantity: 1,
        price: 150000,
      },
      {
        productId: "2",
        productName: "Kem Dưỡng Da Cao Cấp",
        quantity: 1,
        price: 120000,
      },
      {
        productId: "3",
        productName: "Bộ Dụng Cụ Vệ Sinh",
        quantity: 1,
        price: 80000,
      },
    ],
    totalAmount: 350000,
    status: "pending",
    createdDate: "2024-01-21",
  },
];

const statusColors = {
  pending: "warning",
  processing: "info",
  completed: "success",
  cancelled: "error",
} as const;

const statusLabels = {
  pending: "Chờ xử lý",
  processing: "Đang xử lý",
  completed: "Hoàn thành",
  cancelled: "Đã hủy",
};

const statusIcons = {
  pending: <PendingIcon />,
  processing: <LocalShippingIcon />,
  completed: <CheckCircleIcon />,
  cancelled: <CancelIcon />,
};

export function AdminOrders() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedOrder, setSelectedOrder] = useState<Order | null>(null);
  const [detailsOpen, setDetailsOpen] = useState(false);
  const [currentTab, setCurrentTab] = useState<"all" | Order["status"]>("all");

  // Load orders from localStorage or use initial data
  useEffect(() => {
    const loadOrders = () => {
      try {
        const stored = localStorage.getItem("adminOrders");
        if (stored) {
          setOrders(JSON.parse(stored));
        } else {
          setOrders(INITIAL_ORDERS);
          localStorage.setItem("adminOrders", JSON.stringify(INITIAL_ORDERS));
        }
      } catch (err) {
        console.error("Error loading orders:", err);
        setOrders(INITIAL_ORDERS);
      } finally {
        setLoading(false);
      }
    };

    loadOrders();
  }, []);

  // Save orders to localStorage
  const saveOrders = (newOrders: Order[]) => {
    setOrders(newOrders);
    localStorage.setItem("adminOrders", JSON.stringify(newOrders));
  };

  // View order details
  const handleViewDetails = (order: Order) => {
    setSelectedOrder(order);
    setDetailsOpen(true);
  };

  // Update order status
  const handleUpdateStatus = (newStatus: Order["status"]) => {
    if (!selectedOrder) return;

    try {
      setError("");
      setSuccess("");

      const updatedOrder = { ...selectedOrder, status: newStatus };
      const newOrders = orders.map((o) =>
        o.id === selectedOrder.id ? updatedOrder : o
      );

      saveOrders(newOrders);
      setSelectedOrder(updatedOrder);
      setSuccess("Cập nhật trạng thái đơn hàng thành công!");
    } catch (err: any) {
      console.error("Update order error:", err);
      setError(err.message || "Không thể cập nhật đơn hàng");
    }
  };

  // Delete order
  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa đơn hàng này?")) return;

    try {
      setError("");
      setSuccess("");

      const newOrders = orders.filter((o) => o.id !== id);
      saveOrders(newOrders);
      setSuccess("Xóa đơn hàng thành công!");
      setDetailsOpen(false);
    } catch (err: any) {
      console.error("Delete order error:", err);
      setError(err.message || "Không thể xóa đơn hàng");
    }
  };

  // Filter orders by tab
  const filteredOrders =
    currentTab === "all"
      ? orders
      : orders.filter((o) => o.status === currentTab);

  // Count orders by status
  const orderCounts = {
    all: orders.length,
    pending: orders.filter((o) => o.status === "pending").length,
    processing: orders.filter((o) => o.status === "processing").length,
    completed: orders.filter((o) => o.status === "completed").length,
    cancelled: orders.filter((o) => o.status === "cancelled").length,
  };

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 700, color: "#01579B", mb: 1 }}
        >
          Quản Lý Đơn Hàng
        </Typography>
        <Typography variant="body2" sx={{ color: "text.secondary" }}>
          Quản lý đơn hàng sản phẩm từ khách hàng
        </Typography>
      </Box>

      {/* Stats Cards */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <CardContent>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Tất cả
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#0288D1" }}
              >
                {orderCounts.all}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <CardContent>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Chờ xử lý
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#FF9800" }}
              >
                {orderCounts.pending}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <CardContent>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Đang xử lý
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#2196F3" }}
              >
                {orderCounts.processing}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        <Grid size={{ xs: 6, sm: 3 }}>
          <Card
            sx={{ borderRadius: 2, boxShadow: "0 2px 8px rgba(0,0,0,0.08)" }}
          >
            <CardContent>
              <Typography
                variant="body2"
                sx={{ color: "text.secondary", mb: 1 }}
              >
                Hoàn thành
              </Typography>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, color: "#4CAF50" }}
              >
                {orderCounts.completed}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Alerts */}
      <AnimatePresence>
        {error && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert
              severity="error"
              sx={{ mb: 2, borderRadius: 2 }}
              onClose={() => setError("")}
            >
              {error}
            </Alert>
          </motion.div>
        )}
        {success && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
          >
            <Alert
              severity="success"
              sx={{ mb: 2, borderRadius: 2 }}
              onClose={() => setSuccess("")}
            >
              {success}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Filter Tabs */}
      <Paper sx={{ mb: 3, borderRadius: 2 }}>
        <Tabs
          value={currentTab}
          onChange={(_, newValue) => setCurrentTab(newValue)}
          sx={{ borderBottom: 1, borderColor: "divider" }}
        >
          <Tab label={`Tất cả (${orderCounts.all})`} value="all" />
          <Tab label={`Chờ xử lý (${orderCounts.pending})`} value="pending" />
          <Tab
            label={`Đang xử lý (${orderCounts.processing})`}
            value="processing"
          />
          <Tab
            label={`Hoàn thành (${orderCounts.completed})`}
            value="completed"
          />
          <Tab label={`Đã hủy (${orderCounts.cancelled})`} value="cancelled" />
        </Tabs>
      </Paper>

      {/* Orders Table */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredOrders.length === 0 ? (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h6" sx={{ color: "text.secondary" }}>
            Không có đơn hàng nào
          </Typography>
        </Card>
      ) : (
        <TableContainer
          component={Paper}
          sx={{ borderRadius: 2, boxShadow: "0 2px 12px rgba(0,0,0,0.08)" }}
        >
          <Table>
            <TableHead>
              <TableRow sx={{ bgcolor: "#F5F5F5" }}>
                <TableCell sx={{ fontWeight: 700 }}>Mã Đơn</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Khách Hàng</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Điện Thoại</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Tổng Tiền</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Trạng Thái</TableCell>
                <TableCell sx={{ fontWeight: 700 }}>Ngày Đặt</TableCell>
                <TableCell sx={{ fontWeight: 700 }} align="center">
                  Hành Động
                </TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {filteredOrders.map((order) => (
                <TableRow
                  key={order.id}
                  sx={{ "&:hover": { bgcolor: "#F9F9F9" } }}
                >
                  <TableCell sx={{ fontWeight: 600 }}>{order.id}</TableCell>
                  <TableCell>{order.customerName}</TableCell>
                  <TableCell>{order.customerPhone}</TableCell>
                  <TableCell sx={{ fontWeight: 600, color: "#FF6F00" }}>
                    {order.totalAmount.toLocaleString()}đ
                  </TableCell>
                  <TableCell>
                    <Chip
                      icon={statusIcons[order.status]}
                      label={statusLabels[order.status]}
                      color={statusColors[order.status]}
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />
                  </TableCell>
                  <TableCell>{order.createdDate}</TableCell>
                  <TableCell align="center">
                    <IconButton
                      onClick={() => handleViewDetails(order)}
                      sx={{
                        color: "#0288D1",
                        "&:hover": { bgcolor: "rgba(2, 136, 209, 0.1)" },
                      }}
                    >
                      <VisibilityIcon />
                    </IconButton>
                    <IconButton
                      onClick={() => handleDelete(order.id)}
                      sx={{
                        color: "#D32F2F",
                        "&:hover": { bgcolor: "rgba(211, 47, 47, 0.1)" },
                      }}
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      )}

      {/* Order Details Dialog */}
      <Dialog
        open={detailsOpen}
        onClose={() => setDetailsOpen(false)}
        maxWidth="md"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            bgcolor: "linear-gradient(135deg, #0288D1 0%, #01579B 100%)",
            background: "linear-gradient(135deg, #0288D1 0%, #01579B 100%)",
            color: "white",
            fontWeight: 700,
          }}
        >
          Chi Tiết Đơn Hàng - {selectedOrder?.id}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          {selectedOrder && (
            <Box>
              {/* Customer Info */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 2, color: "#01579B" }}
              >
                Thông Tin Khách Hàng
              </Typography>
              <Grid container spacing={2} sx={{ mb: 3 }}>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Tên:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedOrder.customerName}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 6 }}>
                  <Typography variant="body2" color="text.secondary">
                    Điện thoại:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedOrder.customerPhone}
                  </Typography>
                </Grid>
                <Grid size={{ xs: 12 }}>
                  <Typography variant="body2" color="text.secondary">
                    Địa chỉ:
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    {selectedOrder.customerAddress}
                  </Typography>
                </Grid>
              </Grid>

              <Divider sx={{ my: 3 }} />

              {/* Order Items */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 2, color: "#01579B" }}
              >
                Sản Phẩm
              </Typography>
              <TableContainer
                component={Paper}
                variant="outlined"
                sx={{ mb: 3 }}
              >
                <Table size="small">
                  <TableHead>
                    <TableRow sx={{ bgcolor: "#F5F5F5" }}>
                      <TableCell sx={{ fontWeight: 700 }}>Sản phẩm</TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        Số lượng
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        Đơn giá
                      </TableCell>
                      <TableCell align="right" sx={{ fontWeight: 700 }}>
                        Thành tiền
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {selectedOrder.items.map((item, idx) => (
                      <TableRow key={idx}>
                        <TableCell>{item.productName}</TableCell>
                        <TableCell align="right">{item.quantity}</TableCell>
                        <TableCell align="right">
                          {item.price.toLocaleString()}đ
                        </TableCell>
                        <TableCell align="right" sx={{ fontWeight: 600 }}>
                          {(item.quantity * item.price).toLocaleString()}đ
                        </TableCell>
                      </TableRow>
                    ))}
                    <TableRow>
                      <TableCell
                        colSpan={3}
                        sx={{ fontWeight: 700, fontSize: "1.1rem" }}
                      >
                        Tổng cộng:
                      </TableCell>
                      <TableCell
                        align="right"
                        sx={{
                          fontWeight: 700,
                          fontSize: "1.1rem",
                          color: "#FF6F00",
                        }}
                      >
                        {selectedOrder.totalAmount.toLocaleString()}đ
                      </TableCell>
                    </TableRow>
                  </TableBody>
                </Table>
              </TableContainer>

              {/* Status Update */}
              <Typography
                variant="h6"
                sx={{ fontWeight: 700, mb: 2, color: "#01579B" }}
              >
                Cập Nhật Trạng Thái
              </Typography>
              <FormControl fullWidth>
                <InputLabel>Trạng thái</InputLabel>
                <Select
                  value={selectedOrder.status}
                  label="Trạng thái"
                  onChange={(e) =>
                    handleUpdateStatus(e.target.value as Order["status"])
                  }
                >
                  <MenuItem value="pending">Chờ xử lý</MenuItem>
                  <MenuItem value="processing">Đang xử lý</MenuItem>
                  <MenuItem value="completed">Hoàn thành</MenuItem>
                  <MenuItem value="cancelled">Đã hủy</MenuItem>
                </Select>
              </FormControl>

              {selectedOrder.notes && (
                <Box sx={{ mt: 3 }}>
                  <Typography variant="body2" color="text.secondary">
                    Ghi chú:
                  </Typography>
                  <Typography variant="body1">{selectedOrder.notes}</Typography>
                </Box>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3 }}>
          <Button onClick={() => setDetailsOpen(false)}>Đóng</Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
