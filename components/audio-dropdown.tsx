import React, { Key } from "react";
import { Dropdown } from "@nextui-org/react";
import { useStorage } from "../hooks/useStorage";
import Authors from "../authors/author-audio";

type Selection = 'all' | Set<Key>;
const fetcher = async (url: string) => {
    const response = await fetch(url)
    return response.json()
}

export default function AudioDropDown() {
    const author = useStorage(state => state.author)
    const [selected, setSelected] = React.useState<Selection>(new Set([`${author}`]));



    const selectedValue = React.useMemo(
        () => Array.from(selected).join(", ").replaceAll("_", " "),
        [selected]
    );


    return (
        <Dropdown>

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
                    Authors.map((i: { img: string, name: string, value: string }) => (
                        <Dropdown.Item key={i.value}>{i.name}</Dropdown.Item>
                    ))
                }
            </Dropdown.Menu>
        </Dropdown>
    );
}