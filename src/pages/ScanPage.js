import { Helmet } from 'react-helmet-async';
import { filter } from 'lodash';
import { sentenceCase } from 'change-case';
import { useState } from 'react';
import RecitExtractor from '../components/recit-extractor/RecitExtractor';
// @mui
// import {
//   Card,
//   Table,
//   Stack,
//   Paper,
//   Avatar,
//   Button,
//   Popover,
//   Checkbox,
//   TableRow,
//   MenuItem,
//   TableBody,
//   TableCell,
//   Container,
//   Typography,
//   IconButton,
//   TableContainer,
//   TablePagination,
// } from '@mui/material';
// components
import Label from '../components/label';
import Iconify from '../components/iconify';
import Scrollbar from '../components/scrollbar';
// sections
import { UserListHead, UserListToolbar } from '../sections/@dashboard/user';
// mock
import USERLIST from '../_mock/user';

// ----------------------------------------------------------------------

export default function ScanPage() {
 
  return (
    <RecitExtractor />
  );
}
