export interface User {
  id: string;
  name: string;
  email: string;
}

export interface HealthCheckResponse {
  status: string;
  message: string;
}
