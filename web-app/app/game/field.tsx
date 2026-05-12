"use client";

import styles from "./field.module.css";
import {BoardField} from "@/app/game/board";

type FieldProps = { field: BoardField, showNumbers: boolean, onFieldClick: (field: BoardField) => void };

export function getColourByNumber(n: number) {
    switch (n) {
        case 1:
            return "blue";
        case 2:
            return "green";
        case 3:
            return "red";
        case 4:
            return "orange";
    }
}

export default function Field(props: FieldProps) {
    const {field, showNumbers, onFieldClick} = props;

    function getBackColour() {
        if (field.isColoured) {
            return getColourByNumber(field.colour);
        }
        return "#ddd";
    }

    return <div className={styles.field} style={{borderColor: getBackColour(), boxShadow: field.isHighlighted ? "0 0 16px 8px #49b4e7" : ""}} onClick={() => {onFieldClick(field)}}>{showNumbers ? field.number : ''}</div>;
}
