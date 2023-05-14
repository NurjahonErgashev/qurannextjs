import React from 'react'
import styles from '../styles/Header.module.scss'
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import Settings from './setting';
import SearchIcon from '@mui/icons-material/Search';
import { Modal, Input, Button, Grid } from "@nextui-org/react";
import { useQuery } from '@tanstack/react-query';
import { zapros } from '../utils/axios';
import DoNotDisturbIcon from '@mui/icons-material/DoNotDisturb';
import { useRouter } from 'next/router';

export default function Header(props: { datas?: any[], setDatalar?: any, length?: number, searchIcon?: boolean }) {
    const [visible, setVisible] = React.useState(false);
    const handler = () => setVisible(true);
    const data = useQuery(['data'], () => zapros.get(''))
    const router = useRouter()

    const closeHandler = () => {
        setVisible(false);
        console.log("closed");
    };

    return (
        <div className={styles.Header}>
            <div className={styles.modal}>
                <Modal
                    closeButton
                    blur
                    aria-labelledby="modal-title"
                    open={visible}
                    onClose={closeHandler}
                >

                    <Modal.Body css={{
                        width: '100%',
                        height: '100%',
                        padding: '40px 30px'
                    }}>
                        <Grid >
                            <form style={{
                                display: 'flex',
                                gap: '20px'
                            }} onSubmit={(e: React.SyntheticEvent) => {
                                e.preventDefault()
                                const target = e.target as typeof e.target & {
                                    0: { value: string };
                                };
                                if (target[0] && target[0].value) {
                                    props.setDatalar(data.data?.data.data.filter((i: any) => {
                                        if (i.englishName.toLowerCase().split('-').join('').includes(target[0].value.toLowerCase().split('-').join()) ) {
                                            return i.englishName.toLowerCase().split('-').join('').includes(target[0].value.toLowerCase().split('-').join(''))
                                            
                                        }else if(i.englishName.toLowerCase().includes(target[0].value.toLowerCase())){
                                            
                                            return i.englishName.toLowerCase().includes(target[0].value.toLowerCase())
                                        }
                                    }))
                                    closeHandler()
                                }

                            }}>

                                <Input
                                    bordered
                                    labelPlaceholder="Search..."
                                    color="success" />
                                <Button auto type='submit' color='success'>
                                    ok
                                </Button>
                            </form>
                        </Grid>

                    </Modal.Body>
                </Modal>

            </div>
            <div className={styles.container}>
                <div className={styles.item}>
                    <div>


                        {
                            props.length ?
                                props?.datas?.length === props.length ? <KeyboardArrowLeftIcon onClick={() => {
                                    if (router.pathname == '/surah') {
                                        router.push(`/`)
                                    } else if (router.pathname == '/surah/[id]') {
                                        router.push(`/surah`)
                                    } else {
                                        router.push(`/`)

                                    }

                                }} /> : <DoNotDisturbIcon onClick={() => {
                                    props.setDatalar(data.data?.data.data)

                                }}></DoNotDisturbIcon>
                                : <KeyboardArrowLeftIcon onClick={() => {
                                    if (router.pathname == '/surah') {
                                        router.push(`/`)
                                    } else if (router.pathname == '/surah/[id]') {
                                        router.push(`/surah`)
                                    } else {
                                        router.push(`/`)

                                    }

                                }} />
                        }
                    </div>
                </div>
                <div className={styles.item}>

                    <Settings />
                </div>
                <div className={styles.item} style={{
                    display: props.searchIcon ? 'block' : 'none',

                }} onClick={() => handler()} >
                    <div>

                        <SearchIcon ></SearchIcon>
                    </div>
                </div>
            </div>
        </div >
    )
}
