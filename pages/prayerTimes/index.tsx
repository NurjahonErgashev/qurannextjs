import { Key, useEffect } from 'react';
import styles from '../../styles/Times.module.scss'
import quyosh from '../../public/Quyosh.png'
import tong from '../../public/Tong.png'
import peshin from '../../public/Peshin.png'
import asr from '../../public/Asr.png'
import shom from '../../public/Shom.png'
import xufton from '../../public/Xufton.png'
import React from 'react'
import { Card, Col, Dropdown, Grid, Text } from "@nextui-org/react";
import Image from 'next/image';
import Head from 'next/head';
import { serverSideTranslations } from 'next-i18next/serverSideTranslations';
import { useTranslation } from 'react-i18next';
import { useRouter } from 'next/router';
import dynamic from 'next/dynamic';
const Header = dynamic(() => import('../../components/Header'), {
    ssr: false,
    loading: () => <h3>loading header</h3>
})

interface Data {
    region: string,
    date: string,
    weekday: string,
    times: {
        tong_saharlik: string,
        quyosh: string,
        peshin: string,
        asr: string,
        shom_iftor: string,
        hufton: string
    }
}

export type Selection = 'all' | Set<Key>;

function getTime() {
    const date = new Date(),
        hours = date.getHours() < 10 ? "0" + date.getHours() : date.getHours(),
        minutes =
            date.getMinutes() < 10 ? "0" + date.getMinutes() : date.getMinutes(),
        seconds =
            date.getSeconds() < 10 ? "0" + date.getSeconds() : date.getSeconds();
    return { hours, minutes };
}

export default function Times({ data, region }: { data: Data, region: string }) {
    const [selected, setSelected] = React.useState<Selection>(new Set([`${region}`]));
    const { push } = useRouter()
    const { t: tHome } = useTranslation('home')
    const { t: tTimes } = useTranslation('times')
    const [dateNow, setDate] = React.useState(getTime());
    useEffect(() => {
        setInterval(() => {
            setDate(getTime());
        }, 60000);
    }, []);
    useEffect(() => {
        push(`./prayerTimes?region=${[...selected].join('')}`)

        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [selected])
    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );
    // dataToArray
    const ids = [
        {
            img: tong
        },
        {
            img: quyosh
        },
        {
            img: peshin
        },
        {
            img: asr
        },
        {
            img: shom
        },
        {
            img: xufton
        },
    ]
    const dataToArray = (...args: any[]) => {
        return Object.entries(args[0]).map((item, index) => ({
            [item[0]]: item[1],
            img: ids[index]?.img?.src,
        })
        )
    }
    // datas

    const d = dataToArray(data?.times).map((item) => [...Object.entries(item)[0], ...Object.entries(item)[1]])
    const regions = ['Toshkent', 'Andijon', 'Jizzax', 'Buxoro', 'Navoiy']
    // times
    const time: string = [dateNow.hours, dateNow.minutes].join('')
    const prayerTimes = d.flat().map((i: any) => i.split(':').join('')).filter((i: any) => {
        return Number(i)
    })
    const nextPrayerTime: string = prayerTimes.find((i: any) => i >= time)




    return (
        <div className={styles.Times}>
            <Head>
                <title>
                    {tHome('prayer times')}
                </title>
            </Head>
            <Header></Header>
            <div className={styles.container}>
                <div className={styles.dropdown}>
                    <h2>{tTimes('Hudud')} : </h2>   <Dropdown>
                        <Dropdown.Button flat color="secondary" css={{ tt: "capitalize" }}>
                            {selectedValue}
                        </Dropdown.Button>
                        <Dropdown.Menu
                            aria-label="Single selection actions"
                            color="secondary"
                            disallowEmptySelection
                            selectionMode="single"
                            selectedKeys={selected}
                            onSelectionChange={setSelected}


                        >
                            {
                                regions.map((item: string, index) => (
                                    <Dropdown.Item key={item} >{item}</Dropdown.Item>
                                ))
                            }
                        </Dropdown.Menu>
                    </Dropdown>
                </div>
                <div className={styles.wrapper} >
                    {
                        d.map((item: any, index) => {
                            return (
                                <Grid xs={12} sm={4} key={index} className={styles.cards}  >
                                    <Card className={item[1].split(':').join('') == nextPrayerTime ? styles.active : styles.card} >
                                        <Card.Header css={{ position: "absolute", zIndex: 1, top: 5 }}>
                                            <Col>
                                                <Text size={12} weight="bold" transform="uppercase" color="#ffffffAA">
                                                    {tTimes(item[0].substring(0, 1).toUpperCase() + item[0].substring(1).split('_')[0])}
                                                </Text>
                                                <Text h4 color="white">
                                                    {
                                                        item[1]
                                                    }
                                                </Text>
                                            </Col>
                                        </Card.Header>
                                        <Image
                                            src={`${item[3]}`}
                                            width={100}
                                            height={100}
                                            alt="Card image background"
                                        />
                                    </Card>
                                </Grid>
                            )
                        })
                    }
                </div>
            </div>
        </div >
    )
}



export async function getServerSideProps(context: {
    locale: string; res: { setHeader: (arg0: string, arg1: string, arg2: string) => void; }; query: { region: any; };
}) {
    context.res.setHeader('Cache-Control', 's-maxage=20', 'stale-while-revalidate')
    const response = await fetch(`https://islomapi.uz/api/present/day?region=${context.query.region}`)
    const data = await response.json()

    return {
        props: {
            data,
            revalidate: 60,
            region: context.query.region,
            ...(await serverSideTranslations(context.locale, [
                'home', 'times'
            ])),
        }
    }
}