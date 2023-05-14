import React, { Key } from "react";
import { Dropdown } from "@nextui-org/react";
import { useRouter } from "next/router";
type Selection = 'all' | Set<Key>;
export default function DropDown() {
    const { locale } = useRouter()
    const [selected, setSelected] = React.useState<Selection>(new Set([`${locale}`]));
    
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

                <Dropdown.Item key='ar'>Ar</Dropdown.Item>
                <Dropdown.Item key='uz'>Uz</Dropdown.Item>
                <Dropdown.Item key='ru'>Ru</Dropdown.Item>
                <Dropdown.Item key='en'>En</Dropdown.Item>
            </Dropdown.Menu>
        </Dropdown>
    );
}