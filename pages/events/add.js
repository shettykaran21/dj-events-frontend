import { useState } from 'react';
import { useRouter } from 'next/router';
import Link from 'next/link';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import styles from '@/styles/Form.module.css';
import { API_URL } from '@config/index';
import Layout from '@/components/Layout';

const AddEvent = () => {
  const [formData, setFormData] = useState({
    name: '',
    performers: '',
    venue: '',
    address: '',
    date: '',
    time: '',
    description: '',
  });

  const router = useRouter();

  const submitHandler = async (e) => {
    e.preventDefault();

    const hasEmptyField = Object.values(formData).some(
      (element) => element === ''
    );

    if (hasEmptyField) {
      toast.error('Please fill in all fields', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
      return;
    }

    const res = await fetch(`${API_URL}/events`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(formData),
    });

    if (!res.ok) {
      if (res.status === 403 || res.status === 401) {
        toast.error('No token included', {
          position: toast.POSITION.BOTTOM_LEFT,
        });
        return;
      }
      toast.error('Something Went Wrong', {
        position: toast.POSITION.BOTTOM_LEFT,
      });
    } else {
      const event = await res.json();
      router.push(`/events/${event.slug}`);
    }
  };

  const inputChangeHandler = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <Layout title="Add New Event">
      <Link href="/events">Go Back</Link>
      <h1>Add Event</h1>
      <ToastContainer />
      <form onSubmit={submitHandler} className={styles.form}>
        <div className={styles.grid}>
          <div>
            <label htmlFor="name">Event Name</label>
            <input
              type="text"
              name="name"
              id="name"
              value={formData.name}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="performers">Performers</label>
            <input
              type="text"
              name="performers"
              id="performers"
              value={formData.performers}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="venue">Venue</label>
            <input
              type="text"
              name="venue"
              id="venue"
              value={formData.venue}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="address">Address</label>
            <input
              type="text"
              name="address"
              id="address"
              value={formData.address}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="date">Date</label>
            <input
              type="date"
              name="date"
              id="date"
              value={formData.date}
              onChange={inputChangeHandler}
            />
          </div>
          <div>
            <label htmlFor="time">Time</label>
            <input
              type="text"
              name="time"
              id="time"
              value={formData.time}
              onChange={inputChangeHandler}
            />
          </div>
        </div>
        <div>
          <label htmlFor="description">Event Description</label>
          <textarea
            type="text"
            name="description"
            id="description"
            value={formData.description}
            onChange={inputChangeHandler}
          ></textarea>
        </div>
        <input type="submit" value="Add Event" className="btn" />
      </form>
    </Layout>
  );
};

export default AddEvent;
