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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import SearchIcon from "@mui/icons-material/Search";
import InventoryIcon from "@mui/icons-material/Inventory";

interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: "protection" | "care" | "cleaning" | "accessories";
  stock: number;
}

// Mock data - Dữ liệu mẫu sản phẩm
const INITIAL_PRODUCTS: Product[] = [
  {
    id: "1",
    name: "Xịt Chống Nước Premium",
    description:
      "Xịt bảo vệ giày chống nước, chống bụi bẩn. Công thức đặc biệt không làm hại da giày.",
    price: 150000,
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    category: "protection",
    stock: 50,
  },
  {
    id: "2",
    name: "Kem Dưỡng Da Cao Cấp",
    description:
      "Dưỡng da giày mềm mại, bền đẹp. Phù hợp cho giày da, giày tây.",
    price: 120000,
    imageUrl:
      "https://images.unsplash.com/photo-1608667508764-33cf0726b13a?w=400",
    category: "care",
    stock: 30,
  },
  {
    id: "3",
    name: "Bộ Dụng Cụ Vệ Sinh",
    description:
      "Bộ đầy đủ bàn chải, khăn lau chuyên dụng cho việc vệ sinh giày tại nhà.",
    price: 80000,
    imageUrl:
      "https://images.unsplash.com/photo-1584735935682-2f2b69dff9d2?w=400",
    category: "cleaning",
    stock: 40,
  },
  {
    id: "4",
    name: "Lót Giày Khử Mùi",
    description:
      "Lót giày cao cấp với công nghệ khử mùi, kháng khuẩn, thoáng khí.",
    price: 50000,
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
    category: "accessories",
    stock: 100,
  },
  {
    id: "5",
    name: "Nước Tẩy Vết Bẩn",
    description:
      "Nước tẩy vết bẩn cứng đầu, hiệu quả cao, an toàn cho mọi chất liệu.",
    price: 90000,
    imageUrl: "https://images.unsplash.com/photo-1556906781-9a412961c28c?w=400",
    category: "cleaning",
    stock: 60,
  },
  {
    id: "6",
    name: "Đánh Bóng Giày Da",
    description:
      "Kem đánh bóng giày da, giúp giày luôn sáng bóng và sang trọng.",
    price: 70000,
    imageUrl: "https://images.unsplash.com/photo-1542219550-37153d387c27?w=400",
    category: "care",
    stock: 45,
  },
];

const CATEGORIES = {
  protection: "Bảo vệ",
  care: "Chăm sóc",
  cleaning: "Vệ sinh",
  accessories: "Phụ kiện",
};

export function AdminProducts() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [formData, setFormData] = useState({
    name: "",
    description: "",
    price: "",
    imageUrl: "",
    category: "protection" as Product["category"],
    stock: "",
  });

  // Load products from localStorage or use initial data
  useEffect(() => {
    const loadProducts = () => {
      try {
        const stored = localStorage.getItem("adminProducts");
        if (stored) {
          setProducts(JSON.parse(stored));
        } else {
          setProducts(INITIAL_PRODUCTS);
          localStorage.setItem(
            "adminProducts",
            JSON.stringify(INITIAL_PRODUCTS)
          );
        }
      } catch (err) {
        console.error("Error loading products:", err);
        setProducts(INITIAL_PRODUCTS);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Save products to localStorage
  const saveProducts = (newProducts: Product[]) => {
    setProducts(newProducts);
    localStorage.setItem("adminProducts", JSON.stringify(newProducts));
  };

  // Open add dialog
  const handleOpenAdd = () => {
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "protection",
      stock: "",
    });
    setOpenDialog(true);
  };

  // Open edit dialog
  const handleOpenEdit = (product: Product) => {
    setEditingProduct(product);
    setFormData({
      name: product.name,
      description: product.description,
      price: product.price.toString(),
      imageUrl: product.imageUrl,
      category: product.category,
      stock: product.stock.toString(),
    });
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingProduct(null);
    setFormData({
      name: "",
      description: "",
      price: "",
      imageUrl: "",
      category: "protection",
      stock: "",
    });
  };

  // Save product (add or edit)
  const handleSave = () => {
    try {
      setError("");
      setSuccess("");

      const newProduct: Product = {
        id: editingProduct?.id || `prd${Date.now()}`,
        name: formData.name,
        description: formData.description,
        price: Number(formData.price),
        imageUrl: formData.imageUrl,
        category: formData.category,
        stock: Number(formData.stock),
      };

      let newProducts: Product[];
      if (editingProduct) {
        newProducts = products.map((p) =>
          p.id === editingProduct.id ? newProduct : p
        );
        setSuccess("Cập nhật sản phẩm thành công!");
      } else {
        newProducts = [newProduct, ...products];
        setSuccess("Thêm sản phẩm mới thành công!");
      }

      saveProducts(newProducts);
      handleCloseDialog();
    } catch (err: any) {
      console.error("Save product error:", err);
      setError(err.message || "Không thể lưu sản phẩm");
    }
  };

  // Delete product
  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa sản phẩm này?")) return;

    try {
      setError("");
      setSuccess("");

      const newProducts = products.filter((p) => p.id !== id);
      saveProducts(newProducts);
      setSuccess("Xóa sản phẩm thành công!");
    } catch (err: any) {
      console.error("Delete product error:", err);
      setError(err.message || "Không thể xóa sản phẩm");
    }
  };

  // Filter products based on search
  const filteredProducts = products.filter(
    (product) =>
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      product.description.toLowerCase().includes(searchQuery.toLowerCase())
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
            Quản Lý Sản Phẩm
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Quản lý sản phẩm chăm sóc giày
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
          Thêm Sản Phẩm
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm sản phẩm..."
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
      ) : filteredProducts.length === 0 ? (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
            {searchQuery
              ? "Không tìm thấy sản phẩm nào"
              : "Chưa có sản phẩm nào"}
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              sx={{ bgcolor: "#0288D1", mt: 2 }}
            >
              Thêm Sản Phẩm Đầu Tiên
            </Button>
          )}
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredProducts.map((product, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={product.id}>
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
                    image={product.imageUrl}
                    alt={product.name}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: "#01579B" }}
                    >
                      {product.name}
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
                      {product.description}
                    </Typography>

                    <Box
                      sx={{ display: "flex", gap: 1, mb: 1, flexWrap: "wrap" }}
                    >
                      <Chip
                        label={`${product.price.toLocaleString()}đ`}
                        size="small"
                        sx={{
                          bgcolor: "rgba(255, 111, 0, 0.1)",
                          color: "#FF6F00",
                          fontWeight: 600,
                        }}
                      />
                      <Chip
                        label={CATEGORIES[product.category]}
                        size="small"
                        sx={{
                          bgcolor: "rgba(2, 136, 209, 0.1)",
                          color: "#0288D1",
                          fontWeight: 600,
                        }}
                      />
                    </Box>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <InventoryIcon
                        sx={{ fontSize: 18, color: "text.secondary" }}
                      />
                      <Typography
                        variant="body2"
                        sx={{ color: "text.secondary" }}
                      >
                        Kho: {product.stock}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        onClick={() => handleOpenEdit(product)}
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
                        onClick={() => handleDelete(product.id)}
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
          {editingProduct ? "✏️ Sửa Sản Phẩm" : "➕ Thêm Sản Phẩm Mới"}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <TextField
            fullWidth
            required
            label="Tên Sản Phẩm"
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
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
            label="Giá (VNĐ)"
            type="number"
            value={formData.price}
            onChange={(e) =>
              setFormData({ ...formData, price: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Danh Mục</InputLabel>
            <Select
              value={formData.category}
              label="Danh Mục"
              onChange={(e) =>
                setFormData({
                  ...formData,
                  category: e.target.value as Product["category"],
                })
              }
            >
              <MenuItem value="protection">Bảo vệ</MenuItem>
              <MenuItem value="care">Chăm sóc</MenuItem>
              <MenuItem value="cleaning">Vệ sinh</MenuItem>
              <MenuItem value="accessories">Phụ kiện</MenuItem>
            </Select>
          </FormControl>
          <TextField
            fullWidth
            required
            label="Số Lượng Trong Kho"
            type="number"
            value={formData.stock}
            onChange={(e) =>
              setFormData({ ...formData, stock: e.target.value })
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
            helperText="Nhập URL của hình ảnh"
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
              !formData.name ||
              !formData.description ||
              !formData.price ||
              !formData.stock ||
              !formData.imageUrl
            }
          >
            {editingProduct ? "Cập Nhật" : "Thêm Mới"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
