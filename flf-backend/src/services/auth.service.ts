import jwt from 'jsonwebtoken';
import { User } from '../models/User';
import { RefreshToken } from '../models/RefreshToken';
import { logger } from '../utils/logger';

interface TokenPayload {
  userId: string;
  email: string;
}

interface AuthTokens {
  accessToken: string;
  refreshToken: string;
}

export class AuthService {
  private static readonly ACCESS_TOKEN_EXPIRY = '15m';
  private static readonly REFRESH_TOKEN_EXPIRY = '7d';
  private static readonly REFRESH_TOKEN_EXPIRY_MS = 7 * 24 * 60 * 60 * 1000;

  static async register(email: string, password: string, firstName?: string, lastName?: string) {
    try {
      const existingUser = await User.findOne({ where: { email } });
      if (existingUser) {
        throw new Error('User already exists');
      }

      const user = await User.create({
        email,
        passwordHash: password, // The model hook will hash this automatically
        firstName,
        lastName,
      });

      const tokens = await this.generateTokens(user);
      return { user, tokens };
    } catch (error) {
      logger.error('Registration error:', error);
      throw error;
    }
  }

  static async login(email: string, password: string) {
    try {
      const user = await User.findOne({ where: { email } });
      if (!user) {
        throw new Error('Invalid credentials');
      }

      const isValid = await user.validatePassword(password);
      if (!isValid) {
        throw new Error('Invalid credentials');
      }

      const tokens = await this.generateTokens(user);
      return { user, tokens };
    } catch (error) {
      logger.error('Login error:', error);
      throw error;
    }
  }

  static async logout(refreshToken: string): Promise<void> {
    const storedToken = await RefreshToken.findOne({ where: { token: refreshToken } });
    if (storedToken) {
      await storedToken.destroy();
    }
  }

  private static async generateTokens(user: User): Promise<AuthTokens> {
    const payload: TokenPayload = {
      userId: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.ACCESS_TOKEN_SECRET!, {
      expiresIn: this.ACCESS_TOKEN_EXPIRY,
    });

    const refreshTokenValue = jwt.sign(payload, process.env.REFRESH_TOKEN_SECRET!, {
      expiresIn: this.REFRESH_TOKEN_EXPIRY,
    });

    // Invalidate old refresh tokens for this user
    await RefreshToken.destroy({ where: { userId: user.id } });

    // Store the new refresh token
    await RefreshToken.create({
      token: refreshTokenValue,
      userId: user.id,
      expiresAt: new Date(Date.now() + this.REFRESH_TOKEN_EXPIRY_MS),
    });

    return { accessToken, refreshToken: refreshTokenValue };
  }

  static verifyAccessToken(token: string): TokenPayload {
    return jwt.verify(token, process.env.ACCESS_TOKEN_SECRET!) as TokenPayload;
  }
}