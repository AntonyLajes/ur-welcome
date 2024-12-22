import { InterfaceToastProps } from "@gluestack-ui/toast/lib/types";
import { Toast as ToastProps, ToastDescription } from "./ui/toast";

type ToastProps = {
    show: (props: InterfaceToastProps) => string;
    close: (id: string) => void;
    closeAll: () => void;
    isActive: (id: string) => boolean;
}

export const showToast = (toast: ToastProps, message: string = "Publicado com sucesso!") => {
    const toastId = Math.random()
    toast.show({
        id: String(toastId),
        placement: 'bottom',
        duration: 1500,
        render: ({id}) => {
            const uniqueToastId = `toast-${id}`
            return (
                <ToastProps
                    nativeID={uniqueToastId}
                >
                    <ToastDescription>{message}</ToastDescription>
                </ToastProps>
            )
        }

    })
}