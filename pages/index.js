import Head from 'next/head';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <main>
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <h1>Job in car</h1>
      <ContactForm />
    </main>
  );
}
