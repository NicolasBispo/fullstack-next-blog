export class AuthResponseDto {
  id: string;
  name: string;
  email: string;
  role: string;
  bio: string;
  image: string;
  createdAt: Date;
  updatedAt: Date;

  constructor(data: AuthResponseDto) {
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

