import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Box,
  Chip,
  Button,
  Stack,
} from "@mui/material";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

// Dữ liệu mẫu (Mock Data) - Bạn có thể chỉnh sửa trực tiếp tại đây
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

export function Services() {
  return (
    <Box component="section" sx={{ py: 8, bgcolor: "#f8fbff" }}>
      <Container maxWidth="lg">
        {/* Tiêu đề trang */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{
              mb: 2,
              fontWeight: 800,
              color: "#01579B",
              fontSize: { xs: "2.5rem", md: "3.5rem" },
            }}
          >
            Dịch Vụ Của Chúng Tôi
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", fontWeight: 400 }}
          >
            Chuyên nghiệp - Uy tín - Chất lượng cao cho từng đôi giày
          </Typography>
        </Box>

        {/* Sử dụng Grid v1 (Legacy) */}
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

                  {/* Tính năng (Features) */}
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

        {/* Lưu ý thêm */}
        <Box
          sx={{
            mt: 8,
            p: 3,
            bgcolor: "#fff",
            borderRadius: 2,
            textAlign: "center",
            border: "1px dashed #ccc",
          }}
        >
          <Typography variant="body2" color="text.secondary">
            * Lưu ý: Giá trên áp dụng cho các loại giày phổ thông. Với các dòng
            giày Luxury hoặc chất liệu đặc biệt, phí dịch vụ có thể thay đổi
            nhẹ.
          </Typography>
        </Box>
      </Container>
    </Box>
  );
}
