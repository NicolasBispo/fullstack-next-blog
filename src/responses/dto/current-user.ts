export class CurrentUserDto {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string | null;
  image: string | null;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: CurrentUserDto) {
    this.id = data.id;
    this.name = data.name;
    this.email = data.email;
    this.role = data.role;
    this.bio = data.bio;
    this.image = data.image;
    this.createdAt = data.createdAt;
    this.updatedAt = data.updatedAt;
  }
} 