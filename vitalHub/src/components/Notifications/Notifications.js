
//importar os recursos do expo-notifications
import *  as Notifications from "expo-notifications"

//solicigta permissões de notificações ao iniciar o app
Notifications.requestPermissionsAsync();

//define como  as notificações devem ser tratados quando recebidas
Notifications.setNotificationHandler({

    handleNotification: async () => ({

        //mostrar o alerta quando a notificação for recebida
        shouldShowAlert: true,

        //reproduz som ao receber notificação
        shouldPlaySound: true,

        //número de notificações no ícone do app
        shouldSetBadge: true,


    })
})

//função para lidar com a chamada de notificação
export const handleCallNotifications = async ({ title, body }) => {

    //obtém o status da permissão
    const { status } = await Notifications.getPermissionsAsync();

    //verifica se o usuário concedeu permissão
    if (status !== "granted") {

        alert("Você não deixou as notificações ativas !!!")

        return;

    }

    //agenda uma notificação
    await Notifications.scheduleNotificationAsync({

        content: {

            title: title,

            body: body

        },

        trigger: null,

    })
}

