import React from "react";
import { Image } from "../ui/image";
import { Text } from "../ui/text";

export default function PostBody() {

    return (
        <>
            <Text
                className="text-typography-700"
            >
                Lorem, ipsum dolor sit amet consectetur adipisicing elit. Neque, deserunt vel cum maxime hic doloremque suscipit esse ad nisi minima, laborum nemo sint, sit aut recusandae ab dolor culpa nulla?
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