import { useRouter } from 'src/routes/hooks';
import { Box, Card, CardContent, Typography } from '@mui/material';

// -------------------------------------------------------------------

export function ScheduledActivityItem({ activity }: { activity:  any}) {
    const router = useRouter();

    const totalSlots = parseInt(activity.totalSlots, 10); // handle string to number conversion
    const signUps = parseInt(activity.signUps, 10);
    const vacancies = totalSlots - signUps;


    // const renderImg = (
    //     <Box
    //         component="img"
    //         alt={activity.name}
    //         src={activity.coverUrl}
    //         sx={{
    //             top: 0,
    //             width: 1,
    //             height: 1,
    //             objectFit: 'cover',
    //             position: 'absolute',
    //         }}
    //     />
    // );

    const renderName = (
        <Typography variant="subtitle1" noWrap>
            {activity.name}
        </Typography>
    );

    const renderLocation = (
        <Typography variant="body2" noWrap color="text.secondary">
            {activity.location}
        </Typography>
    );

    const renderDate = (
        <Typography variant="body2" noWrap color="text.secondary">
            {new Date(activity.startDate).toLocaleDateString(undefined, {
            weekday: 'short',
            year: 'numeric',
            month: 'short',
            day: 'numeric',
        })}
        </Typography>
    );

    const renderCreditCost = (
        <Typography variant="body2" noWrap color="text.secondary">
            {activity.creditCost} credits
        </Typography>
    );

    const renderVacancies = (
        <Typography variant="body2" noWrap color="text.secondary">
            {vacancies} vacancies left
        </Typography>
    );

    return (
        <Card
            onClick={() => router.push(`/product/${activity._id}`)}
            sx={{ cursor: 'pointer', position: 'relative' }}
        >
            {/* {renderImg} */}
            <CardContent sx={{ pt: 2, pb: 3 }}>
                {renderName}
                {renderLocation}
                {renderDate}
                {renderCreditCost}
                {renderVacancies}
            </CardContent>
        </Card>
    );
}