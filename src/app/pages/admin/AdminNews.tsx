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
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";

interface NewsArticle {
  id: string;
  title: string;
  content: string;
  excerpt: string;
  imageUrl: string;
  author: string;
  publishedDate: string;
  category: "tips" | "news" | "guide";
}

// Mock data - Dữ liệu mẫu tin tức
const INITIAL_NEWS: NewsArticle[] = [
  {
    id: "1",
    title: "Cách Bảo Quản Giày Đúng Cách",
    content:
      "Hướng dẫn chi tiết cách bảo quản giày để luôn như mới. Tránh ánh nắng trực tiếp, bảo quản nơi khô ráo, sử dụng giấy nhồi giữ form...",
    excerpt: "Những mẹo nhỏ giúp giày bền đẹp lâu dài",
    imageUrl: "https://images.unsplash.com/photo-1560769629-975ec94e6a86?w=400",
    author: "Admin",
    publishedDate: "2024-01-15",
    category: "tips",
  },
  {
    id: "2",
    title: "Xu Hướng Giày Sneaker 2024",
    content:
      "Khám phá những xu hướng sneaker hot nhất năm 2024. Từ retro đến minimalist, colorblock đến chunky sole...",
    excerpt: "Cập nhật trends mới nhất trong làng giày",
    imageUrl: "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400",
    author: "Admin",
    publishedDate: "2024-01-10",
    category: "news",
  },
  {
    id: "3",
    title: "Hướng Dẫn Vệ Sinh Giày Tại Nhà",
    content:
      "Bí quyết vệ sinh giày tại nhà đơn giản, hiệu quả. Chuẩn bị dụng cụ, các bước thực hiện chi tiết...",
    excerpt: "DIY guide cho người mới bắt đầu",
    imageUrl:
      "https://images.unsplash.com/photo-1600269452121-4f2416e55c28?w=400",
    author: "Admin",
    publishedDate: "2024-01-05",
    category: "guide",
  },
  {
    id: "4",
    title: "Phân Biệt Giày Chính Hãng và Fake",
    content:
      "Cách nhận biết giày real vs fake qua logo, chất liệu, đường chỉ, hộp đựng và giấy tờ kèm theo...",
    excerpt: "Tips để không mua phải hàng nhái",
    imageUrl:
      "https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400",
    author: "Admin",
    publishedDate: "2023-12-28",
    category: "guide",
  },
];

const CATEGORIES = {
  tips: "Mẹo Hay",
  news: "Tin Tức",
  guide: "Hướng Dẫn",
};

export function AdminNews() {
  const [news, setNews] = useState<NewsArticle[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [searchQuery, setSearchQuery] = useState("");

  // Dialog state
  const [openDialog, setOpenDialog] = useState(false);
  const [editingArticle, setEditingArticle] = useState<NewsArticle | null>(
    null
  );
  const [formData, setFormData] = useState({
    title: "",
    content: "",
    excerpt: "",
    imageUrl: "",
    category: "tips" as NewsArticle["category"],
  });

  // Load news from localStorage or use initial data
  useEffect(() => {
    const loadNews = () => {
      try {
        const stored = localStorage.getItem("adminNews");
        if (stored) {
          setNews(JSON.parse(stored));
        } else {
          setNews(INITIAL_NEWS);
          localStorage.setItem("adminNews", JSON.stringify(INITIAL_NEWS));
        }
      } catch (err) {
        console.error("Error loading news:", err);
        setNews(INITIAL_NEWS);
      } finally {
        setLoading(false);
      }
    };

    loadNews();
  }, []);

  // Save news to localStorage
  const saveNews = (newNews: NewsArticle[]) => {
    setNews(newNews);
    localStorage.setItem("adminNews", JSON.stringify(newNews));
  };

  // Open add dialog
  const handleOpenAdd = () => {
    setEditingArticle(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      imageUrl: "",
      category: "tips",
    });
    setOpenDialog(true);
  };

  // Open edit dialog
  const handleOpenEdit = (article: NewsArticle) => {
    setEditingArticle(article);
    setFormData({
      title: article.title,
      content: article.content,
      excerpt: article.excerpt,
      imageUrl: article.imageUrl,
      category: article.category,
    });
    setOpenDialog(true);
  };

  // Close dialog
  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingArticle(null);
    setFormData({
      title: "",
      content: "",
      excerpt: "",
      imageUrl: "",
      category: "tips",
    });
  };

  // Save article (add or edit)
  const handleSave = () => {
    try {
      setError("");
      setSuccess("");

      const today = new Date().toISOString().split("T")[0];

      const newArticle: NewsArticle = {
        id: editingArticle?.id || `news${Date.now()}`,
        title: formData.title,
        content: formData.content,
        excerpt: formData.excerpt,
        imageUrl: formData.imageUrl,
        category: formData.category,
        author: "Admin",
        publishedDate: editingArticle?.publishedDate || today,
      };

      let newNews: NewsArticle[];
      if (editingArticle) {
        newNews = news.map((n) =>
          n.id === editingArticle.id ? newArticle : n
        );
        setSuccess("Cập nhật tin tức thành công!");
      } else {
        newNews = [newArticle, ...news];
        setSuccess("Thêm tin tức mới thành công!");
      }

      saveNews(newNews);
      handleCloseDialog();
    } catch (err: any) {
      console.error("Save news error:", err);
      setError(err.message || "Không thể lưu tin tức");
    }
  };

  // Delete article
  const handleDelete = (id: string) => {
    if (!confirm("Bạn có chắc chắn muốn xóa tin tức này?")) return;

    try {
      setError("");
      setSuccess("");

      const newNews = news.filter((n) => n.id !== id);
      saveNews(newNews);
      setSuccess("Xóa tin tức thành công!");
    } catch (err: any) {
      console.error("Delete news error:", err);
      setError(err.message || "Không thể xóa tin tức");
    }
  };

  // Filter news based on search
  const filteredNews = news.filter(
    (article) =>
      article.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      article.content.toLowerCase().includes(searchQuery.toLowerCase())
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
            Quản Lý Tin Tức
          </Typography>
          <Typography variant="body2" sx={{ color: "text.secondary" }}>
            Quản lý blog và tin tức về giày
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
          Thêm Tin Tức
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm tin tức..."
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
      ) : filteredNews.length === 0 ? (
        <Card
          sx={{
            p: 6,
            textAlign: "center",
            borderRadius: 3,
            boxShadow: "0 2px 12px rgba(0,0,0,0.08)",
          }}
        >
          <Typography variant="h6" sx={{ color: "text.secondary", mb: 2 }}>
            {searchQuery ? "Không tìm thấy tin tức nào" : "Chưa có tin tức nào"}
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAdd}
              sx={{ bgcolor: "#0288D1", mt: 2 }}
            >
              Thêm Tin Tức Đầu Tiên
            </Button>
          )}
        </Card>
      ) : (
        <Grid container spacing={3}>
          {filteredNews.map((article, index) => (
            <Grid size={{ xs: 12, sm: 6, lg: 4 }} key={article.id}>
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
                    image={article.imageUrl}
                    alt={article.title}
                    sx={{ objectFit: "cover" }}
                  />
                  <CardContent sx={{ flexGrow: 1, p: 3 }}>
                    <Chip
                      label={CATEGORIES[article.category]}
                      size="small"
                      sx={{
                        mb: 1.5,
                        bgcolor: "rgba(2, 136, 209, 0.1)",
                        color: "#0288D1",
                        fontWeight: 600,
                      }}
                    />
                    <Typography
                      variant="h6"
                      sx={{ fontWeight: 700, mb: 1, color: "#01579B" }}
                    >
                      {article.title}
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
                      {article.excerpt}
                    </Typography>

                    <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                      <CalendarTodayIcon
                        sx={{ fontSize: 16, color: "text.secondary" }}
                      />
                      <Typography
                        variant="caption"
                        sx={{ color: "text.secondary" }}
                      >
                        {article.publishedDate}
                      </Typography>
                    </Box>
                  </CardContent>

                  <CardActions sx={{ p: 2, pt: 0, gap: 1 }}>
                    <Tooltip title="Chỉnh sửa">
                      <IconButton
                        onClick={() => handleOpenEdit(article)}
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
                        onClick={() => handleDelete(article.id)}
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
        maxWidth="md"
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
          {editingArticle ? "✏️ Sửa Tin Tức" : "➕ Thêm Tin Tức Mới"}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <TextField
            fullWidth
            required
            label="Tiêu Đề"
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Tóm Tắt"
            value={formData.excerpt}
            onChange={(e) =>
              setFormData({ ...formData, excerpt: e.target.value })
            }
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            required
            label="Nội Dung"
            multiline
            rows={6}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
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
            sx={{ mb: 2 }}
          />
          <TextField
            fullWidth
            select
            label="Danh Mục"
            value={formData.category}
            onChange={(e) =>
              setFormData({
                ...formData,
                category: e.target.value as NewsArticle["category"],
              })
            }
            SelectProps={{ native: true }}
          >
            <option value="tips">Mẹo Hay</option>
            <option value="news">Tin Tức</option>
            <option value="guide">Hướng Dẫn</option>
          </TextField>
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
              !formData.content ||
              !formData.excerpt ||
              !formData.imageUrl
            }
          >
            {editingArticle ? "Cập Nhật" : "Thêm Mới"}
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
