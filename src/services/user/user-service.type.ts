export interface UpdateUserProfileRequest {
    firstName?: string;
    lastName?: string;
    email?: string;
}

export interface UpdateUserProfileResponse {
    success: boolean;
    message: string;
}

export interface UserProfileResponse {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
    avatarUrl?: string;
}

export interface UploadProfilePhotoResponse {
    success: boolean;
    message: string;
    url: string;
    filePath: string;
}
