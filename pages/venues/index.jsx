import useSWR from 'swr';

export default () => {
    const fetcher = (url) => fetch(url, { method: 'GET' }).then(res => res.json());
    const { data: venue, error } = useSWR('api/venue', fetcher)

    if (error) {
        return null
    }
    
    return (
        <ul>
            {venue && venue.map(e => <li>e</li>)}
        </ul>
    )
}