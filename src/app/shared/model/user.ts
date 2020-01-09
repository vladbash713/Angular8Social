export interface Roles {
  traveler?: boolean;
  guide?: boolean;
  travelcompanyAdmin?: boolean;
  Blogger?: boolean;
  Moderator?: boolean;
  SiteAdmin?: boolean;
}

export interface User {
  uid: string;
  email: string;
  photoURL?: string;
  displayName?: string;
  // role: Roles;
  gender?: string;
  age?: string;
  country?: string;
  phoneNumber?: string;
  providerId?: string;
  emailVerified: boolean;
}
