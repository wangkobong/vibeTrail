import express, { Request, Response } from 'express';
import cors from 'cors';
import { HealthCheckResponse } from '@vibe-trail/shared';

const app = express();
const port = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.get('/health', (req: Request, res: Response) => {
  const response: HealthCheckResponse = { status: 'ok', message: 'Vibe Trail Server is running!' };
  res.status(200).json(response);
});

app.listen(port, () => {
  console.log(`Server is listening on port ${port}`);
});
