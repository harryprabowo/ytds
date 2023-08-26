const Venue = ({ venues }) => (
    <ul>
        {venues.map(({ id, label, name }) => (
            <li key={id}>{label} | {name}</li>
        ))}
    </ul>
)

export default Venue