import React, { useEffect, useMemo, useState } from "react";
import {
  Container,
  Typography,
  Grid,
  Box,
  TextField,
  Button,
  Paper,
  Stack,
  Snackbar,
  Alert,
  CircularProgress,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import PhoneIcon from "@mui/icons-material/Phone";
import EmailIcon from "@mui/icons-material/Email";
import AccessTimeIcon from "@mui/icons-material/AccessTime";
import SendIcon from "@mui/icons-material/Send";

// Component con để hiển thị thông tin cửa hàng cho gọn code
const StoreInfo = ({ title, address, phone, email, time }: any) => (
  <Paper elevation={2} sx={{ p: 3, height: "100%", borderRadius: 3 }}>
    <Typography variant="h6" sx={{ mb: 2, fontWeight: 700, color: "#0288D1" }}>
      {title}
    </Typography>
    <Stack spacing={2}>
      <Box sx={{ display: "flex", alignItems: "flex-start" }}>
        <LocationOnIcon sx={{ mr: 2, color: "#0288D1", fontSize: 22 }} />
        <Typography variant="body2">{address}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <PhoneIcon sx={{ mr: 2, color: "#0288D1", fontSize: 22 }} />
        <Typography variant="body2">{phone}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <EmailIcon sx={{ mr: 2, color: "#0288D1", fontSize: 22 }} />
        <Typography variant="body2">{email}</Typography>
      </Box>
      <Box sx={{ display: "flex", alignItems: "center" }}>
        <AccessTimeIcon sx={{ mr: 2, color: "#0288D1", fontSize: 22 }} />
        <Typography variant="body2">{time}</Typography>
      </Box>
    </Stack>
  </Paper>
);

type ContactStore = {
  id: string | number;
  name: string;
  address: string;
  phone: string;
  email: string;
  hours: string;
  googleMapsUrl?: string;
};

export function Contact() {
  const [open, setOpen] = useState(false);

  // Dữ liệu stores từ backend
  const [stores, setStores] = useState<ContactStore[]>([]);
  const [loadingStores, setLoadingStores] = useState(true);
  const [storesError, setStoresError] = useState("");

  /**
   * ✅ API_BASE:
   * - Nếu có REACT_APP_API_BASE thì dùng (trỏ tới domain API riêng)
   * - Nếu không có thì mặc định gọi Vercel FE domain (đúng ý bạn)
   */
  const apiBase = useMemo(() => {
    const envBase = (process.env.REACT_APP_API_BASE || "").trim();
    const base = envBase || "https://giaycung-api.vercel.app";
    return base.replace(/\/$/, "");
  }, []);

  const contactUrl = useMemo(() => {
    return `${apiBase}/api/contact`;
  }, [apiBase]);

  useEffect(() => {
    let cancelled = false;

    const loadStores = async () => {
      setLoadingStores(true);
      setStoresError("");

      try {
        const res = await fetch(contactUrl, {
          method: "GET",
          headers: { "Content-Type": "application/json" },
        });

        if (!res.ok) {
          throw new Error(`HTTP ${res.status} khi gọi ${contactUrl}`);
        }

        const json = await res.json();
        if (!json?.ok) {
          throw new Error(json?.message || json?.data || "API trả về ok=false");
        }

        const data = Array.isArray(json.data) ? json.data : [];
        const normalized: ContactStore[] = data.map((x: any) => ({
          id: x.id ?? "",
          name: String(x.name ?? "").trim(),
          address: String(x.address ?? "").trim(),
          phone: String(x.phone ?? "").trim(),
          email: String(x.email ?? "").trim(),
          hours: String(x.hours ?? "").trim(),
          googleMapsUrl: String(x.googleMapsUrl ?? "").trim() || undefined,
        }));

        if (!cancelled) setStores(normalized);
      } catch (err: any) {
        if (!cancelled) {
          setStoresError(err?.message || "Không thể tải dữ liệu contact");
        }
      } finally {
        if (!cancelled) setLoadingStores(false);
      }
    };

    loadStores();
    return () => {
      cancelled = true;
    };
  }, [contactUrl]);

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    // Giả lập gửi form thành công
    setOpen(true);
  };

  return (
    <Box component="section" sx={{ py: { xs: 6, md: 10 }, bgcolor: "#fafafa" }}>
      <Container maxWidth="lg">
        {/* Header */}
        <Box sx={{ textAlign: "center", mb: 8 }}>
          <Typography
            variant="h3"
            sx={{ mb: 2, fontWeight: 800, color: "#01579B" }}
          >
            Liên Hệ Với Chúng Tôi
          </Typography>
          <Typography
            variant="h6"
            sx={{ color: "text.secondary", maxWidth: 600, mx: "auto" }}
          >
            Giày Cưng luôn sẵn sàng hỗ trợ bạn. Hãy để lại lời nhắn, chúng tôi
            sẽ phản hồi trong vòng 3h.
          </Typography>
        </Box>

        <Grid container spacing={5}>
          {/* Cột 1: Form liên hệ */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Paper elevation={4} sx={{ p: { xs: 3, md: 5 }, borderRadius: 4 }}>
              <Typography
                variant="h5"
                sx={{ mb: 4, fontWeight: 700, color: "#333" }}
              >
                Gửi tin nhắn cho chúng tôi
              </Typography>

              <Box
                component="form"
                onSubmit={handleSubmit}
                sx={{ display: "flex", flexDirection: "column", gap: 3 }}
              >
                <TextField
                  label="Họ và tên"
                  fullWidth
                  required
                  variant="outlined"
                />
                <Grid container spacing={2}>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Số điện thoại" fullWidth required />
                  </Grid>
                  <Grid size={{ xs: 12, md: 6 }}>
                    <TextField label="Email" type="email" fullWidth required />
                  </Grid>
                </Grid>
                <TextField
                  label="Nội dung tin nhắn"
                  multiline
                  rows={4}
                  fullWidth
                  required
                  placeholder="Bạn cần chúng tôi hỗ trợ gì về đôi giày của mình?"
                />
                <Button
                  type="submit"
                  variant="contained"
                  size="large"
                  endIcon={<SendIcon />}
                  sx={{
                    bgcolor: "#0288D1",
                    "&:hover": { bgcolor: "#01579B" },
                    py: 1.8,
                    fontWeight: 700,
                    borderRadius: 2,
                    boxShadow: "0 4px 12px rgba(2, 136, 209, 0.3)",
                  }}
                >
                  Gửi Tin Nhắn Ngay
                </Button>
              </Box>
            </Paper>
          </Grid>

          {/* Cột 2: Thông tin chi nhánh */}
          <Grid size={{ xs: 12, md: 6 }}>
            <Stack spacing={3}>
              {loadingStores && (
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                  <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <CircularProgress size={22} />
                    <Typography variant="body2" color="text.secondary">
                      Đang tải thông tin chi nhánh...
                    </Typography>
                  </Box>
                </Paper>
              )}

              {!loadingStores && storesError && (
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                  <Alert severity="error">
                    {storesError}
                    <Box sx={{ mt: 1, fontSize: 12, opacity: 0.8 }}>
                      URL đang gọi: <b>{contactUrl}</b>
                    </Box>
                  </Alert>
                </Paper>
              )}

              {!loadingStores && !storesError && stores.length === 0 && (
                <Paper elevation={2} sx={{ p: 3, borderRadius: 3 }}>
                  <Alert severity="info">
                    Sheet contact đang trống (chưa có dữ liệu).
                  </Alert>
                </Paper>
              )}

              {!loadingStores &&
                !storesError &&
                stores.map((s) => (
                  <StoreInfo
                    key={String(s.id)}
                    title={s.name}
                    address={s.address}
                    phone={s.phone}
                    email={s.email}
                    time={s.hours}
                  />
                ))}

              {/* Promo Box */}
              <Box
                sx={{
                  p: 3,
                  bgcolor: "#E1F5FE",
                  borderRadius: 3,
                  border: "1px dashed #0288D1",
                  textAlign: "center",
                }}
              >
                <Typography
                  variant="subtitle1"
                  sx={{ fontWeight: 700, color: "#01579B", mb: 1 }}
                >
                  🚚 Dịch vụ giao nhận tận nơi tại TP.HCM
                </Typography>
                <Typography variant="body2" sx={{ color: "#0277BD" }}>
                  Miễn phí vận chuyển cho đơn hàng vệ sinh từ 3 đôi trở lên
                  trong bán kính 5km!
                </Typography>
              </Box>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      {/* Thông báo gửi thành công */}
      <Snackbar
        open={open}
        autoHideDuration={6000}
        onClose={() => setOpen(false)}
      >
        <Alert
          onClose={() => setOpen(false)}
          severity="success"
          sx={{ width: "100%" }}
        >
          Cảm ơn bạn! Tin nhắn đã được gửi thành công.
        </Alert>
      </Snackbar>
    </Box>
  );
}
