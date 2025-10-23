export interface EmailVerificationToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface PasswordResetToken {
  id: string;
  userId: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}

export interface EmailChangeToken {
  id: string;
  userId: string;
  newEmail: string;
  tokenHash: string;
  expiresAt: Date;
  createdAt: Date;
}
