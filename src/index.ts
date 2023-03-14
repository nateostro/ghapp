import { PrismaClient } from '@prisma/client';
import express from 'express';

const prisma = new PrismaClient();

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.raw({ type: 'application/vnd.custom-type' }));
app.use(express.text({ type: 'text/html' }));

app.get('/ghdata', async (req, res) => {
  const todos = await prisma.testData.findMany({
    orderBy: { createdAt: 'desc' },
  });

  res.json(todos);
});

app.post('/testData', async (req, res) => {
  const testData = await prisma.testData.create({
    data: {
      createdAt: new Date(),
      data: req.body.text ?? 'Empty test data',
    },
  });

  return res.json(testData);
});

app.get('/testData/:id', async (req, res) => {
  const id = req.params.id;
  const testData = await prisma.testData.findUnique({
    where: { id },
  });

  return res.json(testData);
});

app.put('/testData/:id', async (req, res) => {
  const id = req.params.id;
  const todo = await prisma.testData.update({
    where: { id },
    data: req.body,
  });

  return res.json(todo);
});

app.delete('/todos/:id', async (req, res) => {
  const id = req.params.id;
  await prisma.testData.delete({
    where: { id },
  });

  return res.send({ status: 'ok' });
});

app.get('/', async (req, res) => {
  res.send(
    `
  <h1>What's up punk, welcome to the test github data REST API</h1>
  <h2>Available Routes:</h2>
  <pre>
    GET, POST /testData
    GET, PUT, DELETE /testData/:id
  </pre>
  `.trim()
  );
});

app.listen(Number(port), '0.0.0.0', () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
