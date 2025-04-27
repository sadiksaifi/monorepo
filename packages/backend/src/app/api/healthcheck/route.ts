export async function GET() {
  return Response.json({
    message: "Server is up and running!",
    timestamp: new Date().toISOString(),
  });
}
