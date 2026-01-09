import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Box,
  Typography,
  Button,
  Card,
  CardContent,
  IconButton,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  Alert,
  CircularProgress,
  Chip,
  Select,
  MenuItem,
  FormControl,
  InputLabel,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Divider,
  Avatar,
  InputAdornment,
  ImageList,
  ImageListItem,
  ImageListItemBar,
  Stack
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import PersonIcon from '@mui/icons-material/Person';
import PhoneIcon from '@mui/icons-material/Phone';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import SearchIcon from '@mui/icons-material/Search';
import PhotoCameraIcon from '@mui/icons-material/PhotoCamera';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentIndIcon from '@mui/icons-material/AssignmentInd';
import UploadIcon from '@mui/icons-material/Upload';

interface Shoe {
  id: string;
  name: string;
  service: string;
  status: 'received' | 'processing' | 'completed';
  images: string[];
  notes?: string;
}

interface ServiceOrder {
  id: string;
  orderNumber: string;
  customerName: string;
  customerPhone: string;
  createdDate: string;
  totalAmount: number;
  status: 'pending' | 'processing' | 'completed' | 'cancelled';
  assignedTo?: string; // Người phụ trách
  shoes: Shoe[];
}

export function AdminServiceOrders() {
  const [orders, setOrders] = useState<ServiceOrder[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [expandedOrder, setExpandedOrder] = useState<string | false>(false);
  
  // Dialog states
  const [openOrderDialog, setOpenOrderDialog] = useState(false);
  const [openShoeDialog, setOpenShoeDialog] = useState(false);
  const [editingOrder, setEditingOrder] = useState<ServiceOrder | null>(null);
  const [currentOrderId, setCurrentOrderId] = useState<string>('');
  const [editingShoe, setEditingShoe] = useState<Shoe | null>(null);
  
  // Form data
  const [orderFormData, setOrderFormData] = useState({
    customerName: '',
    customerPhone: '',
    totalAmount: '',
    assignedTo: ''
  });

  const [shoeFormData, setShoeFormData] = useState({
    name: '',
    service: '',
    status: 'received' as 'received' | 'processing' | 'completed',
    images: [] as string[],
    notes: '',
    imageInput: ''
  });

  // Mock data - sẽ thay bằng API call sau
  useEffect(() => {
    const mockOrders: ServiceOrder[] = [
      {
        id: '1',
        orderNumber: 'ORD-001',
        customerName: 'Nguyễn Văn A',
        customerPhone: '0901234567',
        createdDate: '2025-01-08',
        totalAmount: 450000,
        status: 'completed',
        assignedTo: 'Nguyễn Văn B',
        shoes: [
          {
            id: 's1',
            name: 'Nike Air Max 90',
            service: 'Vệ sinh cao cấp',
            status: 'completed',
            images: ['https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400'],
            notes: 'Đã hoàn thành tốt'
          },
          {
            id: 's2',
            name: 'Adidas Superstar',
            service: 'Vệ sinh cơ bản',
            status: 'processing',
            images: ['https://images.unsplash.com/photo-1608231387042-66d1773070a5?w=400'],
            notes: 'Đang thực hiện'
          },
          {
            id: 's3',
            name: 'Converse Chuck Taylor',
            service: 'Phục hồi giày',
            status: 'received',
            images: ['https://images.unsplash.com/photo-1607522370275-f14206abe5d3?w=400'],
            notes: 'Chưa bắt đầu'
          }
        ]
      },
      {
        id: '2',
        orderNumber: 'ORD-002',
        customerName: 'Trần Thị B',
        customerPhone: '0912345678',
        createdDate: '2025-01-07',
        totalAmount: 300000,
        status: 'processing',
        assignedTo: 'Nguyễn Văn C',
        shoes: [
          {
            id: 's4',
            name: 'Vans Old Skool',
            service: 'Vệ sinh cao cấp',
            status: 'processing',
            images: ['https://images.unsplash.com/photo-1525966222134-fcfa99b8ae77?w=400'],
            notes: ''
          },
          {
            id: 's5',
            name: 'New Balance 574',
            service: 'Nhuộm màu',
            status: 'received',
            images: ['https://images.unsplash.com/photo-1606107557195-0e29a4b5b4aa?w=400'],
            notes: 'Khách yêu cầu nhuộm màu đen'
          }
        ]
      }
    ];
    setOrders(mockOrders);
  }, []);

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'received': return 'warning';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'completed': return 'Đã hoàn thành';
      case 'processing': return 'Đang thực hiện';
      case 'received': return 'Đã tiếp nhận';
      case 'pending': return 'Chờ xử lý';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  const getOrderStatusColor = (status: string): 'success' | 'info' | 'warning' | 'error' | 'default' => {
    switch (status) {
      case 'completed': return 'success';
      case 'processing': return 'info';
      case 'pending': return 'warning';
      case 'cancelled': return 'error';
      default: return 'default';
    }
  };

  const getOrderStatusText = (status: string): string => {
    switch (status) {
      case 'completed': return 'Hoàn thành';
      case 'processing': return 'Đang xử lý';
      case 'pending': return 'Chờ xử lý';
      case 'cancelled': return 'Đã hủy';
      default: return status;
    }
  };

  // Handle order accordion
  const handleAccordionChange = (orderId: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpandedOrder(isExpanded ? orderId : false);
  };

  // Open add order dialog
  const handleOpenAddOrder = () => {
    setEditingOrder(null);
    setOrderFormData({ customerName: '', customerPhone: '', totalAmount: '', assignedTo: '' });
    setOpenOrderDialog(true);
  };

  // Open add shoe dialog
  const handleOpenAddShoe = (orderId: string) => {
    setCurrentOrderId(orderId);
    setEditingShoe(null);
    setShoeFormData({
      name: '',
      service: '',
      status: 'received',
      images: [],
      notes: '',
      imageInput: ''
    });
    setOpenShoeDialog(true);
  };

  // Open edit shoe dialog
  const handleOpenEditShoe = (orderId: string, shoe: Shoe) => {
    setCurrentOrderId(orderId);
    setEditingShoe(shoe);
    setShoeFormData({
      name: shoe.name,
      service: shoe.service,
      status: shoe.status,
      images: shoe.images,
      notes: shoe.notes || '',
      imageInput: ''
    });
    setOpenShoeDialog(true);
  };

  // Update shoe status
  const handleUpdateShoeStatus = (orderId: string, shoeId: string, newStatus: 'received' | 'processing' | 'completed') => {
    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          shoes: order.shoes.map(shoe =>
            shoe.id === shoeId ? { ...shoe, status: newStatus } : shoe
          )
        };
      }
      return order;
    }));
    setSuccess('Cập nhật trạng thái thành công!');
  };

  // Add image to shoe form
  const handleAddImage = (event: React.ChangeEvent<HTMLInputElement>) => {
    const files = event.target.files;
    if (!files || files.length === 0) return;

    // Convert files to data URLs
    Array.from(files).forEach((file) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        setShoeFormData(prev => ({
          ...prev,
          images: [...prev.images, result]
        }));
      };
      reader.readAsDataURL(file);
    });

    // Reset input
    event.target.value = '';
  };

  // Remove image from shoe form
  const handleRemoveImage = (index: number) => {
    setShoeFormData({
      ...shoeFormData,
      images: shoeFormData.images.filter((_, i) => i !== index)
    });
  };

  // Save shoe
  const handleSaveShoe = () => {
    if (!shoeFormData.name || !shoeFormData.service) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newShoe: Shoe = {
      id: editingShoe?.id || `s${Date.now()}`,
      name: shoeFormData.name,
      service: shoeFormData.service,
      status: shoeFormData.status,
      images: shoeFormData.images,
      notes: shoeFormData.notes
    };

    setOrders(orders.map(order => {
      if (order.id === currentOrderId) {
        if (editingShoe) {
          // Update existing shoe
          return {
            ...order,
            shoes: order.shoes.map(shoe =>
              shoe.id === editingShoe.id ? newShoe : shoe
            )
          };
        } else {
          // Add new shoe
          return {
            ...order,
            shoes: [...order.shoes, newShoe]
          };
        }
      }
      return order;
    }));

    setSuccess(editingShoe ? 'Cập nhật đôi giày thành công!' : 'Thêm đôi giày thành công!');
    setOpenShoeDialog(false);
  };

  // Delete shoe
  const handleDeleteShoe = (orderId: string, shoeId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đôi giày này?')) return;

    setOrders(orders.map(order => {
      if (order.id === orderId) {
        return {
          ...order,
          shoes: order.shoes.filter(shoe => shoe.id !== shoeId)
        };
      }
      return order;
    }));
    setSuccess('Xóa đôi giày thành công!');
  };

  // Delete order
  const handleDeleteOrder = (orderId: string) => {
    if (!confirm('Bạn có chắc chắn muốn xóa đơn hàng này?')) return;
    setOrders(orders.filter(order => order.id !== orderId));
    setSuccess('Xóa đơn hàng thành công!');
  };

  // Save order
  const handleSaveOrder = () => {
    if (!orderFormData.customerName || !orderFormData.customerPhone || !orderFormData.totalAmount) {
      setError('Vui lòng điền đầy đủ thông tin');
      return;
    }

    const newOrder: ServiceOrder = {
      id: `ord${Date.now()}`,
      orderNumber: `ORD-${String(orders.length + 1).padStart(3, '0')}`,
      customerName: orderFormData.customerName,
      customerPhone: orderFormData.customerPhone,
      createdDate: new Date().toISOString().split('T')[0],
      totalAmount: parseInt(orderFormData.totalAmount),
      status: 'pending',
      assignedTo: orderFormData.assignedTo,
      shoes: []
    };

    setOrders([newOrder, ...orders]);
    setSuccess('Thêm đơn hàng mới thành công!');
    setOpenOrderDialog(false);
    setOrderFormData({ customerName: '', customerPhone: '', totalAmount: '', assignedTo: '' });
  };

  // Update order status
  const handleUpdateOrderStatus = (orderId: string, newStatus: 'pending' | 'processing' | 'completed' | 'cancelled') => {
    setOrders(orders.map(order =>
      order.id === orderId ? { ...order, status: newStatus } : order
    ));
    setSuccess('Cập nhật trạng thái đơn hàng thành công!');
  };

  // Filter orders
  const filteredOrders = orders.filter(order =>
    order.orderNumber.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerName.toLowerCase().includes(searchQuery.toLowerCase()) ||
    order.customerPhone.includes(searchQuery)
  );

  return (
    <Box>
      {/* Header */}
      <Box sx={{ mb: 4, display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
        <Box>
          <Typography variant="h4" sx={{ fontWeight: 700, color: '#01579B', mb: 1 }}>
            Quản Lý Đơn Dịch Vụ
          </Typography>
          <Typography variant="body2" sx={{ color: 'text.secondary' }}>
            Theo dõi trạng thái từng đôi giày trong mỗi đơn hàng
          </Typography>
        </Box>
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenAddOrder}
          sx={{
            bgcolor: '#0288D1',
            px: 3,
            py: 1.5,
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(2, 136, 209, 0.3)',
            '&:hover': {
              bgcolor: '#0277BD',
              boxShadow: '0 6px 16px rgba(2, 136, 209, 0.4)'
            }
          }}
        >
          Thêm Đơn Mới
        </Button>
      </Box>

      {/* Search Bar */}
      <Box sx={{ mb: 3 }}>
        <TextField
          fullWidth
          placeholder="Tìm kiếm theo mã đơn, tên khách hàng, số điện thoại..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon sx={{ color: 'text.secondary' }} />
              </InputAdornment>
            )
          }}
          sx={{
            maxWidth: 600,
            '& .MuiOutlinedInput-root': {
              borderRadius: 2,
              bgcolor: 'white'
            }
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
            <Alert severity="error" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setError('')}>
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
            <Alert severity="success" sx={{ mb: 2, borderRadius: 2 }} onClose={() => setSuccess('')}>
              {success}
            </Alert>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Orders List */}
      {loading ? (
        <Box sx={{ display: 'flex', justifyContent: 'center', py: 8 }}>
          <CircularProgress />
        </Box>
      ) : filteredOrders.length === 0 ? (
        <Card sx={{ p: 6, textAlign: 'center', borderRadius: 3, boxShadow: '0 2px 12px rgba(0,0,0,0.08)' }}>
          <Typography variant="h6" sx={{ color: 'text.secondary', mb: 2 }}>
            {searchQuery ? 'Không tìm thấy đơn hàng nào' : 'Chưa có đơn hàng nào'}
          </Typography>
          {!searchQuery && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={handleOpenAddOrder}
              sx={{ bgcolor: '#0288D1', mt: 2 }}
            >
              Thêm Đơn Đầu Tiên
            </Button>
          )}
        </Card>
      ) : (
        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
          {filteredOrders.map((order, index) => (
            <motion.div
              key={order.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3, delay: index * 0.05 }}
            >
              <Accordion
                expanded={expandedOrder === order.id}
                onChange={handleAccordionChange(order.id)}
                sx={{
                  borderRadius: 2,
                  boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
                  '&:before': { display: 'none' },
                  '&.Mui-expanded': {
                    boxShadow: '0 4px 20px rgba(0,0,0,0.12)'
                  }
                }}
              >
                <AccordionSummary
                  expandIcon={<ExpandMoreIcon />}
                  sx={{
                    bgcolor: '#FAFBFC',
                    borderRadius: expandedOrder === order.id ? '8px 8px 0 0' : 2,
                    px: 3,
                    py: 1.5,
                    '&:hover': { bgcolor: '#F5F5F5' }
                  }}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 3, flexWrap: 'wrap', width: '100%', pr: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                      <Avatar sx={{ bgcolor: '#0288D1', width: 40, height: 40 }}>
                        {order.orderNumber.split('-')[1]}
                      </Avatar>
                      <Box>
                        <Typography variant="body1" sx={{ fontWeight: 700, color: '#01579B' }}>
                          {order.orderNumber}
                        </Typography>
                        <Typography variant="caption" sx={{ color: 'text.secondary' }}>
                          {order.shoes.length} đôi giày
                        </Typography>
                      </Box>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PersonIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2">{order.customerName}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <PhoneIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2">{order.customerPhone}</Typography>
                    </Box>

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                      <CalendarTodayIcon sx={{ fontSize: 18, color: 'text.secondary' }} />
                      <Typography variant="body2">{order.createdDate}</Typography>
                    </Box>

                    {order.assignedTo && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
                        <AssignmentIndIcon sx={{ fontSize: 18, color: '#FF6F00' }} />
                        <Typography variant="body2" sx={{ fontWeight: 600, color: '#FF6F00' }}>
                          {order.assignedTo}
                        </Typography>
                      </Box>
                    )}

                    <Chip 
                      label={getOrderStatusText(order.status)} 
                      color={getOrderStatusColor(order.status)} 
                      size="small"
                      sx={{ fontWeight: 600 }}
                    />

                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5, ml: 'auto' }}>
                      <AttachMoneyIcon sx={{ fontSize: 18, color: '#FF6F00' }} />
                      <Typography variant="body1" sx={{ fontWeight: 700, color: '#FF6F00' }}>
                        {order.totalAmount.toLocaleString('vi-VN')}đ
                      </Typography>
                    </Box>
                  </Box>
                </AccordionSummary>

                <AccordionDetails sx={{ p: 3, bgcolor: 'white' }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 3 }}>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      Danh Sách Giày ({order.shoes.length})
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 1 }}>
                      <Button
                        size="small"
                        startIcon={<AddIcon />}
                        onClick={() => handleOpenAddShoe(order.id)}
                        sx={{ color: '#0288D1' }}
                      >
                        Thêm Giày
                      </Button>
                      <IconButton
                        size="small"
                        onClick={() => handleDeleteOrder(order.id)}
                        sx={{ color: '#D32F2F' }}
                      >
                        <DeleteIcon fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>

                  <Box sx={{ 
                    display: 'grid',
                    gridTemplateColumns: {
                      xs: '1fr',
                      md: 'repeat(2, 1fr)',
                      lg: 'repeat(3, 1fr)'
                    },
                    gap: 2
                  }}>
                    {order.shoes.map((shoe) => (
                      <Card
                        key={shoe.id}
                        sx={{
                          borderRadius: 2,
                          border: '1px solid #E0E0E0',
                          transition: 'all 0.3s ease',
                          '&:hover': {
                            boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
                            transform: 'translateY(-2px)'
                          }
                        }}
                      >
                        {/* Images */}
                        {shoe.images.length > 0 && (
                          <ImageList cols={shoe.images.length > 1 ? 2 : 1} gap={4} sx={{ m: 0 }}>
                            {shoe.images.map((image, imgIndex) => (
                              <ImageListItem key={imgIndex}>
                                <img
                                  src={image}
                                  alt={`${shoe.name} ${imgIndex + 1}`}
                                  loading="lazy"
                                  style={{ height: 120, objectFit: 'cover', borderRadius: '4px 4px 0 0' }}
                                />
                              </ImageListItem>
                            ))}
                          </ImageList>
                        )}

                        <CardContent sx={{ p: 2 }}>
                          <Typography variant="subtitle1" sx={{ fontWeight: 700, mb: 1 }}>
                            {shoe.name}
                          </Typography>
                          
                          <Typography variant="body2" sx={{ color: 'text.secondary', mb: 1.5 }}>
                            {shoe.service}
                          </Typography>

                          <FormControl fullWidth size="small" sx={{ mb: 1.5 }}>
                            <Select
                              value={shoe.status}
                              onChange={(e) => handleUpdateShoeStatus(order.id, shoe.id, e.target.value as any)}
                              sx={{
                                bgcolor: shoe.status === 'completed' ? 'rgba(76, 175, 80, 0.1)' :
                                         shoe.status === 'processing' ? 'rgba(33, 150, 243, 0.1)' :
                                         'rgba(255, 152, 0, 0.1)',
                                '& .MuiOutlinedInput-notchedOutline': { border: 'none' }
                              }}
                            >
                              <MenuItem value="received">
                                <Chip label="Đã tiếp nhận" color="warning" size="small" />
                              </MenuItem>
                              <MenuItem value="processing">
                                <Chip label="Đang thực hiện" color="info" size="small" />
                              </MenuItem>
                              <MenuItem value="completed">
                                <Chip label="Đã hoàn thành" color="success" size="small" />
                              </MenuItem>
                            </Select>
                          </FormControl>

                          {shoe.notes && (
                            <Typography variant="caption" sx={{ color: 'text.secondary', display: 'block', mb: 1.5 }}>
                              📝 {shoe.notes}
                            </Typography>
                          )}

                          <Divider sx={{ my: 1.5 }} />

                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              onClick={() => handleOpenEditShoe(order.id, shoe)}
                              sx={{
                                color: '#0288D1',
                                bgcolor: 'rgba(2, 136, 209, 0.1)',
                                '&:hover': { bgcolor: 'rgba(2, 136, 209, 0.2)' }
                              }}
                            >
                              <EditIcon fontSize="small" />
                            </IconButton>
                            <IconButton
                              size="small"
                              onClick={() => handleDeleteShoe(order.id, shoe.id)}
                              sx={{
                                color: '#D32F2F',
                                bgcolor: 'rgba(211, 47, 47, 0.1)',
                                '&:hover': { bgcolor: 'rgba(211, 47, 47, 0.2)' }
                              }}
                            >
                              <DeleteIcon fontSize="small" />
                            </IconButton>
                          </Box>
                        </CardContent>
                      </Card>
                    ))}
                  </Box>
                </AccordionDetails>
              </Accordion>
            </motion.div>
          ))}
        </Box>
      )}

      {/* Shoe Dialog */}
      <Dialog
        open={openShoeDialog}
        onClose={() => setOpenShoeDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            bgcolor: 'linear-gradient(135deg, #0288D1 0%, #01579B 100%)',
            background: 'linear-gradient(135deg, #0288D1 0%, #01579B 100%)',
            color: 'white',
            fontWeight: 700
          }}
        >
          {editingShoe ? '✏️ Sửa Thông Tin Giày' : '➕ Thêm Giày Mới'}
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <TextField
            fullWidth
            required
            label="Tên/Mô tả giày"
            placeholder="VD: Nike Air Max 90"
            value={shoeFormData.name}
            onChange={(e) => setShoeFormData({ ...shoeFormData, name: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            label="Dịch vụ"
            placeholder="VD: Vệ sinh cao cấp"
            value={shoeFormData.service}
            onChange={(e) => setShoeFormData({ ...shoeFormData, service: e.target.value })}
            sx={{ mb: 2 }}
          />

          <FormControl fullWidth sx={{ mb: 2 }}>
            <InputLabel>Trạng thái</InputLabel>
            <Select
              value={shoeFormData.status}
              label="Trạng thái"
              onChange={(e) => setShoeFormData({ ...shoeFormData, status: e.target.value as any })}
            >
              <MenuItem value="received">Đã tiếp nhận</MenuItem>
              <MenuItem value="processing">Đang thực hiện</MenuItem>
              <MenuItem value="completed">Đã hoàn thành</MenuItem>
            </Select>
          </FormControl>

          <TextField
            fullWidth
            multiline
            rows={2}
            label="Ghi chú"
            value={shoeFormData.notes}
            onChange={(e) => setShoeFormData({ ...shoeFormData, notes: e.target.value })}
            sx={{ mb: 2 }}
          />

          <Divider sx={{ my: 2 }}>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              Hình Ảnh
            </Typography>
          </Divider>

          <Button
            component="label"
            variant="outlined"
            startIcon={<UploadIcon />}
            fullWidth
            sx={{
              mb: 2,
              py: 1.5,
              borderColor: '#0288D1',
              color: '#0288D1',
              borderStyle: 'dashed',
              borderWidth: 2,
              '&:hover': {
                borderColor: '#0277BD',
                bgcolor: 'rgba(2, 136, 209, 0.05)'
              }
            }}
          >
            📸 Tải Hình Ảnh Lên (Chọn nhiều ảnh)
            <input
              type="file"
              hidden
              multiple
              accept="image/*"
              onChange={handleAddImage}
            />
          </Button>

          {shoeFormData.images.length > 0 && (
            <ImageList cols={3} gap={8}>
              {shoeFormData.images.map((image, index) => (
                <ImageListItem key={index}>
                  <img
                    src={image}
                    alt={`Preview ${index + 1}`}
                    loading="lazy"
                    style={{ height: 100, objectFit: 'cover', borderRadius: 4 }}
                  />
                  <ImageListItemBar
                    actionIcon={
                      <IconButton
                        sx={{ color: 'white' }}
                        onClick={() => handleRemoveImage(index)}
                      >
                        <CloseIcon fontSize="small" />
                      </IconButton>
                    }
                    sx={{ borderRadius: '0 0 4px 4px' }}
                  />
                </ImageListItem>
              ))}
            </ImageList>
          )}
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={() => setOpenShoeDialog(false)} sx={{ color: 'text.secondary' }}>
            Hủy
          </Button>
          <Button
            onClick={handleSaveShoe}
            variant="contained"
            sx={{ bgcolor: '#0288D1', px: 3, '&:hover': { bgcolor: '#0277BD' } }}
          >
            {editingShoe ? 'Cập Nhật' : 'Thêm'}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Order Dialog */}
      <Dialog
        open={openOrderDialog}
        onClose={() => setOpenOrderDialog(false)}
        maxWidth="sm"
        fullWidth
        PaperProps={{ sx: { borderRadius: 3 } }}
      >
        <DialogTitle
          sx={{
            bgcolor: 'linear-gradient(135deg, #0288D1 0%, #01579B 100%)',
            background: 'linear-gradient(135deg, #0288D1 0%, #01579B 100%)',
            color: 'white',
            fontWeight: 700
          }}
        >
          ➕ Tạo Đơn Hàng Mới
        </DialogTitle>
        <DialogContent sx={{ mt: 3 }}>
          <TextField
            fullWidth
            required
            label="Tên khách hàng"
            placeholder="VD: Nguyễn Văn A"
            value={orderFormData.customerName}
            onChange={(e) => setOrderFormData({ ...orderFormData, customerName: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            label="Số điện thoại"
            placeholder="VD: 0901234567"
            value={orderFormData.customerPhone}
            onChange={(e) => setOrderFormData({ ...orderFormData, customerPhone: e.target.value })}
            sx={{ mb: 2 }}
          />

          <TextField
            fullWidth
            required
            type="number"
            label="Tổng tiền (VNĐ)"
            placeholder="VD: 300000"
            value={orderFormData.totalAmount}
            onChange={(e) => setOrderFormData({ ...orderFormData, totalAmount: e.target.value })}
            helperText="Sau khi tạo đơn, bạn có th thêm giày vào đơn hàng"
          />

          <TextField
            fullWidth
            label="Người phụ trách"
            placeholder="VD: Nguyễn Văn B"
            value={orderFormData.assignedTo}
            onChange={(e) => setOrderFormData({ ...orderFormData, assignedTo: e.target.value })}
            sx={{ mb: 2 }}
          />
        </DialogContent>
        <DialogActions sx={{ p: 3, pt: 2 }}>
          <Button onClick={() => setOpenOrderDialog(false)} sx={{ color: 'text.secondary' }}>
            Hủy
          </Button>
          <Button
            onClick={handleSaveOrder}
            variant="contained"
            sx={{ bgcolor: '#0288D1', px: 3, '&:hover': { bgcolor: '#0277BD' } }}
            disabled={!orderFormData.customerName || !orderFormData.customerPhone || !orderFormData.totalAmount}
          >
            Tạo Đơn
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}