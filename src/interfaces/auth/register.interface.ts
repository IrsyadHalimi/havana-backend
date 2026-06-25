export interface RegisterDTO {
  fullName: string;
  email: string;
  role: "customer" | "tenant";
}