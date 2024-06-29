export interface EditPassword {
  password: string;
  newPassword: string;
  newPasswordConfimation: string;
}

export interface EditProfile {
  profileImageUrl?: string;
  nickname?: string;
}
