import { User } from '@/lib/auth'
import ToolCard from './ToolCard'
import { Box, Typography, Grid } from '@mui/material'

interface Category {
  id: string;
  name: string;
  tools: Tool[];
}

interface Tool {
  id: string;
  name: string;
  description: string;
  role: 'all' | 'devops' | 'ui';
}

const MOCK_CATEGORIES: Category[] = [
  {
    id: '1',
    name: 'Development Tools',
    tools: [
      { id: '1', name: 'VS Code', description: 'Popular code editor', role: 'all' },
      { id: '2', name: 'Docker', description: 'Containerization platform', role: 'devops' },
      { id: '3', name: 'Figma', description: 'Design tool', role: 'ui' },
    ],
  },
  {
    id: '2',
    name: 'Collaboration Tools',
    tools: [
      { id: '4', name: 'Slack', description: 'Team communication', role: 'all' },
      { id: '5', name: 'Jira', description: 'Project management', role: 'devops' },
      { id: '6', name: 'InVision', description: 'Design collaboration', role: 'ui' },
    ],
  },
];

export default function CategoryList({ user }: { user: User }) {
  const filteredCategories = MOCK_CATEGORIES.map(category => ({
    ...category,
    tools: category.tools.filter(tool => tool.role === 'all' || tool.role === user.role),
  }));

  return (
    <Box sx={{ mt: 4 }}>
      {filteredCategories.map(category => (
        <Box key={category.id} sx={{ mb: 4 }}>
          <Typography variant="h5" component="h2" gutterBottom>
            {category.name}
          </Typography>
          <Grid container spacing={2}>
            {category.tools.map(tool => (
              <Grid item xs={12} sm={6} md={4} key={tool.id}>
                <ToolCard tool={tool} canEdit={user.accessLevel === 'edit'} />
              </Grid>
            ))}
          </Grid>
        </Box>
      ))}
    </Box>
  )
}

