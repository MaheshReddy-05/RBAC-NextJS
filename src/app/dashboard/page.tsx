import { getUser } from '@/lib/auth'
import { redirect } from 'next/navigation'
import CategoryList from './CategoryList'
import { Typography, Box } from '@mui/material'

 const DashboardPage =  async () => {
  const user = await getUser()

  if (!user) {
    redirect('/login')
  }

  return (
    <Box sx={{ maxWidth: 1200, margin: 'auto' }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Dashboard
      </Typography>
      <CategoryList user={user} />
    </Box>
  )
}
export default DashboardPage;

