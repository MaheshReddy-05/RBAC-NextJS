'use client'

import { useState } from 'react'
import { Card, CardContent, Typography, Button, TextField, Box } from '@mui/material'

interface Tool {
  id: string;
  name: string;
  description: string;
}

export default function ToolCard({ tool, canEdit }: { tool: Tool; canEdit: boolean }) {

  return (
    <Card>
      <CardContent>
       
          <>
            <Typography variant="h6" component="div">
              {tool.name}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {tool.description}
            </Typography>
            {canEdit && (
              <Button  variant="outlined" sx={{ mt: 2 }}>
                Edit
              </Button>
            )}
          </>
      </CardContent>
    </Card>
  )
}

