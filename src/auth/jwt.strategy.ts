import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { Request } from 'express';

export type UserPayload = { sub: number; email: string };
export type RequestWithUser = { user: UserPayload };

// Function to extract token from cookie
const cookieExtractor = function (req: Request) {
  let token = null;
  if (req && req.cookies) {
    token = req.cookies['access_token'];
  }
  return token;
};

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    const secret = process.env.JWT_SECRET;

    if (!secret) {
      // Option B: Lancer une erreur si la variable d'environnement n'est pas définie
      // C'est la meilleure pratique en production pour éviter des comportements imprévus.
      throw new Error('JWT_SECRET environment variable is not defined.');
    }

    super({
      // cookies extractor
      jwtFromRequest: cookieExtractor, //ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // secret est maintenant garanti d'être une string
    });
  }

  validate({ sub, email }: UserPayload) {
    return { sub, email };
  }
}
