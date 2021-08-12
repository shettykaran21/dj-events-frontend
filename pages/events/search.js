import qs from 'qs';
import { useRouter } from 'next/router';
import Link from 'next/link';

import EventItem from '@/components/EventItem';
import Layout from '@/components/Layout';
import { API_URL } from '@config/index';

const SearchPage = ({ events }) => {
  const router = useRouter();

  return (
    <Layout>
      <Link href="/events">Go Back</Link>
      <h1>Seach Results for '{router.query.term}'</h1>
      {events.length === 0 && <h3>No events to show</h3>}
      {events.length > 0 &&
        events.map((event) => <EventItem key={event.id} event={event} />)}
    </Layout>
  );
};

export const getServerSideProps = async ({ query: { term } }) => {
  const query = qs.stringify({
    _where: {
      _or: [
        { name_contains: term },
        { performers_contains: term },
        { description_contains: term },
        { venue_contains: term },
      ],
    },
  });

  const res = await fetch(`${API_URL}/events?${query}`);
  const events = await res.json();

  return {
    props: { events },
  };
};

export default SearchPage;
