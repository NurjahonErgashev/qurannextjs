import { useRouter } from "next/router";
import styles from '../styles/setting.module.scss'
import React from "react";
import { Button, Modal } from "@nextui-org/react";
import dynamic from "next/dynamic";
import { useStorage } from "../hooks/useStorage";
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
const DropDown = dynamic(() => import('./dropdown'), {
    ssr: false,
})
const AudioDropDown = dynamic(() => import('./audio-dropdown'), {
    ssr: false,
})

export default function Settings() {
    const { push, asPath, locale } = useRouter()
    const [visible, setVisible] = React.useState(false);
    const setAuthor = useStorage(state => state.setAuthor)
    const handler = () => setVisible(true);
    const closeHandler = () => {

        setVisible(false);
    };
    return (
        <div className={styles.container}>
            <Button aria-label="settings" auto color="success" shadow onPress={handler}>
                <SettingsOutlinedIcon></SettingsOutlinedIcon>
            </Button>
            <Modal
                closeButton
                blur
                aria-labelledby="modal-title"
                open={visible}
                onClose={closeHandler}

            >
                <Modal.Body>
                    <form onSubmit={(e: any) => {
                        e.preventDefault()

                        setAuthor(e.target[1].innerText)
                        if (e.target[0].innerText.toLowerCase() == locale?.toLowerCase()) {
                            closeHandler()
                        } else {
                            push(``, asPath, { locale: e.target[0].innerText.toLowerCase() })
                            console.log(asPath);

                        }
                        setVisible(false)
                    }}>

                        <div style={{
                            display: 'flex',
                            justifyContent: 'center',
                            alignItems: 'center',
                            gap: '20px',
                            flexDirection: 'column'
                        }}>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '20px',
                            }}>

                                <p>language : </p> <DropDown />
                            </div>
                            <div style={{
                                display: 'flex',
                                justifyContent: 'center',
                                alignItems: 'center',
                                gap: '20px',
                            }}>

                                <p>audio : </p> <AudioDropDown />
                            </div>

                        </div>
                        <div style={{
                            display: 'flex',
                            gap: '20px',
                            float: 'right',
                            paddingTop: '40px'
                        }}>

                            <Button auto flat color="error" onPress={closeHandler}>
                                Cancel
                            </Button>
                            <Button auto type="submit">
                                Ok
                            </Button>
                        </div>
                    </form>
                </Modal.Body>

            </Modal>
        </div >
    );
}