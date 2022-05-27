import { GetStaticProps} from 'next'
import Head from "next/head";
import { SubscribeButton } from "../components/SubscribeButton";
import { stripe } from '../services/stripe';
import styles from './home.module.scss';

interface  HomeProps {
  product: {
    priceId: string;
    amount: number;
  }
}

export default function Home({product}: HomeProps) {
  return (
    <>
    <Head>
      <title>inicio | ig.news</title>
    </Head>
    <main className={styles.contentContainer}>
      <section className={styles.hero}>
        <span>
        👏Hey, welcome
        </span>
        <h1>
          News abourt the <span>React</span> World.
        </h1>
        <p>
          Get acesss to all the publication <br/>
          <span>for {product.amount} month</span>
        </p>
        <SubscribeButton  priceId={product.priceId}/>
      </section>
      <img src="/images/avatar.svg" alt="Girl coding" />
    </main>
  </>
  );
}


export const getStaticProps: GetStaticProps = async () => {
  const price = await stripe.prices.retrieve('price_1KkXAJDA4uzAcwu961n99fBL')
  const product = {
    priceId: price.id,
    amount: new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(price.unit_amount / 100 ),
  } 
  return {
    props: {
      product
    },
    revalidate: 60 * 60 * 24
  }  
}