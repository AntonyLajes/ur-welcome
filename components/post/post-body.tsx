import React from "react";
import { Image } from "../ui/image";
import { Text } from "../ui/text";
import { Divider } from "../ui/divider";

type Props = {
    content: string,
    img: string | undefined
}

export default function PostBody({ content, img }: Props) {

    return (
        <>
            <Text
                className="text-typography-700"
            >
                {content}
            </Text>
            {
                img && (
                    <Image
                className="w-full h-auto aspect-video rounded-lg"
                source={{
                    uri: img
                }}
                alt="Post Image."
            />
                )
            }
        </>
    )

}