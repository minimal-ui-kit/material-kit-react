export interface UserProfile {
    id: string;
    name: string;
    email: string;
}

export interface UpdateUserProfileRequest {
    name?: string;
    email?: string;
}

export interface UpdateUserProfileResponse {
    success: boolean;
    message: string;
}