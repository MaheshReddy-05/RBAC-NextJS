'use client'

import { AppBar, Toolbar, Typography, Button, Box } from '@mui/material';
import { useRouter } from 'next/navigation';
import { logout, getUser } from '@/lib/auth';
import { useEffect, useState } from 'react';
import { User } from '@/lib/auth';

 const Header = () => {
  const [user, setUser] = useState<User | null>(null);
  const router = useRouter();

  useEffect(() => {
    const fetchUser = async () => {
      const userData = await getUser();
      if(null === userData) {
        router.push('/login');
      }
      setUser(userData);
    };
    fetchUser();
  }, []);

  const handleLogout = async () => {
    await logout();
    setUser(null);
    router.push('/login');
    router.refresh();
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
           Role Based Access Control
        </Typography>
        <Box>
        <Button color="inherit" onClick={handleLogout}>
                Home
              </Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}

export default Header;

