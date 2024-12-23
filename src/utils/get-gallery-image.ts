import * as ImagePicker from "expo-image-picker"
import PermissionNotGrantedError from "./error/permission-not-granted"

export const getGalleryImage = async () => {
    const { status } = await ImagePicker.getMediaLibraryPermissionsAsync()
    console.log(`status =>`, status);
    
    
    if(status === "denied"){
        throw new PermissionNotGrantedError("Permissão à galeria não concedido.")
    }

    if(status !== "granted" ){
        const { status: requestStatus } = await ImagePicker.requestMediaLibraryPermissionsAsync()
        console.log(`requestStatus =>`, requestStatus);
        if(requestStatus !== "granted") return
    }
    

    const result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: true,
        aspect: [1, 1],
        quality: 1,
        base64: true
    })

    if(result.canceled) return

    return result.assets[0]
}