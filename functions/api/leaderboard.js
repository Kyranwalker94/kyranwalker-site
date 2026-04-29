export async function onRequest(context) {
  const { request, env } = context;
  const kv = env.WORDLE_LEADERBOARD;

  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Content-Type': 'application/json',
  };

  if (request.method === 'OPTIONS') {
    return new Response(null, { headers });
  }

  if (request.method === 'GET') {
    const data = (await kv.get('leaderboard', { type: 'json' })) ?? [];
    return new Response(JSON.stringify(data), { headers });
  }

  if (request.method === 'POST') {
    let body;
    try {
      body = await request.json();
    } catch {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Invalid JSON' }),
        { status: 400, headers }
      );
    }

    const { name, score } = body;
    if (!name || score === undefined) {
      return new Response(
        JSON.stringify({ status: 'error', message: 'Missing name or score' }),
        { status: 400, headers }
      );
    }

    let leaderboard = (await kv.get('leaderboard', { type: 'json' })) ?? [];
    leaderboard.push({
      name: String(name).slice(0, 3).toUpperCase(),
      score: parseInt(score, 10),
    });
    leaderboard.sort((a, b) => b.score - a.score);
    leaderboard = leaderboard.slice(0, 10);

    await kv.put('leaderboard', JSON.stringify(leaderboard));

    return new Response(
      JSON.stringify({ status: 'success', leaderboard }),
      { headers }
    );
  }

  return new Response('Method Not Allowed', { status: 405 });
}
