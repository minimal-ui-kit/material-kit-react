import PropTypes from 'prop-types';
import { Link as RouterLink } from 'react-router-dom';
import { Icon } from '@iconify/react';
import starOutline from '@iconify/icons-eva/star-outline';
// material
import { Box, Card, Link, Typography, Stack } from '@mui/material';
import { styled, alpha } from '@mui/material/styles';
// utils
import { /*fCurrency,*/ fNumber } from '../../../utils/formatNumber';
//
import Label from '../../Label';
// import ColorPreview from '../../ColorPreview';
import * as React from 'react';
import Button from '@mui/material/Button';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import EditIcon from '@mui/icons-material/Edit';
import Divider from '@mui/material/Divider';
import ArchiveIcon from '@mui/icons-material/Archive';
// import FileCopyIcon from '@mui/icons-material/FileCopy';
import DeleteIcon from '@mui/icons-material/Delete';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';

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

const StyledMenu = styled((props) => (
	<Menu
		elevation={0}
		anchorOrigin={{
			vertical: 'bottom',
			horizontal: 'right',
		}}
		transformOrigin={{
			vertical: 'top',
			horizontal: 'right',
		}}
		{...props}
	/>
))(({ theme }) => ({
	'& .MuiPaper-root': {
		borderRadius: 6,
		marginTop: theme.spacing(1),
		minWidth: 180,
		color: theme.palette.mode === 'light' ? 'rgb(55, 65, 81)' : theme.palette.grey[300],
		boxShadow:
			'rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px',
		'& .MuiMenu-list': {
			padding: '4px 0',
		},
		'& .MuiMenuItem-root': {
			'& .MuiSvgIcon-root': {
				fontSize: 18,
				color: theme.palette.text.secondary,
				marginRight: theme.spacing(1.5),
			},
			'&:active': {
				backgroundColor: alpha(
					theme.palette.primary.main,
					theme.palette.action.selectedOpacity
				),
			},
		},
	},
}));

// ----------------------------------------------------------------------

ShopProductCard.propTypes = {
	product: PropTypes.object,
};

export default function ShopProductCard({ product, index }) {
	const { name, cover, colors, status, genres, personalScore } = product;
	const [anchorEl, setAnchorEl] = React.useState(null);
	const open = Boolean(anchorEl);
	const handleClick = (event) => {
		setAnchorEl(event.currentTarget);
	};
	const handleClose = () => {
		setAnchorEl(null);
	};

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
					<div>
						<MenuIcon icon="carbon:overflow-menu-vertical" onClick={handleClick} />
						<StyledMenu
							id="demo-customized-menu"
							MenuListProps={{
								'aria-labelledby': 'demo-customized-button',
							}}
							anchorEl={anchorEl}
							open={open}
							onClose={handleClose}
						>
							<MenuItem onClick={handleClose} disableRipple>
								<EditIcon />
								Edit
							</MenuItem>
							<MenuItem onClick={handleClose} disableRipple>
								<DeleteIcon />
								Delete
							</MenuItem>
							<Divider sx={{ my: 0.5 }} />
							<MenuItem onClick={handleClose} disableRipple>
								<ArchiveIcon />
								Archive
							</MenuItem>
							<MenuItem onClick={handleClose} disableRipple>
								<MoreHorizIcon />
								More
							</MenuItem>
						</StyledMenu>
					</div>
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