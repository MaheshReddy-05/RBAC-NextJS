import LoginForm from './LoginForm'
import { Box, Typography } from '@mui/material'

export default function LoginPage() {
  return (
    <Box sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        Login
      </Typography>
      <LoginForm />
    </Box>
  )
}

