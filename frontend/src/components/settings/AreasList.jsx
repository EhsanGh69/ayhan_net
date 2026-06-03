import { Box, Button, Chip, Paper, Stack, Typography } from "@mui/material"
import { Add } from "@mui/icons-material"


export default function AreasList({ cityAreas, selectedCity, setSelectedLocation, setTitle, setModalOpen }) {
    return (
        <Paper variant="outlined" sx={{ p: 2, bgcolor: '#f5f5f5' }}>
            <Box display="flex" justifyContent="space-between">
                <Typography variant="body1" color="text.secondary" gutterBottom>
                    مناطق :
                </Typography>
                <Button
                    variant='outlined'
                    sx={{ ml: 1 }}
                    color='success'
                    title='افزودن منطقه جدید'
                    onClick={() => {
                        setSelectedLocation(selectedCity)
                        setTitle('منطقه')
                        setModalOpen(true)
                    }}
                >
                    <Add fontSize='large' />
                </Button>
            </Box>
            {cityAreas?.length > 0
                ? (
                    <Stack width="100%" mt={1}
                        direction="row" spacing={1} flexWrap="wrap" useFlexGap>
                        {cityAreas.map((area) => (
                            <Chip key={area.id} label={area.name}
                                size="medium"
                                variant="filled"
                                color='default' />
                        ))}
                    </Stack>
                )
                : (
                    <Typography variant="subtitle1" color='error'>
                        منطقه ایی وجود ندارد
                    </Typography>
                )
            }
        </Paper>
    )
}