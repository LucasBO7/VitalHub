import { Image, Modal, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { Camera, CameraType } from 'expo-camera';
import { useEffect, useRef, useState } from 'react';

import { PinchGestureHandler, GestureHandlerRootView } from 'react-native-gesture-handler';


import * as MediaLibrary from "expo-media-library"

import { FontAwesome } from "@expo/vector-icons"

import { Ionicons } from '@expo/vector-icons';

import { Entypo } from '@expo/vector-icons';

import { ButtonLargeConfirmModal } from '../Button/Button';
import { CardCancelLess } from '../Descriptions/Descriptions';

import { LastPhoto } from '../Images/StyleImages';

import * as ImagePicker from 'expo-image-picker';
import { userDecodeToken } from '../../utils/Auth';

export default function Cam({ navigation, route }) {

    const cameraRef = useRef(null)

    const [openModal, setOpenModal] = useState(false)

    const [photo, setPhoto] = useState(null)

    const [tipoCamera, setTipoCamera] = useState(CameraType.back)

    const [flashMode, setFlashMode] = useState(Camera.Constants.FlashMode.off);

    const [zoom, setZoom] = useState(0)

    const [lastPhoto, setLastPhoto] = useState(null);
    const [user, setUser] = useState();

    // Realiza a requisição de permissões de acesso ao usuário
    async function requestPermissions() {
        const cameraStatus = await MediaLibrary.requestPermissionsAsync();
        const mediaStatus = await Camera.requestCameraPermissionsAsync();
    }

    useEffect(() => {
        requestPermissions();
        GetLatestPhoto();
        profileLoad();
    }, [])

    async function profileLoad() {
        const token = await userDecodeToken();

        if (token) {
            await setUser(token);
        }
    }


    async function CapturePhoto() {
        if (cameraRef) {
            const photo = await cameraRef.current.takePictureAsync();

            setPhoto(photo.uri)

            setOpenModal(true)
        }
    }

    async function ClearPhoto() {

        setPhoto(null)

        setOpenModal(false)

    }

    async function GetLatestPhoto() {
        const { assets } = await MediaLibrary.getAssetsAsync({ sortBy: [[MediaLibrary.SortBy.creationTime, false]], first: 1 });

        if (assets.length > 0) {
            setLastPhoto(assets[0].uri);
        }
    }

    async function SelectImageGallery() {
        const result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.Images,
            quality: 1
        });

        if (!result.canceled) {
            setPhoto(result.assets[0].uri);
            setOpenModal(true);
        }
    }

    async function UploadPhoto() {
        setOpenModal(false);
        {
            if (route.params.viewToOpen == "ViewPrescription") {
                navigation.navigate("ViewPrescription", { photoUri: photo, ...route.params.viewData })
            } else {
                if (user.role === "medico") {
                    navigation.navigate("DoctorMain", { photoUri: photo });
                } else {
                    navigation.navigate("Main", { photoUri: photo });
                }
            }


            // route.params.viewData.viewToOpen == "ViewPrescription"
            //     ? navigation.navigate("ViewPrescription", { photoUri: photo, ...route.params.viewData })
            //     : user.role === "medico"
            //         ?
            //         navigation.navigate("Main", { photoUri: photo });
            //      :
            // navigation.navigate("Main", { photoUri: photo });

        }
    }

    const changeZoom = (event) => {
        if (event.nativeEvent.scale > 1 && zoom < 1) {
            setZoom(zoom + 0.002);
        }
        if (event.nativeEvent.scale < 1 && zoom > 0) {
            setZoom(zoom - 0.02);
        }
    };

    return (
        <GestureHandlerRootView style={{ flex: 1 }}>
            <PinchGestureHandler onGestureEvent={(event) => { changeZoom(event) }}>
                <View style={styles.container}>

                    <Camera
                        ref={cameraRef}
                        zoom={zoom}
                        style={styles.camera}
                        type={tipoCamera}
                        ratio='16:9'
                        autoFocus={true}
                        whiteBalance={'shadow'}
                        flashMode={flashMode}
                    >

                        <TouchableOpacity style={styles.btnClear} onPress={() => { navigation.replace("ViewPrescription") }} >
                            <FontAwesome name="close" size={23} color={"#fff"} />
                        </TouchableOpacity>

                        <View style={styles.viewFlip}>

                            {
                                lastPhoto != null
                                    ? (
                                        <TouchableOpacity onPress={() => {
                                            SelectImageGallery();
                                        }}>
                                            <LastPhoto
                                                source={{ uri: lastPhoto }}
                                            />
                                        </TouchableOpacity>
                                    ) : (
                                        null
                                    )
                            }

                            {/* Reverse Camera - Button */}
                            <TouchableOpacity
                                style={styles.btnFlip}
                                onPress={() => setTipoCamera(tipoCamera == CameraType.front ? CameraType.back : CameraType.front)}
                            >

                                <Ionicons name="camera-reverse" size={32} color="white" />

                            </TouchableOpacity>

                            {/* Shot Camera - Button */}
                            <TouchableOpacity style={styles.btnCapture} onPress={() => CapturePhoto()}>
                                <Entypo name="circle" size={45} color="#404040" />
                                {/* #E8E8E8 */}
                            </TouchableOpacity>

                            {/* Flash Camera - Button */}
                            <TouchableOpacity
                                style={styles.btnFlash}
                                onPress={() => setFlashMode(flashMode === Camera.Constants.FlashMode.off
                                    ? Camera.Constants.FlashMode.on
                                    : Camera.Constants.FlashMode.off)}
                            >

                                {flashMode ? <Ionicons name="flash" size={23} color="white" /> : <Ionicons name="flash-off" size={24} color="white" />}

                            </TouchableOpacity>



                            <Modal animationType='slide' transparent={false} visible={openModal}>

                                <View style={{ flex: 1, justifyContent: "center", alignItems: "center", margin: 20 }}>

                                    <View stye={{ margin: 10, flexDirection: "row" }}>
                                        {/* Botoes de controle */}
                                    </View>

                                    <Image
                                        style={{ width: "95%", height: 600, borderRadius: 12, marginTop: 35, }}
                                        source={{ uri: photo }}
                                    />

                                    <View style={{ margin: 10, flexDirection: 'column', width: "95%", gap: 2, }}>

                                        {/* Botoes de controle */}
                                        {/* <TouchableOpacity style={styles.btnClear} onPress={() => ClearPhoto()}>
                                    <FontAwesome name="trash" size={25} color={"#ff0000"} />
                                </TouchableOpacity> */}

                                        <ButtonLargeConfirmModal text={"Confirmar"} onPress={() => UploadPhoto()} />

                                        <CardCancelLess onPressCancel={() => navigation.replace("Camera")} text={"Refazer"} />

                                    </View>

                                </View>
                            </Modal>


                        </View>

                    </Camera>
                </View>
            </PinchGestureHandler>
        </GestureHandlerRootView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    camera: {
        width: "100%",
        height: "80%",
        flex: 1,
    },
    viewFlip: {
        flex: 1,
        backgroundColor: "trasparent",
        flexDirection: "row",
        alignItems: "flex-end",
        justifyContent: "space-between",
        marginRight: 30,
        marginLeft: 30,
        marginBottom: 5
    },
    btnFlip: {
        padding: 20,
        marginBottom: 15
    },
    txtFlip: {
        fontSize: 20,
        color: "#fff",
        marginBottom: 20
    },
    btnCapture: {
        // padding: 20,
        margin: 20,
        borderRadius: 50,
        backgroundColor: "white",

        width: 55,
        height: 55,

        marginBottom: 22,

        alignItems: "center",
        justifyContent: "center",
    },

    btnFlash: {
        padding: 20,
        marginBottom: 19,
        borderRadius: 20,
        // backgroundColor: "#121212",

        alignItems: "center",
        justifyContent: "center",
    },

    btnClear: {
        backgroundColor: 'transparent',
        padding: 20,
        marginTop: 35,

        alignItems: "center",
        justifyContent: "center",
    },

    btnUpload: {
        backgroundColor: 'transparent',
        padding: 20,

        alignItems: "center",
        justifyContent: "center",
    }

});
