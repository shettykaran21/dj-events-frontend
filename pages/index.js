import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@config/index';
import Link from 'next/link';

const HomePage = ({ events }) => {
  return (
    <Layout>
      <h1>Upcoming Events</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.map((event) => (
        <EventItem key={event.id} event={event} />
      ))}
      <Link href="/events">
        <a className="btn-secondary">View all Events</a>
      </Link>
    </Layout>
  );
};

export const getStaticProps = async () => {
  const res = await fetch(`${API_URL}/api/events`);
  const events = await res.json();

  return {
    props: { events: events.slice(0, 3) },
    revalidate: 1,
  };
};

export default HomePage;
