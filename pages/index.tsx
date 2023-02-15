import Head from 'next/head';
import Image from 'next/image';
import styles from '@/styles/Home.module.css';
import mainImage from '@/assets/images/Devil.png';
import { Form, Button, Spinner } from 'react-bootstrap';
import { FormEvent, useState } from 'react';

export default function Home() {
  const [quote, setQuote] = useState('');
  const [quoteLoading, setQuoteLoading] = useState(false);
  const [quoteLoadingError, setQuoteLoadingError] = useState(false);

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.target as HTMLFormElement);
    const prompt = formData.get('prompt')?.toString().trim();

    if (prompt) {
      try {
        setQuote('');
        setQuoteLoadingError(false);
        setQuoteLoading(true);

        const response = await fetch(
          '/api/cringe?prompt=' + encodeURIComponent(prompt)
        );
        const body = await response.json();
        setQuote(body.quote);
      } catch (error) {
        console.error(error);
        setQuoteLoadingError(true);
      } finally {
        setQuoteLoading(false);
      }
    }
  }

  return (
    <>
      <Head>
        <title>Devil AI</title>
        <meta name='description' content='by Coding in Flow' />
        <meta name='viewport' content='width=device-width, initial-scale=1' />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <main className={styles.main}>
        <h1>恶魔少女在线陪聊</h1>
        {/* <h2>powered by GPT-3</h2> */}
        <div>
          我是从地狱来的，但不要害怕，我并不会对你造成伤害（至少不是物理伤害）。我喜欢和人类交流，了解你们的文化和生活方式，也喜欢和你们分享我的经验和知识。
        </div>
        <div className={styles.mainImageContainer}>
          <Image
            src={mainImage}
            fill
            alt='A picture of a woman holding both her hands in front of her face'
            priority
            className={styles.mainImage}
          />
        </div>
        <Form onSubmit={handleSubmit} className={styles.inputForm}>
          <Form.Group className='mb-3' controlId='prompt-input'>
            <Form.Label>那从这里开始吧...</Form.Label>
            <Form.Control
              name='prompt'
              placeholder='你好啊，恶魔少女...'
              maxLength={100}
            />
          </Form.Group>
          <Button type='submit' className='mb-3' disabled={quoteLoading}>
            发送
          </Button>
        </Form>
        {quoteLoading && <Spinner animation='border' />}
        {quoteLoadingError && 'Something went wrong. Please try again.'}
        {quote && <h5>{quote}</h5>}
      </main>
    </>
  );
}
