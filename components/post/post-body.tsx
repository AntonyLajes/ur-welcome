import React from "react";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

type Props = {
    content: string
}

export default function PostBody({ content }: Props) {

    return (
        <>
            <Text
                className="text-typography-700"
            >
                {content}
            </Text>
            <Image
                className="w-full h-auto aspect-video rounded-lg"
                source={{
                    uri: 'https://static.todamateria.com.br/upload/pa/is/paisagem-natural-og.jpg'
                }}
                alt="Post Image."
            />
        </>
    )

}