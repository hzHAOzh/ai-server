import { Injectable } from '@nestjs/common';

export interface User {
  id: number;
  name: string;
  email: string;
}

@Injectable()
export class UserService {
  private users: User[] = [
    {
      id: 1,
      name: 'Wardell Zhang',
      email: 'wardell.zhang@example.com',
    },
    {
      id: 2,
      name: 'Steven Doe',
      email: 'steven.doe@example.com',
    },
    {
      id: 3,
      name: 'Jane Doe',
      email: 'jane.doe@example.com',
    },
  ];

  findAll(): User[] {
    return this.users;
  }

  findOne(id: number): User | undefined {
    return this.users.find((user) => user.id === id);
  }

  create(user: Omit<User, 'id'>): User {
    const newUser: User = {
      id: this.users.length + 1,
      ...user,
    };
    this.users.push(newUser);
    return newUser;
  }
}
