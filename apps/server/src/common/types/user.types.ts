export interface UserResponse {
  id: string;
  publicId: string;

  username: string;
  email: string;

  firstName: string;
  lastName: string | null;

  avatarUrl: string | null;
  phone: string | null;

  roles: string[];

  emailVerifiedAt: Date | null;
}