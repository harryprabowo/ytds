import client from "utils/client"
import HomePage from './home'

async function getVenues() {
  const {data: venues} = await client.from('venue').select()
  return venues
}

export default async function Page() {
  // Fetch data directly in a Server Component
  const venues = await getVenues()
  // Forward fetched data to your Client Component
  return <HomePage venues={venues} />
}