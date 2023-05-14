import { Button, Grid } from '@nextui-org/react'
import Loader from '../../components/Loading'
import styles from '../../styles/Surah.module.scss'
import { useRouter } from 'next/router'
import Header from '../../components/Header'
import { useEffect, useState } from 'react'
import Head from 'next/head'
import { useQuery } from '@tanstack/react-query'
import { zapros } from '../../utils/axios'
import { GetStaticProps } from 'next'
import Link from 'next/link'
interface Data {
    englishName: string,
    englishNameTranslation: string,
    name: string,
    number: number,
    numberOfAyahs: number
}
export const getStaticProps: GetStaticProps = async ({ locale }) => {
    const response = await fetch(`https://api.alquran.cloud/v1/surah`)
    const data = await response.json()
    return {
        props: {
            data: data,
            locale
        }
    }
}

export default function Surah({ data, locale }: any) {
    const { push } = useRouter()

    const [datalar, setDatalar] = useState<Data[]>()
    const { data: datas, isLoading, isSuccess } = useQuery(['allsurah'], () => {
        return zapros.get('')
    }, {
        initialData: data
    })
    useEffect(() => {
        setDatalar(() => datas.data)
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSuccess])

    if (isLoading) {
        return <Loader></Loader>
    }

    return datalar != undefined && (
        <div className={styles.Surah}>
            <Head>
                <title>surahs</title>
                <meta name="description" content="Surahs" />
            </Head>
            <Header datas={datalar} setDatalar={setDatalar} searchIcon={true} length={114}></Header>
            <div className={styles.container}>

                <div className={styles.wrapper}>
                    {datalar.map((item: Data) => (
                        <Grid key={item.number} className={styles.card} >
                            <Link href={`/surah/${item.number}`} locale={locale}>
                                <Button color="success" bordered>

                                    <div className={styles.text}>

                                        <p>{item.englishName}</p>
                                        <b>{item.name}</b>
                                    </div>
                                </Button>
                            </Link>
                        </Grid>
                    ))}
                </div>
            </div>
        </div>
    )

}

