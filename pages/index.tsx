import Head from 'next/head'
import styles from '../styles/Home.module.scss'
import dynamic from 'next/dynamic'
import { useTranslation } from 'next-i18next'
import { serverSideTranslations } from 'next-i18next/serverSideTranslations'
import { useRouter } from 'next/router'
import Link from 'next/link'
import { useStorage } from '../hooks/useStorage'

const Settings = dynamic(() => import('../components/setting'), {
  ssr: false,
})

const Home = () => {
  const { t } = useTranslation('home')

  const { push, locale } = useRouter()
  const context = useStorage(state => state.context)

  return (
    <div className={styles.Home}>
      <Head>
        <title>Quranim</title>
        <meta name="description" content="Quranim" />
      </Head>
      <div className={styles.container}>
        <Settings />
        <div className={styles.wrapper}>

          <Link href={`/${locale || 'ru'}/surah`} className={styles.item} >
            <h1>
              {t('Quran')}
            </h1>
          </Link>
          <div className={styles.item} onClick={() => push(`./prayerTimes?region=${context}`)}>
            <h1>

              {t('prayer times')}
            </h1>
          </div>
        </div>
      </div>
    </div>
  )
}


export async function getStaticProps({ locale }: { locale: string }) {
  return {
    props: {
      ...(await serverSideTranslations(locale, [
        'home',
      ])),
    },
  }
}
export default Home