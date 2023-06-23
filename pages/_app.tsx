import '../styles/globals.css';
import Layout from '@/components/Layout';

type app = {
  Component: any,
  pageProps: any
}

 function MyApp({ Component, pageProps}: app ) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp;