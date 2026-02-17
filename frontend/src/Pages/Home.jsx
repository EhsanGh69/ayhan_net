import { useMemo } from 'react';
import { Typography, Grid, Card, CardContent } from '@mui/material';

import MainPage from './MainPage';

export default function Home() {
  const statsData = useMemo(() => ([
    { title: 'تعداد محصولات', value: '۰', color: '#1976d2' },
    { title: 'دسته‌بندی‌ها', value: '۱۲', color: '#2e7d32' },
    { title: 'کاربران فعال', value: '۵۶', color: '#ed6c02' },
    { title: 'سفارشات امروز', value: '۱۸', color: '#9c27b0' },
  ]));

  return (
    <MainPage>
      <Grid container spacing={3} mb={4}>
        {statsData.map((stat, idx) => (
          <Grid size={{ xs: 12, sm: 6, md: 3 }} key={idx}>
            <Card elevation={2}>
              <CardContent>
                <Typography color='textSecondary' gutterBottom>
                  {stat.title}
                </Typography>
                <Typography variant="h4" component="div" sx={{ color: stat.color }}>
                  {stat.value}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </MainPage>
  )
}
