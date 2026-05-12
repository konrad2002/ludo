"use client";

import styles from "./field.module.css";
import {BoardField} from "@/app/game/board";

type FieldProps = { field: BoardField, showNumbers: boolean, onFieldClick: (field: BoardField) => void };

export default function Field(props: FieldProps) {
    const {field, showNumbers, onFieldClick} = props;

    function getBackColour() {
        if (field.isHighlighted) {
            switch (field.colour) {
                case 1:
                    return "blue";
                case 2:
                    return "green";
                case 3:
                    return "red";
                case 4:
                    return "yellow";
            }
        }
        return "white";
    }

    return <div className={styles.field} style={{backgroundColor: getBackColour()}} onClick={() => {onFieldClick(field)}}>{showNumbers ? field.number : ''}</div>;
}
