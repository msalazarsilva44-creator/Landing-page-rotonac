export default async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { nombre, email, interes, mensaje } = req.body;

  try {
    const response = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: 'Rotonac Web <onboarding@resend.dev>', // Cambiar a tu dominio verificado en Resend más tarde
        to: ['viplas.ca@gmail.com', 'Rotonac@gmail.com'],
        subject: `Nuevo mensaje de contacto: ${nombre}`,
        html: `
          <h1>Nuevo Mensaje desde la Web</h1>
          <p><strong>Nombre:</strong> ${nombre}</p>
          <p><strong>Email:</strong> ${email}</p>
          <p><strong>Interés:</strong> ${interes}</p>
          <p><strong>Mensaje:</strong></p>
          <p>${mensaje}</p>
        `,
      }),
    });

    const data = await response.json();

    if (response.ok) {
      return res.status(200).json({ success: true, data });
    } else {
      return res.status(400).json({ success: false, error: data });
    }
  } catch (error) {
    return res.status(500).json({ success: false, error: error.message });
  }
}
