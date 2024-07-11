import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Payload } from 'src/interfaces/payload.interface';
import { Tokens } from 'src/interfaces/tokens.interface';
import { Jwt } from 'src/schemas/jwt.schema';

@Injectable()
export class AppService {
  constructor(
    private readonly jwtService: JwtService,

    @InjectModel(Jwt.name)
    private readonly jwtModel: Model<Jwt>,
  ) {}

  async generateRefreshToken(userId: string, email: string): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '24h', secret: 'secret' },
    );
  }

  async generateAccessToken(userId: string, email: string): Promise<string> {
    return await this.jwtService.signAsync(
      { sub: userId, email },
      { expiresIn: '12h', secret: 'secret' },
    );
  }

  async generateTokens(userId: string, email: string): Promise<Tokens | false> {
    console.log('generateTokens', userId, email);
    const accessToken = await this.generateAccessToken(userId, email);
    const refreshToken = await this.generateRefreshToken(userId, email);
    console.log('generateTokens', accessToken, refreshToken);

    const newJwt = await this.jwtModel
      .findOneAndUpdate(
        { userId },
        { $addToSet: { refreshTokens: refreshToken } },
        { upsert: true, new: true },
      )
      .exec();

    if (!newJwt) {
      return false;
    }

    return {
      accessToken,
      refreshToken,
    };
  }

  async verifyAccessToken(token: string): Promise<Payload | false> {
    try {
      return (await this.jwtService.verifyAsync(token, {
        secret: 'secret',
      })) as Payload;
    } catch {
      return false;
    }
  }

  async updateTokens(refreshToken: string): Promise<Tokens | false> {
    try {
      const payload = await this.jwtService.verifyAsync(refreshToken, {
        secret: 'secret',
      });

      const newTokens = await this.generateTokens(payload.sub, payload.email);

      if (!newTokens) {
        return false;
      }

      const jwtData = await this.jwtModel
        .findOne({ userId: payload.sub })
        .exec();

      if (!jwtData) {
        return false;
      }

      if (!jwtData.refreshTokens.includes(refreshToken)) {
        return false;
      }

      console.log('updateTokens', jwtData.refreshTokens, refreshToken);
      jwtData.refreshTokens = jwtData.refreshTokens.filter(
        (t) => t !== refreshToken,
      );
      jwtData.refreshTokens.push(newTokens.refreshToken);
      console.log('updateTokens', jwtData.refreshTokens, refreshToken);

      jwtData.save();

      return newTokens;
    } catch {
      return false;
    }
  }
}
