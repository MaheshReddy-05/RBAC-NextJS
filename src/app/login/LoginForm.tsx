'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { login, User } from '@/lib/auth'
import { Box, FormControl, InputLabel, Select, MenuItem, Button, SelectChangeEvent, Typography } from '@mui/material'

const MOCK_USERS: User[] = [
  { id: '1', name: 'Admin User', role: 'all', accessLevel: 'edit' },
  { id: '2', name: 'DevOps Viewer', role: 'devops', accessLevel: 'view' },
  { id: '3', name: 'DevOps Editor', role: 'devops', accessLevel: 'edit' },
  { id: '4', name: 'UI Viewer', role: 'ui', accessLevel: 'view' },
  { id: '5', name: 'UI Editor', role: 'ui', accessLevel: 'edit' },
];

export default function LoginForm() {
  const [selectedUser, setSelectedUser] = useState('')
  const [error, setError] = useState('')
  const router = useRouter()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (selectedUser) {
      try {
        await login(selectedUser)
        router.push('/dashboard')
        router.refresh()
      } catch (error) {
        console.error('Login failed:', error)
        setError('Login failed. Please try again.')
      }
    }
  }

  const handleChange = (event: SelectChangeEvent) => {
    setSelectedUser(event.target.value as string);
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ maxWidth: 400, margin: 'auto', mt: 4 }}>
      <FormControl fullWidth sx={{ mb: 2 }}>
        <InputLabel id="user-select-label">Select User</InputLabel>
        <Select
          labelId="user-select-label"
          id="user-select"
          value={selectedUser}
          label="Select User"
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>Select a user</em>
          </MenuItem>
          {MOCK_USERS.map(user => (
            <MenuItem key={user.id} value={user.id}>
              {user.name} ({user.role} - {user.accessLevel})
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      <Button type="submit" variant="contained" fullWidth disabled={!selectedUser}>
        Login
      </Button>
      {error && (
        <Typography color="error" sx={{ mt: 2 }}>
          {error}
        </Typography>
      )}
    </Box>
  )
}

