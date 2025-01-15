import React, { useState } from 'react';

import { useTheme } from '@mui/material/styles';
import { Box, Badge, Avatar, IconButton } from '@mui/material';

import { userService } from 'src/services/user/user-service';

import { Iconify } from 'src/components/iconify';

interface ProfileAvatarProps {
  avatarUrl?: string;
  name: string;
}

export function ProfileAvatar({ avatarUrl, name }: ProfileAvatarProps) {
  const theme = useTheme();
  const [uploadedPhoto, setUploadedPhoto] = useState<string | null>(null);

  const handlePhotoUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      try {
        const response = await userService.uploadProfilePhoto(file);
        setUploadedPhoto("response.filePath");
      } catch (error) {
        console.error('Error uploading file:', error);
      }
    }
  };

  return (
    <Box sx={{ position: 'relative' }}>
      <Badge
        overlap="circular"
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        badgeContent={
          <>
            <input
              accept="image/*"
              style={{ display: 'none' }}
              id="icon-button-file"
              type="file"
              onChange={handlePhotoUpload}
            />
              {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="icon-button-file">
              <IconButton
                component="span"
                sx={{
                  width: 32,
                  height: 32,
                  bgcolor: 'background.paper',
                  boxShadow: theme.customShadows?.z8,
                  '&:hover': {
                    bgcolor: 'background.paper',
                    color: 'primary.main',
                  },
                }}
              >
                <Iconify icon="solar:camera-add-bold" width={16} />
              </IconButton>
            </label>
          </>
        }
      >
        <Avatar
          src={uploadedPhoto || avatarUrl}
          alt={name}
          sx={{
            width: 80,
            height: 80,
            border: '2px solid',
            borderColor: 'background.paper',
            boxShadow: theme.customShadows?.z8,
          }}
        />
      </Badge>
    </Box>
  );
}
