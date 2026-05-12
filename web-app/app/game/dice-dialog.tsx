import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import Image from "next/image";
import {useEffect, useState} from "react";
import {Socket} from "socket.io-client";

export function DialogDemo({roll, socket, onRollResult}: { roll: boolean, socket?: Socket, onRollResult: (result: number) => void }) {
    useEffect(() => {
        if (roll) {
            console.log("starting roll");

            setIsRolling(false);
            setRollResult(null);
            setOpen(true);
        }
    }, [roll]);

    useEffect(() => {
        if (socket) {
            socket.on("rolling", (data) => {
                console.log("rolling received", data);
                setIsRolling(true)
            });

            socket.on("diceRollResult", (data) => {
                console.log("roll result received", data.dice);
                setIsRolling(false);
                setRollResult(data.dice);

                setTimeout(() => {
                    setOpen(false);
                    onRollResult(data.dice);
                }, 1000);
            });
        }
    }, [socket]);

    const [isRolling, setIsRolling] = useState(false);

    const [rollResult, setRollResult] = useState<number | null>(null);

    const [open, setOpen] = useState(false);

    const startRolling = () => {
        if (socket) {
            socket.emit("roll");
        }

        setTimeout(() => {
            const result = Math.floor(Math.random() * 6) + 1;
            setRollResult(result);
            setIsRolling(false);

            setTimeout(() => {
                setOpen(false);
                onRollResult(result);
            }, 1000);
        }, 2000);
    }

    const rollingBox = (
        <div className="w-64 h-64 border-2 rounded-md flex items-center justify-center">
            {rollResult ? <span className="text-4xl font-bold">{rollResult}</span> :
            <Image src={isRolling ? "/dice-rolling.gif" : "/dice-still.png"} alt={"Dice Game"} width={400} height={400}
                   className="my-4 cursor-pointer" onClick={startRolling}/>
            }
        </div>
    );

    return (
        <Dialog open={open} onOpenChange={setOpen}>
            <form>
                <DialogContent className="sm:max-w-sm" showCloseButton={false}>
                    <DialogHeader>
                        <DialogTitle>Roll the Dice!</DialogTitle>
                        <DialogDescription>
                            Please click on the dice to roll it.
                        </DialogDescription>
                    </DialogHeader>

                    {rollingBox}
                </DialogContent>
            </form>
        </Dialog>
    )
}
