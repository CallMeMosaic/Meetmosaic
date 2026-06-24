export default {
    async fetch(request: Request, env: Env): Promise<Response> {
        const url = new URL(request.url);

        if (url.pathname === '/api/contact' && request.method === 'POST') {
            const { name, email, projectType, message } = await request.json();

            const resendResponse = await fetch('https://api.resend.com/emails', {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${env.RESEND_API_KEY}`,
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    from: "Mosaic Contact <onboarding@resend.dev>",
                    to: ['contact@mail.rawmosaic.com'],
                    subject: `New portfolio message from ${name}`,
                    reply_to: email,
                    text: `Name: ${name}\nEmail: ${email}\nProject: ${projectType}\n\n${message}`,
                }),
            });

            if (!resendResponse.ok) {
                return new Response('Email failed', { status: 500 });
            }

            return new Response('OK', { status: 200 });
        }

        return env.ASSETS.fetch(request);
    },
};