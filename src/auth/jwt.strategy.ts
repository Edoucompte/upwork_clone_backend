import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

export type UserPayload = { sub: number; email: string };
export type RequestWithUser = { user: UserPayload };

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
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: secret, // secret est maintenant garanti d'être une string
    });
  }

  validate({ sub, email }: UserPayload) {
    return { sub, email };
  }
}
