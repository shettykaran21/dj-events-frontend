import Link from 'next/link';
import Image from 'next/image';
import { FaPencilAlt, FaTimes } from 'react-icons/fa';

import styles from '@/styles/Event.module.css';
import Layout from '@/components/Layout';
import { API_URL } from '@config/index';

const EventPage = ({ event }) => {
  const deleteHandler = () => {
    console.log('Delete');
  };

  return (
    <Layout>
      <div className={styles.event}>
        <div className={styles.controls}>
          <Link href={`/events/edit/${event.id}`}>
            <a>
              <FaPencilAlt />
            </a>
          </Link>
          <a href="#" className={styles.delete} onClick={deleteHandler}>
            <FaTimes /> Delete Event
          </a>
        </div>
        <span>
          {new Date(event.date).toLocaleDateString('en-IN')} at {event.time}
          <h1>{event.name}</h1>
          {event.image && (
            <div className={styles.image}>
              <Image
                src={event.image.formats.medium.url}
                width={960}
                height={600}
              />
            </div>
          )}
          <h3>Performers:</h3>
          <p>{event.performers}</p>
          <h3>Description:</h3>
          <p>{event.description}</p>
          <h3>Venue: {event.venue}</h3>
          <p>{event.address}</p>
          <Link href="/events">
            <a className={styles.back}>{'<'} Go Back</a>
          </Link>
        </span>
      </div>
    </Layout>
  );
};

export const getStaticProps = async ({ params: { slug } }) => {
  const res = await fetch(`${API_URL}/events?slug=${slug}`);
  const events = await res.json();

  return {
    props: {
      event: events[0],
    },
  };
};

export const getStaticPaths = async () => {
  const res = await fetch(`${API_URL}/events`);
  const events = await res.json();

  const paths = events.map((event) => ({
    params: { slug: event.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export default EventPage;
