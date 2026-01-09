import { Box, CircularProgress, Typography } from "@mui/material";
import { motion } from "framer-motion";

export function AdminLoadingScreen() {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        minHeight: "100vh",
        bgcolor: "#F5F7FA",
      }}
    >
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{
          duration: 0.5,
          repeat: Infinity,
          repeatType: "reverse",
        }}
      >
        <Box
          sx={{
            width: 80,
            height: 80,
            bgcolor: "#01579B",
            borderRadius: 2,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            mb: 3,
            boxShadow: "0 8px 24px rgba(1, 87, 155, 0.3)",
          }}
        >
          <Typography
            variant="h3"
            sx={{
              color: "white",
              fontWeight: 800,
            }}
          >
            GC
          </Typography>
        </Box>
      </motion.div>

      <CircularProgress
        size={40}
        thickness={4}
        sx={{
          color: "#01579B",
          mb: 2,
        }}
      />

      <Typography
        variant="body1"
        sx={{
          color: "text.secondary",
          fontWeight: 500,
        }}
      >
        Đang tải...
      </Typography>
    </Box>
  );
}
