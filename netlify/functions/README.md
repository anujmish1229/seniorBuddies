# Netlify Functions

## Eventbrite Events Function

This function fetches events from Eventbrite API for the Senior Buddies organizer.

### Setup

1. Get your Eventbrite API key from https://www.eventbrite.com/platform/api-keys/
2. Add the API key as an environment variable in Netlify:
   - Go to your Netlify site dashboard
   - Navigate to Site settings > Environment variables
   - Add a new variable: `EVENTBRITE_API_KEY` with your API key as the value
3. Redeploy your site for the changes to take effect

The function will automatically fetch upcoming events from the Senior Buddies Eventbrite organizer page.

