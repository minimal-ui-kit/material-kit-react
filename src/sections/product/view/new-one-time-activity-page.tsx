import { useForm } from 'react-hook-form';
import { Box, Button, Container, TextField, Typography, RadioGroup, Radio, FormControl, FormLabel, FormControlLabel, Card, CardContent, Snackbar, Alert, Slider } from "@mui/material";
import { useRouter } from "src/routes/hooks";
import { useState } from "react";

// ----------------------------------------------------------------------

export function NewOneTimeActivityPage() {
    const { register, handleSubmit } = useForm();
    const Router = useRouter();

    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState("");
    const [snackbarSeverity, setSnackbarSeverity] = useState<"success" | "error">("success");

    const onSubmit = (data: any) => {
        data.endDate = data.startDate;
        const date = new Date(data.startDate);
        data.frequencyDay = date.toLocaleString('en-US', { weekday: 'long' });
        data.isOneTime = true;
        console.log(data);
        fetch('http://localhost:3000/api/activities/add-new-scheduled-activity', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(data),
        })
            .then((response) => {
                if (!response.ok) {
                    setSnackbarMessage(data.message);
					setSnackbarSeverity("error");
					setOpenSnackbar(true);
                } else {
                    setSnackbarMessage(data.message);
					setSnackbarSeverity("success");
					setOpenSnackbar(true);
                    Router.push('/activities');
                }
            });

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
                                {...register('startDate', { required: 'Activity date is required' })}
                                InputLabelProps={{ shrink: true }}
                                sx={{ mb: 2 }}
                            />
                            {/* Activity Time */}
                            <TextField
                                fullWidth
                                label="Start Time of Activity (24hr format)"
                                {...register('frequencyTime', { required: 'Activity time is required' })}
                                sx={{ mb: 2 }}
                            />
                            {/* Activity Duration */}
                            <TextField
                                fullWidth
                                label="Activity Duration"
                                type="number"
                                {...register('duration', { required: 'Activity duration is required' })}
                                sx={{ mb: 2 }}
                            />

                            <Box sx={{ mt: 2, display: 'flex', justifyContent: 'center' }}>
                                <Button variant="contained" color="primary" type="submit" sx={{ px: 4 }}>
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
            <Snackbar
                open={openSnackbar}
                autoHideDuration={3000}
                onClose={() => setOpenSnackbar(false)}
                anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
            >
                <Alert severity={snackbarSeverity} onClose={() => setOpenSnackbar(false)}>
                    {snackbarMessage}
                </Alert>
            </Snackbar>
        </Container>
    );
}
