import { StatusBar } from 'expo-status-bar';
import React from 'react';
import { Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

import logo from './assets/logo.png'

export default function App() {
  const [selectedImage, setSelectedImage] = React.useState(null);
  let openImagePickerAsync = async () =>{
    let permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if(permissionResult.granted === false){
      alert("Permisson to acess camera roll is required");
      return;
    }
    let pickerResult = await ImagePicker.launchImageLibraryAsync();
    
    if(pickerResult.cancelled === true){
      return;
    }

    setSelectedImage({localUri: pickerResult.uri})
  };

  let openShareDialogAsync = async()=>{
    if (!(await Sharing.isAvailableAsync())){
      alert(`Uh oh, sharing isn't available on your plataform`);
      return;
    }
    await Sharing.shareAsync(selectedImage.localUri);
  };


  if(selectedImage !== null){
    return(
      <View style={styles.container}>
        <Image source={{uri:selectedImage.localUri}} style={styles.thumbnail}/>
        <TouchableOpacity onPress={openShareDialogAsync} style={styles.button}>
          <Text style={styles.buttonText}>Share this photo</Text>
        </TouchableOpacity>
      </View>
    )
  };
  return (
    <View style={styles.container}>
      <Image source={logo} style={styles.logo}/>
      <Text style={styles.instruction}>To share a photo from your phone with a friend, just press the button below!</Text>
      <StatusBar style="auto" />

      <TouchableOpacity
        onPress={openImagePickerAsync} style={styles.button}>
        <Text style={styles.buttonText}>Pick a photo</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo:{
    width:305,
    height:159,
    marginBottom:10
  },
  instruction:{
    color:'#888',
    fontSize: 18,
    marginHorizontal:15,
  },
  button:{
    backgroundColor:"blue",
    padding:20,
    borderRadius:5
  },
  buttonText:{
    fontSize:20,
    color:"#fff"
  },
  thumbnail:{
    width:300,
    height:300,
    resizeMode:"contain"
  }
});

//É possivel carregar imagem por url substituido o nome "logo" por {uri: "urlDaImagem"}
//         onPress={()=> alert("Hello, world!")} style={styles.button}> funçãoq eu exibe um alerta sempre que o botão for clicado <3
