import React from "react";
import { Box, Container, Typography, Stack, Divider } from "@mui/material";
import Grid from "@mui/material/Grid"; // Sử dụng Grid v2 ổn định hơn
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import logo from "../../assets/logo.png";

const STORES = [
  {
    name: "Cửa hàng 1",
    address: "301 Nguyễn Thị Thập, Quận 7, TP.HCM",
    phone: "0909 255 285",
    email: "giaycungvn@gmail.com",
  },
  {
    name: "Cửa hàng 2",
    address: "Park 6 Vinhomes Central Park, Bình Thạnh, TP.HCM",
    phone: "0909 255 285",
    email: "giaycungvn@gmail.com",
  },
];

const ContactItem = ({ icon: Icon, text }) => (
  <Stack direction="row" spacing={1} alignItems="flex-start" sx={{ mb: 1.5 }}>
    <Icon sx={{ fontSize: 20, mt: 0.3, color: "rgba(255,255,255,0.8)" }} />
    <Typography variant="body2">{text}</Typography>
  </Stack>
);

export function Footer() {
  return (
    <Box
      component="footer"
      sx={{ bgcolor: "#01579B", color: "white", pt: 8, pb: 4 }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          {/* Cột 1: Thương hiệu */}
          <Grid size={{ xs: 12, md: 4 }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                height: 100,
                width: 100,
              }}
            />
            <Typography variant="h6" sx={{ fontWeight: 700, mb: 1 }}>
              GIÀY CƯNG
            </Typography>
            <Typography variant="body2" sx={{ opacity: 0.8, lineHeight: 1.8 }}>
              Dịch vụ vệ sinh giày chuyên nghiệp. <br />
              Giặt nhanh, khử khuẩn tia UV.
            </Typography>
          </Grid>

          {/* Cột 2 & 3: Thông tin chi nhánh */}
          {STORES.map((store, index) => (
            <Grid size={{ xs: 12, sm: 6, md: 4 }} key={index}>
              <Typography
                variant="subtitle1"
                sx={{ mb: 3, fontWeight: 700, textTransform: "uppercase" }}
              >
                {store.name}
              </Typography>
              <ContactItem icon={LocationOnIcon} text={store.address} />
              <ContactItem icon={PhoneIcon} text={store.phone} />
              <ContactItem icon={EmailIcon} text={store.email} />
            </Grid>
          ))}
        </Grid>

        {/* Bản quyền */}
        <Divider sx={{ mt: 6, mb: 3, borderColor: "rgba(255,255,255,0.1)" }} />
        <Typography variant="body2" align="center" sx={{ opacity: 0.6 }}>
          © {new Date().getFullYear()} Giày Cưng - Chăm sóc giày cao cấp. All
          rights reserved.
        </Typography>
      </Container>
    </Box>
  );
}
