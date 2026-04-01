export async function POST(req: Request) {
  try {
    const { pin } = await req.json();
    const adminPin = process.env.ADMIN_PIN;

    if (!adminPin) {
      return Response.json({ error: "Admin PIN not configured" }, { status: 500 });
    }

    if (pin === adminPin) {
      return Response.json({ success: true });
    }

    return Response.json({ error: "Invalid PIN" }, { status: 401 });
  } catch {
    return Response.json({ error: "Invalid request" }, { status: 400 });
  }
}
