export type User = {
  // uid: string,
  username: string,
  email: string,
  password: string,
}
export type UserDoc = {
  uid: string,
  email: string,
  username: string,
  password: string,
  bio: string,
  prifileUrl: string,
  followers: [],
  following: [],
  posts: [],
  createdAt: number,
}
export type UserLogin = {

  email: string,
  password: string,
}