import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, Card, CardContent, Select, InputLabel, MenuItem, Slider } from "@mui/material";

// ----------------------------------------------------------------------

export function NewOneTimeActivityPage() {
    const { register, handleSubmit } = useForm();

    const onSubmit = (data: any) => {
        console.log(data);
    };
    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4, p: 3, boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Add New One Time Activity
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Fill in the details below to create a new one time activity.
                    </Typography>
                    <FormControl>
                    <form onSubmit={handleSubmit(onSubmit)}>

                        {/* Activity Name */}
                        <TextField
                            fullWidth
                            label="Activity Name"
                            {...register('name', { required: 'Activity name is required' })}
                           
                            sx={{ mb: 2 }}
                        />
                        {/* Activity Location */}
                        <TextField
                            fullWidth
                            label="Activity Location"
                            {...register('location', { required: 'Activity location is required' })}
                          
                            sx={{ mb: 2 }}
                        />
                        {/* Activity Description */}
                        <TextField
                            fullWidth
                            label="Activity Description"
                            multiline
                            rows={3}
                            {...register('description', { required: 'Activity description is required' })}
                            sx={{ mb: 2 }}
                        />
                        {/* Total Slots */}
                        <TextField
                            fullWidth
                            label="Total Slots"
                            type="number"
                            {...register('totalSlots', { required: 'Total slots are required' })}
                            sx={{ mb: 2 }}
                        />
                        {/* Credit Cost - edit to make it a form? not sure if react recognises this as input */}
                        <Typography id="credit-cost-slider" gutterBottom>
                            Credit Cost
                        </Typography>
                        <Slider
                            aria-label="credit-cost-label"
                            defaultValue={5}
                            getAriaValueText={(value) => `${value}`}
                            valueLabelDisplay="auto"
                            shiftStep={1}
                            step={1}
                            marks
                            min={1}
                            max={15}
                        />
                        {/* Activity Date */}
                        <TextField
                            fullWidth
                            label="Activity Date"
                            type="date"
                            {...register('date', { required: 'Activity date is required' })}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                        />
                        {/* Activity Duration */}
                        <TextField
                            fullWidth
                            label="Activity Duration (in hours)"
                            type="number"
                            {...register('duration', { required: 'Activity duration is required' })}
                            sx={{ mb: 2 }}
                        />
                        
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" onClick={handleSubmit(onSubmit)} sx={{ px: 4 }}>
                                Add Activity
                            </Button>
                        </Box>
                        
                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                {`Activity Created: ${new Date().toLocaleString()}`}
                            </Typography>
                        </Box>
                    </form>
                    </FormControl>
                </CardContent>
            </Card>
        </Container>
    );
}
