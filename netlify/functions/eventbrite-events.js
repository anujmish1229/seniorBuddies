const ORGANIZER_ID = '103874228141';

exports.handler = async (event, context) => {
  // Handle CORS
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'GET, OPTIONS',
    'Content-Type': 'application/json',
  };

  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers,
      body: '',
    };
  }

  const apiKey = process.env.EVENTBRITE_API_KEY;

  if (!apiKey) {
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ error: 'Eventbrite API key not configured' }),
    };
  }

  const isPast = event.queryStringParameters?.range === 'past';

  const params = isPast
    ? 'status=live,started,ended,completed&order_by=start_desc&time_filter=previous'
    : 'status=live&order_by=start_asc&time_filter=current_future';

  try {
    // Fetch events from Eventbrite API, either upcoming or past depending on ?range=
    const url = `https://www.eventbriteapi.com/v3/organizers/${ORGANIZER_ID}/events/?${params}`;

    const response = await fetch(url, {
      headers: {
        'Authorization': `Bearer ${apiKey}`,
      },
    });

    if (!response.ok) {
      throw new Error(`Eventbrite API error: ${response.status} ${response.statusText}`);
    }

    const data = await response.json();

    return {
      statusCode: 200,
      headers,
      body: JSON.stringify(data),
    };
  } catch (error) {
    console.error('Error fetching Eventbrite events:', error);
    return {
      statusCode: 500,
      headers,
      body: JSON.stringify({ 
        error: 'Failed to fetch events',
        message: error.message || 'Unknown error'
      }),
    };
  }
};


