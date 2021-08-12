import Image from 'next/image';
import Link from 'next/link';

import styles from '@/styles/EventItem.module.css';

const EventItem = ({ event }) => {
  return (
    <div className={styles.event}>
      <div className={styles.img}>
        <Image
          src={
            event.image
              ? event.image.formats.thumbnail.url
              : '/images/event-default.jpg'
          }
          width={170}
          height={100}
        />
      </div>
      <div className={styles.info}>
        <span>
          {new Date(event.date).toLocaleDateString('en-IN')} at {event.time}
        </span>
        <h3>{event.name}</h3>
      </div>
      <div className={styles.link}>
        <Link href={`/events/${event.slug}`}>
          <a className="btn">Details</a>
        </Link>
      </div>
    </div>
  );
};

export default EventItem;
