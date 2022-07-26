
// User schema
export default interface IUser {
    id: number;
    name: string;
    email: string;
    description: string;
    published?: boolean;
}