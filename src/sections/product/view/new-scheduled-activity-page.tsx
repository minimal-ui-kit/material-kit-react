import { Controller, useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, Card, CardContent, Select, InputLabel, MenuItem, Slider } from "@mui/material";
import { useRouter } from 'src/routes/hooks';
import { v4 as uuidv4 } from 'uuid';

// ----------------------------------------------------------------------

export function NewScheduledActivityPage() {
    const { register, handleSubmit, control } = useForm();
    const router = useRouter();

    const onSubmit = async (data: any) => {
        const token = localStorage.getItem("token");
    
        // Convert startDate and endDate to Date objects
        const startDate = new Date(data.startDate);
        const endDate = new Date(data.endDate);
        const frequencyDay = data.frequencyDay; // Example: "Monday"
        const timeParts = data.frequencyTime.split(":"); // Extract hours and minutes from input
        const hour = parseInt(timeParts[0], 10); // Convert to number
        const minute = parseInt(timeParts[1], 10); // Convert to number
    
        // Map day names to numeric values (Sunday = 0, Monday = 1, ..., Saturday = 6)
        const dayMapping: { [key: string]: number } = {
            "Sunday": 0, "Monday": 1, "Tuesday": 2, "Wednesday": 3,
            "Thursday": 4, "Friday": 5, "Saturday": 6
        };
    
        const targetDay = dayMapping[frequencyDay]; // Numeric value of chosen day
    
        const activities = [];

        const scheduleId = uuidv4(); // Generate a unique ID for the schedule
    
        // Generate recurring activities
        const currentDate = new Date(startDate);
        while (currentDate <= endDate) {
            if (currentDate.getDay() === targetDay) {
                // Clone current date and set time
                const activityDate = new Date(currentDate);
                activityDate.setHours(hour, minute, 0, 0);
    
                // Create new activity object
                activities.push({
                    ...data,
                    startDate: activityDate.toISOString(), // Set correct date for each occurrence
                    isOneTime: false,
                    dateCreated: new Date().toISOString(),
                    signUps: 0,
                    customers: [],
                    scheduleId, // Add scheduleId to each activity
                });
            }
            // Move to the next day
            currentDate.setDate(currentDate.getDate() + 1);
        }
    
        try {
            fetch('http://localhost:3000/api/activities/add-new-scheduled-activity', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify(activities),
            }).then((response) => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            });
            router.push('/activities');
        } catch (error) {
            console.error('Error creating scheduled activity:', error);
            alert('Error creating scheduled activity. Please try again.');
        } 
    };

    return (
        <Container maxWidth="sm">
            <Card sx={{ mt: 4, p: 3, boxShadow: 5, borderRadius: 2 }}>
                <CardContent>
                    <Typography variant="h4" fontWeight={600} gutterBottom>
                        Add New Scheduled Activity
                    </Typography>
                    <Typography variant="body2" color="textSecondary" sx={{ mb: 3 }}>
                        Fill in the details below to create a new scheduled activity.
                    </Typography>
                    
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
                        {/* Credit Cost */}
                        <Typography id="credit-cost-slider" gutterBottom>
                            Credit Cost
                        </Typography>
                        <Controller
                            name="creditCost"
                            control={control}
                            defaultValue={5}
                            render={({ field }) => (
                                <Slider
                                    {...field}
                                    aria-labelledby="credit-cost-slider"
                                    valueLabelDisplay="auto"
                                    step={1}
                                    marks
                                    min={1}
                                    max={15}
                                />
                            )}
                        />
                        {/* Start Date */}
                        <TextField
                            fullWidth
                            label="Start Date"
                            type="date"
                            {...register('startDate', { required: 'Start date is required' })}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                        />
                        {/* End Date */}
                        <TextField
                            fullWidth
                            label="End Date"
                            type="date"
                            {...register('endDate', { required: 'End date is required' })}
                            InputLabelProps={{ shrink: true }}
                            sx={{ mb: 2 }}
                        />
                        {/* Day Selection */}
                        <FormControl sx={{ mb: 2, minWidth: 480 }}>
                            <InputLabel id="day-label">Activity happens on every</InputLabel>
                            <Select
                                labelId="frequencyDay-label"
                                id="frequencyDay"
                                defaultValue=""
                                label="Day"
                                {...register('frequencyDay', { required: 'Activity day is required' })}
                            >
                                <MenuItem value="Monday">Monday</MenuItem>
                                <MenuItem value="Tuesday">Tuesday</MenuItem>
                                <MenuItem value="Wednesday">Wednesday</MenuItem>
                                <MenuItem value="Thursday">Thursday</MenuItem>
                                <MenuItem value="Friday">Friday</MenuItem>
                                <MenuItem value="Saturday">Saturday</MenuItem>
                                <MenuItem value="Sunday">Sunday</MenuItem>
                            </Select>
                        </FormControl>
                        {/* Activity Time */}
                        <TextField
                            fullWidth
                            label="Activity Start Time (HH:MM in 24-hour format)"
                            {...register('frequencyTime', { required: 'Activity time is required' })}
                            sx={{ mb: 2 }}
                        />
                        {/* Activity Duration */}
                        <TextField
                            fullWidth
                            label="Activity Duration (in hours)"
                            type="number"
                            inputProps={{ step: "0.1", min: "0.5" }}
                            {...register('duration', { required: 'Activity duration is required' })}
                            sx={{ mb: 2 }}
                        />
                        
                        <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                            <Button variant="contained" color="primary" type='submit' sx={{ px: 4 }}>
                                Add Activity
                            </Button>
                        </Box>

                        <Box sx={{ mt: 2 }}>
                            <Typography variant="body2" color="textSecondary">
                                {`Activity Created: ${new Date().toLocaleString()}`}
                            </Typography>
                        </Box>                        
                    </form>
                    
                </CardContent>
            </Card>
        </Container>
    );
 }
