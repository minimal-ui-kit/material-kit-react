import Avatar from '@mui/material/Avatar';
import ListItemText from '@mui/material/ListItemText';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import { styled } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import { useEffect, useState } from 'react';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  textAlign: 'center',
  color: theme.palette.text.secondary,
  flexGrow: 1,
}));

const TransactionList = ({ items }) => {
  // State to hold avatar URLs for each item
  const [avatarUrls, setAvatarUrls] = useState<string[]>([]);

  useEffect(() => {
    // Function to fetch avatar URL for each item
    const fetchAvatarUrls = async () => {
      try {
        const avatarUrlsCopy = [...avatarUrls];

        for (const item of items) {
          const response = await fetch(
            `http://localhost:3003/users/${item.seller_user_id}/listings/${item.listing_id}/images/${item.listing_image_id}`,
          );
          const data = await response.json();

          avatarUrlsCopy[item.id] = data['url_75x75' || 'url_170x135'];
        }

        setAvatarUrls(avatarUrlsCopy);
      } catch (error) {
        console.error('Error fetching avatar URLs:', error);
      }
    };

    fetchAvatarUrls();
  }, [items]);
  return (
    <Stack spacing={1} sx={{ p: 1 }} marginRight="auto">
      {items &&
        items.map((item) => (
          <Item key={item.transaction_id} elevation={3} sx={{ px: 1 }}>
            <Stack
              direction="row"
              alignItems="center"
              spacing={6}
              useFlexGap
              flexWrap="wrap"
              justifyContent="space-between"
            >
              <Avatar alt={item.title} src={avatarUrls[item.id] || ''} />
              <ListItemText align="left">
                <Stack>
                  <Typography variant="body1" noWrap sx={{ maxWidth: '700px' }}>
                    {item.title}
                  </Typography>
                  <Typography variant="body2">16H9UR0</Typography>
                </Stack>
              </ListItemText>
              <Typography>x{item.quantity}</Typography>
              <Typography>${item.price.amount / item.price.divisor}</Typography>
            </Stack>
          </Item>
        ))}
    </Stack>
  );
};

export default TransactionList;
