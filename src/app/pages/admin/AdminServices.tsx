import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Box,
  Typography,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CardActions,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  Tooltip,
  InputAdornment,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

interface Service {
  id: string;
  title: string;
  description: string;
  price: string;
  duration?: string;
  imageUrl: string;
  features?: string[];
}

// Mock data - Dữ liệu mẫu 6 dịch vụ
const INITIAL_SERVICES: Service[] = [
  {
    id: "1",
    title: "Vệ Sinh Cao Cấp",
    description:
      "Vệ sinh sâu toàn bộ giày, làm sạch các vết bẩn cứng đầu, khử mùi và bảo vệ da giày",
    price: "100.000đ - 150.000đ",
    duration: "1-2 giờ",
    imageUrl:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=400",
    features: ["Vệ sinh sâu", "Khử mùi", "Bảo vệ da", "Làm mới đế giày"],
  },
  {
    id: "2",
    title: "Vệ Sinh Cơ Bản",
    description:
      "Vệ sinh bề mặt giày, loại bỏ bụi bẩn thông thường, phù hợp cho giày sử dụng hàng ngày",
    price: "50.000đ - 80.000đ",
    duration: "30-60 phút",
    imageUrl: "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=400",
    features: ["Vệ sinh bề mặt", "Lau khô", "Làm sạch đế"],
  },
  {
    id: "3",
    title: "Giặt Giày Thể Thao",
    description:
      "Chuyên vệ sinh giày thể thao, sneaker, giày chạy bộ với quy trình chuyên nghiệp",
    price: "80.000đ - 120.000đ",
    duration: "1-1.5 giờ",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    features: [
      "Vệ sinh chuyên sâu",
      "Tẩy trắng đế",
      "Khử mùi hôi",
      "Sấy khô an toàn",
    ],
  },
  {
    id: "4",
    title: "Vệ Sinh Giày Da",
    description:
      "Vệ sinh và bảo dưỡng giày da cao cấp, giữ độ mềm mại và bền đẹp cho giày",
    price: "120.000đ - 200.000đ",
    duration: "2-3 giờ",
    imageUrl:
      "https://images.unsplash.com/photo-1533867617858-e7b97e060509?w=400",
    features: [
      "Vệ sinh nhẹ nhàng",
      "Dưỡng da",
      "Đánh bóng",
      "Bảo vệ chống nước",
    ],
  },
  {
    id: "5",
    title: "Phục Hồi Giày Cũ",
    description:
      "Phục hồi giày cũ, sơn lại màu, sửa chữa các hư hỏng nhỏ, làm mới giày như ban đầu",
    price: "150.000đ - 300.000đ",
    duration: "2-4 giờ",
    imageUrl:
      "https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400",
    features: [
      "Phục hồi màu sắc",
      "Sửa chữa hư hỏng",
      "Vệ sinh toàn diện",
      "Bảo dưỡng đặc biệt",
    ],
  },
  {
    id: "6",
    title: "Tẩy Ố Vàng",
    description: "Tẩy vết ố vàng trên đế giày, làm trắng sáng đế giày như mới",
    price: "60.000đ - 100.000đ",
    duration: "1 giờ",
    imageUrl:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=400",
    features: ["Tẩy ố vàng", "Làm trắng đế", "Không hại giày", "Hiệu quả cao"],
  },
];

export function AdminServices() {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [editingService, setEditingService] = useState<Service | null>(null);
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    duration: "",
    imageUrl: "",
    features: "",
  });

  // Load services from localStorage or use initial data
  useEffect(() => {
    const loadServices = () => {
      try {
        const stored = localStorage.getItem("adminServices");
        if (stored) {
          setServices(JSON.parse(stored));
        } else {
          setServices(INITIAL_SERVICES);
          localStorage.setItem(
            "adminServices",
            JSON.stringify(INITIAL_SERVICES)
          );
        }
      } catch (err) {
        console.error("Error loading services:", err);
        setServices(INITIAL_SERVICES);
      } finally {
        setLoading(false);
      }
    };

    loadServices();
  }, []);

  // Save services to localStorage
  const saveServices = (newServices: Service[]) => {
    setServices(newServices);
    localStorage.setItem("adminServices", JSON.stringify(newServices));
  };

  // Open add dialog
  const handleOpenAdd = () => {
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      imageUrl: "",
      features: "",
    });
    setOpenDialog(true);
  };

  // Open edit dialog
  const handleOpenEdit = (service: Service) => {
    setEditingService(service);
    setFormData({
      title: service.title,
      description: service.description,
      price: service.price,
      duration: service.duration || "",
      imageUrl: service.imageUrl,
      features: service.features ? service.features.join(", ") : "",
    });
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingService(null);
    setFormData({
      title: "",
      description: "",
      price: "",
      duration: "",
      imageUrl: "",
      features: "",
    });
  };

  // Save service (add or edit)
  const handleSave = () => {
    try {
      setError("");
      setSuccess("");

      const newService: Service = {
        id: editingService?.id || `srv${Date.now()}`,
        title: formData.title,
        description: formData.description,
        price: formData.price,
        duration: formData.duration,
        imageUrl: formData.imageUrl,
        features: formData.features
          ? formData.features
              .split(",")
              .map((f) => f.trim())
              .filter((f) => f)
          : [],
      };

      let newServices: Service[];
      if (editingService) {
        // Update existing service
        newServices = services.map((s) =>
          s.id === editingService.id ? newService : s
        );
        setSuccess("Cập nhật dịch vụ thành công!");
      } else {
        // Add new service
        newServices = [newService, ...services];
        setSuccess("Thêm dịch vụ mới thành công!");
      }

      saveServices(newServices);
      handleCloseDialog();
    } catch (err: any) {
      console.error("Save service error:", err);
      setError(err.message || "Không thể lưu dịch vụ");
    }
  };

  // Delete service
  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa dịch vụ này?")) return;

    try {
      setError("");
      setSuccess("");

      const newServices = services.filter((s) => s.id !== id);
      saveServices(newServices);
      setSuccess("Xóa dịch vụ thành công!");
    } catch (err: any) {
      console.error("Delete service error:", err);
      setError(err.message || "Không thể xóa dịch vụ");
    }
  };

  // Filter services based on search
  const filteredServices = services.filter(
    (service) =>
      service.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      service.description.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Box>
      {/* Header */}
      <Box
        sx={{
          mb: 4,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 2,
        }}
      >
        <Box>
          <Typography
            variant="h4"
            sx={{ fontWeight: 700, color: "#01579B", mb: 1 }}
          >
            Quản Lý Dịch Vụ
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Quản lý các dịch vụ vệ sinh giày của bạn
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAdd}
          sx={{
            bgcolor: "#0288D1",
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: "0 4px 12px rgba(2, 136, 209, 0.3)",
            "&:hover": {
              bgcolor: "#0277BD",
              boxShadow: "0 6px 16px rgba(2, 136, 209, 0.4)",
            },
          }}
        >
          Thêm Dịch Vụ
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm dịch vụ..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: "text.secondary" }} />
              </InputAdornment>
            ),
          }}
          sx={{
            maxWidth: 500,
            "& .MuiOutlinedInput-root": {
              borderRadius: 2,
              bgcolor: "white",
            },
          }}
        />
      </Box>

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

      {/* Loading State */}
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredServices.length === 0 ? (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
            {searchQuery ? "Không tìm thấy dịch vụ nào" : "Chưa có dịch vụ nào"}
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              sx={{ bgcolor: "#0288D1", mt: 2 }}
            >
              Thêm Dịch Vụ Đầu Tiên
            </Button>
          )}
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredServices.map((service, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <Card
                  sx={{
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    borderRadius: 3,
                    boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      boxShadow: "0 8px 24px rgba(0,0,0,0.12)",
                      transform: "translateY(-4px)",
                    },
                  }}
                >
                  <CardMedia
                    component="img"
                    height="200"
                    image={service.imageUrl}
                    alt={service.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1.5, color: "#01579B" }}
                    >
                      {service.title}
                    </Typography>
                    <Typography
                      variant="body2"
                      sx={{
                        color: "text.secondary",
                        mb: 2,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                      }}
                    >
                      {service.description}
                    </Typography>

                    <Box
                      sx={{ display: "flex", gap: 1, mb: 2, flexWrap: "wrap" }}
                    >
                      <Chip
                        icon={<AttachMoneyIcon sx={{ fontSize: 18 }} />}
                        label={service.price}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 111, 0, 0.1)",
                          color: "#FF6F00",
                          fontWeight: 600,
                        }}
                      />
                      {service.duration && (
                        <Chip
                          icon={<AccessTimeIcon sx={{ fontSize: 18 }} />}
                          label={service.duration}
                          size="small"
                          sx={{
                            bgcolor: "rgba(2, 136, 209, 0.1)",
                            color: "#0288D1",
                            fontWeight: 600,
                          }}
                        />
                      )}
                    </Box>

                    {service.features && service.features.length > 0 && (
                      <Box sx={{ display: "flex", gap: 0.5, flexWrap: "wrap" }}>
                        {service.features.slice(0, 3).map((feature, idx) => (
                          <Chip
                            key={idx}
                            label={feature}
                            size="small"
                            variant="outlined"
                            sx={{ fontSize: "0.75rem" }}
                          />
                        ))}
                      </Box>
                    )}
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        onClick={() => handleOpenEdit(service)}
                        sx={{
                          color: "#0288D1",
                          bgcolor: "rgba(2, 136, 209, 0.1)",
                          "&:hover": { bgcolor: "rgba(2, 136, 209, 0.2)" },
                        }}
                      >
                        <EditIcon />
                      </IconButton>
                    </Tooltip>
                    <Tooltip title="Xóa">
                      <IconButton
                        onClick={() => handleDelete(service.id)}
                        sx={{
                          color: "#D32F2F",
                          bgcolor: "rgba(211, 47, 47, 0.1)",
                          "&:hover": { bgcolor: "rgba(211, 47, 47, 0.2)" },
                        }}
                      >
                        <DeleteIcon />
                      </IconButton>
                    </Tooltip>
                  </CardActions>
                </Card>
              </motion.div>
            </Grid>
          ))}
        </Grid>
      )}

      {/* Add/Edit Dialog */}
      <Dialog
        open={openDialog}
        onClose={handleCloseDialog}
        maxWidth="sm"
        fullWidth
        PaperProps={{
          sx: { borderRadius: 3 },
        }}
      >
        <DialogTitle
          sx={{
            bgcolor: "linear-gradient(135deg, #0288D1 0%, #01579B 100%)",
            background: "linear-gradient(135deg, #0288D1 0%, #01579B 100%)",
            color: "white",
            fontWeight: 700,
          }}
        >
          {editingService ? "✏️ Sửa Dịch Vụ" : "➕ Thêm Dịch Vụ Mới"}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <TextField
            fullWidth
            required
            label="Tên Dịch Vụ"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Mô Tả"
            multiline
            rows={3}
            value={formData.description}
            onChange={(e) =>
              setFormData({ ...formData, description: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Giá"
            placeholder="VD: 50.000đ - 100.000đ"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Thời Gian"
            placeholder="VD: 1 giờ"
            value={formData.duration}
            onChange={(e) =>
              setFormData({ ...formData, duration: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="URL Hình Ảnh"
            value={formData.imageUrl}
            onChange={(e) =>
              setFormData({ ...formData, imageUrl: e.target.value })
            }
            helperText="Nhập URL của hình ảnh hoặc sử dụng Unsplash"
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            label="Tính Năng"
            placeholder="Cách nhau bằng dấu phẩy"
            value={formData.features}
            onChange={(e) =>
              setFormData({ ...formData, features: e.target.value })
            }
            helperText="VD: Vệ sinh sâu, Khử mùi, Bảo vệ da"
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={handleCloseDialog} sx={{ color: "text.secondary" }}>
            Hủy
          </Button>
          <Button
            onClick={handleSave}
            variant="contained"
            sx={{
              bgcolor: "#0288D1",
              px: 3,
              "&:hover": { bgcolor: "#0277BD" },
            }}
            disabled={
              !formData.title ||
              !formData.description ||
              !formData.price ||
              !formData.imageUrl
            }
          >
            {editingService ? "Cập Nhật" : "Thêm Mới"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
