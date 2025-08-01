export interface IValidatedSession {
  id: string
  createdAt: Date
}

export interface ISession {
  id: string
  secretHash: Uint8Array
  createdAt: Date
  lastVerifiedAt: Date
}

export interface ISessionWithToken extends ISession {
  token: string
}
