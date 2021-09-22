import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import starOutline from '@iconify/icons-eva/star-outline';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled } from '@mui/material/styles';
// utils
import { /*fCurrency,*/ fNumber } from '../../../utils/formatNumber';
//
import Label from '../../Label';
// import ColorPreview from '../../ColorPreview';

// ----------------------------------------------------------------------
const HistoryDiv = styled('div')({
	display: 'flex',
});

const MenuIcon = styled(Icon)({
	position: 'absolute',
	right: '5%',
});

const ProductImgStyle = styled('img')({
	top: 0,
	width: '100%',
	height: '100%',
	objectFit: 'cover',
	position: 'absolute',
});

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
	product: PropTypes.object,
};

export default function ShopProductCard({ product, index }) {
	const { name, cover, colors, status, genres, personalScore } = product;

	return (
		<Card>
			<Box sx={{ pt: '100%', position: 'relative' }}>
				{status && (
					<Label
						variant="filled"
						color={(status === 'hot' && 'error') || 'info'}
						sx={{
							zIndex: 9,
							top: 16,
							right: 16,
							position: 'absolute',
							textTransform: 'uppercase',
						}}
					>
						{status}
					</Label>
				)}
				<ProductImgStyle alt={name} src={cover} />
			</Box>

			<Stack spacing={2} sx={{ p: 3 }}>
				<HistoryDiv>
					<Link to="#" color="inherit" underline="hover" component={RouterLink}>
						<Typography variant="subtitle2" noWrap>
							{name}
						</Typography>
					</Link>
					<MenuIcon icon="carbon:overflow-menu-vertical" />
				</HistoryDiv>
				<Stack direction="row" alignItems="center" justifyContent="space-between">
					<Typography
						gutterBottom
						variant="caption"
						sx={{ color: 'text.disabled', display: 'block' }}
					>
						{genres[Math.floor(Math.random() * genres.length)]}
					</Typography>
					<Box
						key={index}
						sx={{
							display: 'flex',
							alignItems: 'center',
							ml: index === 0 ? 0 : 1.5,
						}}
					>
						<Box
							component={Icon}
							icon={starOutline}
							sx={{ width: 16, height: 16, mr: 0.5 }}
						/>
						<Typography variant="caption">{fNumber(personalScore)}</Typography>
					</Box>
				</Stack>
			</Stack>
		</Card>
	);
}