export interface LoginResponse {
  message: string;
  user: {
    id: number;
    username: string;
    site: {
      id: number;
      sitename: string;
      role?: "admin" | "editor";
    } | null;
  };
}
