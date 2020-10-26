import { Heading, Pane } from 'evergreen-ui';
import Head from 'next/head';
import ContactForm from '../components/ContactForm';

export default function Home() {
  return (
    <Pane paddingX="20px">
      <Head>
        <title>My page title</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Heading size={900} is="h1" marginTop="default">
        Job in car
      </Heading>
      <ContactForm />
    </Pane>
  );
}
