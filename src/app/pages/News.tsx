import { useState } from "react";
import {
  Container,
  Typography,
  Box,
  Grid,
  Card,
  CardMedia,
  CardContent,
  Button,
  Chip,
} from "@mui/material";
import CalendarTodayIcon from "@mui/icons-material/CalendarToday";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";

// ==========================================
// MOCK DATA - Dữ liệu mẫu để học
// ==========================================
const newsData = [
  {
    id: 1,
    title: "Bí quyết vệ sinh giày da không bị hư",
    excerpt:
      "Giày da cần được chăm sóc đặc biệt để giữ độ bền và vẻ đẹp. Hãy cùng tìm hiểu các bước vệ sinh giày da đúng cách, sử dụng các sản phẩm an toàn và phương pháp hiệu quả nhất.",
    image:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&h=300&fit=crop",
    date: "15/01/2025",
    category: "Hướng dẫn",
    author: "Nguyễn Văn A",
  },
  {
    id: 2,
    title: "Top 5 sản phẩm vệ sinh giày tốt nhất 2025",
    excerpt:
      "Chúng tôi đã thử nghiệm hàng chục sản phẩm để tìm ra những sản phẩm vệ sinh giày tốt nhất, an toàn và hiệu quả nhất cho mọi loại giày từ da, vải đến sneaker.",
    image:
      "https://images.unsplash.com/photo-1460353581641-37baddab0fa2?w=500&h=300&fit=crop",
    date: "12/01/2025",
    category: "Sản phẩm",
    author: "Trần Thị B",
  },
  {
    id: 3,
    title: "Làm thế nào để khử mùi giày hiệu quả",
    excerpt:
      "Mùi hôi giày là vấn đề phổ biến gây khó chịu. Bài viết này sẽ chia sẻ những mẹo đơn giản nhưng cực kỳ hiệu quả giúp giày của bạn luôn thơm tho và sạch sẽ.",
    image:
      "https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=500&h=300&fit=crop",
    date: "10/01/2025",
    category: "Mẹo hay",
    author: "Lê Văn C",
  },
  {
    id: 4,
    title: "Vệ sinh giày sneaker trắng như mới",
    excerpt:
      "Giày sneaker trắng rất dễ bẩn và ố vàng. Cùng khám phá cách làm sạch và giữ màu trắng tinh khiết cho đôi giày yêu thích của bạn với các phương pháp đơn giản tại nhà.",
    image:
      "https://images.unsplash.com/photo-1600185365926-3a2ce3cdb9eb?w=500&h=300&fit=crop",
    date: "08/01/2025",
    category: "Hướng dẫn",
    author: "Phạm Thị D",
  },
  {
    id: 5,
    title: "Dịch vụ vệ sinh giày cao cấp tại GIÀY CƯNG",
    excerpt:
      "GIÀY CƯNG tự hào mang đến dịch vụ vệ sinh giày chuyên nghiệp với đội ngũ kỹ thuật viên giàu kinh nghiệm, máy móc hiện đại và cam kết chất lượng 100%.",
    image:
      "https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=500&h=300&fit=crop",
    date: "05/01/2025",
    category: "Tin tức",
    author: "Admin",
  },
  {
    id: 6,
    title: "Cách bảo quản giày khi không sử dụng",
    excerpt:
      "Bảo quản đúng cách giúp giày bền đẹp hơn và kéo dài tuổi thọ. Hãy tìm hiểu cách cất giữ giày an toàn, tránh mốc, ẩm và biến dạng khi không sử dụng trong thời gian dài.",
    image:
      "https://images.unsplash.com/photo-1552346154-21d32810aba3?w=500&h=300&fit=crop",
    date: "03/01/2025",
    category: "Mẹo hay",
    author: "Hoàng Văn E",
  },
  {
    id: 7,
    title: "Xu hướng giày thể thao năm 2025",
    excerpt:
      "Khám phá những xu hướng giày thể thao mới nhất trong năm 2025 từ các thương hiệu hàng đầu thế giới. Từ màu sắc, chất liệu đến kiểu dáng đều có sự đột phá mới.",
    image:
      "https://images.unsplash.com/photo-1605348532760-6753d2c43329?w=500&h=300&fit=crop",
    date: "01/01/2025",
    category: "Tin tức",
    author: "Nguyễn Văn F",
  },
  {
    id: 8,
    title: "Phân biệt giày chính hãng và hàng fake",
    excerpt:
      "Hướng dẫn chi tiết cách nhận biết giày chính hãng qua các dấu hiệu như logo, chất liệu, đường may, tem mác và hộp đựng. Tránh mua phải hàng giả kém chất lượng.",
    image:
      "https://images.unsplash.com/photo-1551107696-a4b0c5a0d9a2?w=500&h=300&fit=crop",
    date: "28/12/2024",
    category: "Hướng dẫn",
    author: "Trần Thị G",
  },
  {
    id: 9,
    title: "Chương trình khuyến mãi đặc biệt tháng 1",
    excerpt:
      "Nhân dịp đầu năm mới, GIÀY CŨNG tung ra chương trình ưu đãi lớn: Giảm 30% dịch vụ vệ sinh, tặng kèm sản phẩm chăm sóc giày cao cấp cho khách hàng thân thiết.",
    image:
      "https://images.unsplash.com/photo-1441986300917-64674bd600d8?w=500&h=300&fit=crop",
    date: "25/12/2024",
    category: "Tin tức",
    author: "Admin",
  },
];

// ==========================================
// COMPONENT CHÍNH
// ==========================================
export function News() {
  // STATE: Quản lý category được chọn
  const [selectedCategory, setSelectedCategory] = useState("Tất cả");

  // Danh sách categories (lấy unique từ newsData)
  const categories = ["Tất cả", "Hướng dẫn", "Sản phẩm", "Mẹo hay", "Tin tức"];

  // Filter news theo category
  const filteredNews =
    selectedCategory === "Tất cả"
      ? newsData
      : newsData.filter((news) => news.category === selectedCategory);

  return (
    <Box>
      {/* ==========================================
          HERO SECTION - Phần đầu trang
          ========================================== */}
      <Box
        sx={{
          bgcolor: "#0288D1", // Màu xanh nước biển
          color: "white",
          py: { xs: 6, md: 8 }, // Padding responsive: mobile 6, desktop 8
          textAlign: "center",
          position: "relative",
          overflow: "hidden",
          // Gradient overlay cho đẹp
          background:
            "linear-gradient(135deg, #01579B 0%, #0288D1 50%, #4FC3F7 100%)",
        }}
      >
        <Container maxWidth="lg">
          <Typography
            variant="h2"
            sx={{
              fontWeight: 700,
              mb: 2,
              fontSize: { xs: "2rem", sm: "2.5rem", md: "3rem" }, // Responsive font
            }}
          >
            Tin Tức & Mẹo Hay
          </Typography>
          <Typography
            variant="h6"
            sx={{
              opacity: 0.95,
              fontSize: { xs: "1rem", md: "1.25rem" },
              maxWidth: "600px",
              mx: "auto",
            }}
          >
            Cập nhật những thông tin mới nhất về chăm sóc và bảo quản giày
          </Typography>
        </Container>
      </Box>

      {/* ==========================================
          MAIN CONTENT
          ========================================== */}
      <Container maxWidth="lg" sx={{ py: { xs: 4, md: 8 } }}>
        {/* ==========================================
            FILTER CATEGORIES - Tabs lọc danh mục
            ========================================== */}
        <Box
          sx={{
            mb: 5,
            display: "flex",
            gap: 2,
            flexWrap: "wrap",
            justifyContent: "center",
          }}
        >
          {categories.map((cat) => (
            <Chip
              key={cat}
              label={cat}
              onClick={() => setSelectedCategory(cat)}
              icon={selectedCategory === cat ? <LocalOfferIcon /> : undefined}
              sx={{
                px: 2,
                py: 2.5,
                fontSize: "0.95rem",
                fontWeight: selectedCategory === cat ? 600 : 400,
                bgcolor: selectedCategory === cat ? "#0288D1" : "#F5F5F5",
                color: selectedCategory === cat ? "white" : "#424242",
                border:
                  selectedCategory === cat
                    ? "2px solid #01579B"
                    : "2px solid transparent",
                cursor: "pointer",
                transition: "all 0.3s ease",
                "&:hover": {
                  bgcolor: selectedCategory === cat ? "#0277BD" : "#E0E0E0",
                  transform: "translateY(-2px)",
                  boxShadow:
                    selectedCategory === cat
                      ? "0 4px 12px rgba(2, 136, 209, 0.3)"
                      : "0 2px 8px rgba(0,0,0,0.1)",
                },
              }}
            />
          ))}
        </Box>

        {/* ==========================================
            EMPTY STATE - Hiển thị khi không có tin
            ========================================== */}
        {filteredNews.length === 0 ? (
          <Box sx={{ textAlign: "center", py: 8 }}>
            <Typography variant="h6" color="text.secondary" sx={{ mb: 2 }}>
              Không có tin tức nào trong mục này
            </Typography>
            <Button
              variant="outlined"
              onClick={() => setSelectedCategory("Tất cả")}
            >
              Xem tất cả tin tức
            </Button>
          </Box>
        ) : (
          <>
            {/* ==========================================
                RESULTS COUNT - Hiển thị số lượng kết quả
                ========================================== */}
            <Typography
              variant="body2"
              color="text.secondary"
              sx={{ mb: 3, textAlign: "center" }}
            >
              Hiển thị <strong>{filteredNews.length}</strong> tin tức
            </Typography>

            {/* ==========================================
                NEWS GRID - Lưới hiển thị tin tức
                ========================================== */}
            <Grid container spacing={4}>
              {filteredNews.map((news) => (
                <Grid size={{ xs: 12, sm: 6, md: 4 }} key={news.id}>
                  <Card
                    sx={{
                      height: "100%", // Card chiều cao đầy
                      display: "flex",
                      flexDirection: "column",
                      borderRadius: 2,
                      overflow: "hidden",
                      transition: "all 0.3s ease-in-out",
                      cursor: "pointer",
                      // Hover effect - Nâng lên và đổ bóng
                      "&:hover": {
                        transform: "translateY(-8px)",
                        boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                        // Hover vào ảnh thì zoom in
                        "& .news-image": {
                          transform: "scale(1.1)",
                        },
                      },
                    }}
                  >
                    {/* ==========================================
                        CARD IMAGE - Ảnh bài viết
                        ========================================== */}
                    <Box sx={{ overflow: "hidden", height: 200 }}>
                      <CardMedia
                        component="img"
                        height="200"
                        image={news.image}
                        alt={news.title}
                        className="news-image" // Class để áp dụng hover effect
                        sx={{
                          objectFit: "cover",
                          transition: "transform 0.5s ease",
                        }}
                      />
                    </Box>

                    {/* ==========================================
                        CARD CONTENT - Nội dung bài viết
                        ========================================== */}
                    <CardContent
                      sx={{
                        flexGrow: 1,
                        display: "flex",
                        flexDirection: "column",
                        p: 3,
                      }}
                    >
                      {/* Category Chip */}
                      <Chip
                        label={news.category}
                        size="small"
                        icon={<LocalOfferIcon />}
                        sx={{
                          alignSelf: "flex-start",
                          mb: 2,
                          bgcolor: "#E3F2FD",
                          color: "#0288D1",
                          fontWeight: 600,
                          fontSize: "0.75rem",
                        }}
                      />

                      {/* Title - Tiêu đề */}
                      <Typography
                        variant="h6"
                        sx={{
                          fontWeight: 700,
                          mb: 2,
                          lineHeight: 1.3,
                          // Text truncate - Cắt text sau 2 dòng
                          display: "-webkit-box",
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                          minHeight: "3.2rem", // Đảm bảo height đồng nhất
                          color: "#212121",
                        }}
                      >
                        {news.title}
                      </Typography>

                      {/* Excerpt - Mô tả ngắn */}
                      <Typography
                        variant="body2"
                        color="text.secondary"
                        sx={{
                          mb: 3,
                          flexGrow: 1, // Chiếm hết không gian còn lại
                          lineHeight: 1.6,
                          // Text truncate - Cắt text sau 3 dòng
                          display: "-webkit-box",
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: "vertical",
                          overflow: "hidden",
                        }}
                      >
                        {news.excerpt}
                      </Typography>

                      {/* Footer - Date & Button */}
                      <Box
                        sx={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          mt: "auto",
                        }}
                      >
                        {/* Date */}
                        <Box
                          sx={{
                            display: "flex",
                            alignItems: "center",
                            gap: 0.5,
                          }}
                        >
                          <CalendarTodayIcon
                            sx={{ fontSize: 14, color: "text.secondary" }}
                          />
                          <Typography
                            variant="caption"
                            color="text.secondary"
                            sx={{ fontWeight: 500 }}
                          >
                            {news.date}
                          </Typography>
                        </Box>

                        {/* Read More Button */}
                        <Button
                          size="small"
                          endIcon={<ArrowForwardIcon sx={{ fontSize: 16 }} />}
                          sx={{
                            color: "#0288D1",
                            fontWeight: 600,
                            "&:hover": {
                              bgcolor: "#E3F2FD",
                            },
                          }}
                        >
                          Đọc thêm
                        </Button>
                      </Box>
                    </CardContent>
                  </Card>
                </Grid>
              ))}
            </Grid>
          </>
        )}

        {/* ==========================================
            CTA SECTION - Kêu gọi hành động
            ========================================== */}
        <Box
          sx={{
            mt: 8,
            p: 4,
            bgcolor: "#FFF9C4",
            borderRadius: 2,
            textAlign: "center",
            border: "2px dashed #FFA000",
          }}
        >
          <Typography
            variant="h5"
            sx={{ mb: 2, fontWeight: 700, color: "#F57F17" }}
          >
            Bạn muốn biết thêm thông tin?
          </Typography>
          <Typography variant="body1" sx={{ mb: 3, color: "#616161" }}>
            Đăng ký nhận bản tin để cập nhật những mẹo hay và ưu đãi mới nhất
          </Typography>
          <Button
            variant="contained"
            size="large"
            sx={{
              bgcolor: "#FF6F00",
              px: 4,
              "&:hover": {
                bgcolor: "#E65100",
              },
            }}
          >
            Đăng ký ngay
          </Button>
        </Box>
      </Container>
    </Box>
  );
}
