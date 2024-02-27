import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { Prisma, User } from '@prisma/client';
import { compare, hash } from 'bcrypt';
import { sign } from 'jsonwebtoken';
import { nanoid } from 'nanoid';
import { env } from 'process';
import { PrismaService } from './../../db/prisma/prisma.service';
import { UsersLogInDto, UsersSignUpDto } from './auth.dto';

const JWT_SECRET_KEY = env.JWT_SECRET_KEY as string;

@Injectable()
export class AuthService {
  constructor(private readonly prismaService: PrismaService) {}

  async signUp(usersSignUpDto: UsersSignUpDto) {
    const { email, password } = usersSignUpDto;
    const data: Prisma.UserCreateInput = {
      id: nanoid(),
      email,
      encryptedPassword: await hash(password, 12),
    };

    // 데이터 담았으면 create
    const user = await this.prismaService.user.create({
      data,
      select: { id: true, email: true },
    });

    const accessToken = this.generateAccessToken(user);

    return accessToken;
  }

  async logIn(usersLogInDto: UsersLogInDto) {
    const { email, password } = usersLogInDto;

    const user = await this.prismaService.user.findUnique({
      where: { email },
      select: { id: true, email: true, encryptedPassword: true },
    });
    if (!user) throw new NotFoundException('No user found');

    const isCorrectPassword = compare(password, user.encryptedPassword);
    if (!isCorrectPassword) throw new BadRequestException('Incorrect password');

    const accessToken = this.generateAccessToken(user);

    return accessToken;
  }

  generateAccessToken(user: Pick<User, 'id' | 'email'>) {
    const { id: subject, email } = user;
    const accessToken = sign({ email }, JWT_SECRET_KEY, {
      subject,
      expiresIn: '5d', // 나중에 바꿔야함 2h로
    });

    return accessToken;
  }
}
