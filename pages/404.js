import Link from 'next/link';

import styles from '@/styles/404.module.css';
import Layout from '@/components/Layout';

const NotFoundPage = () => {
  return (
    <Layout title="Page not found">
      <div className={styles.error}>
        <h1>404</h1>
        <h4>Sorry, this page doesn't exist</h4>
        <Link href="/">Go back</Link>
      </div>
    </Layout>
  );
};

export default NotFoundPage;
