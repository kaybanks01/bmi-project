import React, { useEffect, useState } from "react";
import { Box, Grid, Card, CardContent, Typography } from "@mui/material";
import PersonIcon from '@mui/icons-material/Person';
import LocalMallIcon from '@mui/icons-material/LocalMall';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import "./adminhome.css";
import { BASE_URL } from "../util/util";

function AdminHome() {
  const [users, setUsers] = useState(0);
  const [products, setProducts] = useState(0);
  const [orders, setOrders] = useState(15); 
  const [revenue, setRevenue] = useState(8200);

  useEffect(() => {

    fetch(`${BASE_URL}/users`,)
      .then(res => res.json())
      .then(data => setUsers(data.length))
      .catch(err => console.log("Error fetching users", err));

    
    fetch(`${BASE_URL}/products`)
      .then(res => res.json())
      .then(data => setProducts(data.length))
      .catch(err => console.log("Error fetching products", err));
  }, []);

  return (
    <Box className="admin-home">
      <Typography variant="h4" gutterBottom className="dashboard-title">
        Admin Dashboard
      </Typography>
      <Grid container spacing={3}>
        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent>
              <PersonIcon sx={{ fontSize: 40 }} />
              <Typography variant="h5" className="card-value">{users}</Typography>
              <Typography variant="body2" className="card-label">Total Users</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent>
              <LocalMallIcon sx={{ fontSize: 40 }} />
              <Typography variant="h5" className="card-value">{products}</Typography>
              <Typography variant="body2" className="card-label">Total Products</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent>
              <ShoppingCartIcon sx={{ fontSize: 40 }} />
              <Typography variant="h5" className="card-value">{orders}</Typography>
              <Typography variant="body2" className="card-label">Total Orders</Typography>
            </CardContent>
          </Card>
        </Grid>

        <Grid item xs={12} sm={6} md={3}>
          <Card className="card">
            <CardContent>
              <AttachMoneyIcon sx={{ fontSize: 40 }} />
              <Typography variant="h5" className="card-value">${revenue}</Typography>
              <Typography variant="body2" className="card-label">Total Revenue</Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
}

export default AdminHome;
