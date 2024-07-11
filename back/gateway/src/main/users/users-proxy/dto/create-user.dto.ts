export class CreateUserRequest {
  email: string;
  password: string;
  username: string;
}

export class CreateUserResponse {
  _id: string;
  username: string;
  email: string;
}
