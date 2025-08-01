export interface ISession {
  id: string
  secretHash: Uint8Array
  createdAt: Date
  lastVerifiedAt: Date
}

export interface ISessionWithToken extends ISession {
  token: string
}
