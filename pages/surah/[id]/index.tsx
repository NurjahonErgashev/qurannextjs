import dynamic from "next/dynamic"
import React from 'react'
import { useStorage } from "../../../hooks/useStorage"
import styles from '../../../styles/Id.module.scss'
import { NextRouter, useRouter } from "next/router"
import { useGETALL } from "../../../hooks/useGETALL"
import Loader from "../../../components/Loading"
import Head from "next/head"
import { Button, Card, Grid, Text } from "@nextui-org/react";
import PlayArrowIcon from '@mui/icons-material/PlayArrow';
import PauseIcon from '@mui/icons-material/Pause';
interface Data {
    number: number,
    name: string,
    englishName: string,
    numberOfAyahs: number,
    ayahs: Ayahs[]
}
interface Ayahs {
    number: number,
    text: string
}

const Header = dynamic(() => import('../../../components/Header'), {
    ssr: false, loading: () => <h1>Loading Header ...</h1>
})

function Id() {
    const router: NextRouter = useRouter()
    const author = useStorage(state => state.author)
    const setStatus = useStorage(state => state.setStatus)
    const setAudio = useStorage(state => state.setAudio)
    const audio = useStorage(state => state.audio)
    const status = useStorage(state => state.status)
    let t: string = 'en.asad'
    if (router.locale == 'ru') {
        t = 'ru.kuliev'
    } else if (router.locale == 'ar') {

        t = 'ar.alafasy'
    } else if (router.locale == 'uz') {
        t = 'uz.sodik'
    } else {
        t = 'en.asad'
    }

    const data = useGETALL([
        {
            key: ['text', Number(router.query.id)],
            url: `/${router.query.id}/${t}`
        },
        {
            key: ['audio', Number(router.query.id)],
            url: `/${router.query.id}/${author}`
        }
    ])

    const [datalar, setDatalar] = React.useState([])
    if (data[0].isLoading || data[1].isLoading) {
        return <Loader></Loader>
    }
    if (data[0].isSuccess && data[1].isSuccess && !datalar.length) {
        setDatalar(data[0].data.data.ayahs)
    }
    const handleClick = (i: { number: number }, e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        setAudio(i.number);
        setStatus(i.number, 'pause')
        const target = e.target as typeof e.target & {
            textContent: string
        };
        if (status.number == i.number && status.status == "pause") {
            console.log('stop');
            setStatus(Number(i.number), "play");
        } else if (
            status.number == i.number &&
            status.status == "play"
        ) {
            console.log('play');
            setStatus(Number(i.number), "pause");
        }
    }

    return (
        <div className={styles.Id}>
            <Head>
                <title>{data[0].data.data.englishName}  {data[0].data.data.name}</title>
                <meta name="description" content={`Surah ${data[0].data.data.englishName}`} />
            </Head>
            <Header datas={datalar} length={data[0].data.data.ayahs.length} setDatalar={setDatalar} searchIcon={false} />
            <div className={styles.container}>

                <div className={styles.wrapper}>
                    {
                        data[0].data.data.ayahs.map((i: Ayahs, index: number) => (
                            <Card key={i.number}
                                isPressable
                                isHoverable
                                variant="bordered"
                                className={styles.card}
                                css={{
                                    mw: "400px",
                                    background: audio == i.number ? '#0bb80b' : 'white',
                                    backdropFilter: audio == i.number ? 'blur(10px)' : ''
                                }}
                            >
                                <p className={styles.raqam} style={{
                                    background: audio == i.number ? 'white' : '#0bb80b',
                                    color: audio == i.number ? 'black' : 'white',
                                }}>
                                    {data[0]?.data.data.number} : {index + 1}
                                </p>
                                <Card.Body>
                                    <Text css={{
                                        color: audio == i.number ? 'white' : 'black',
                                    }}>{i.text}</Text>
                                    <Grid>
                                        <Button color='success' auto onPress={(e: any) => handleClick(i, e)}
                                        >
                                            {
                                                (audio == i.number && status.status == 'pause') ? <PauseIcon></PauseIcon> : <PlayArrowIcon></PlayArrowIcon>
                                            }
                                        </Button>
                                    </Grid>
                                </Card.Body>
                            </Card>
                        ))

                    }
                </div>
            </div>
        </div>
    )
}




export default Id