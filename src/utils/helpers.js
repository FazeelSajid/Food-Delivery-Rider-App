// helpers.js

import {launchCamera, launchImageLibrary} from 'react-native-image-picker';

export const chooseImageFromCamera = async () => {
  return new Promise(async (resolve, reject) => {
    var options = {
      storageOptions: {
        skipBackup: true,
        path: 'images',
      },
      maxWidth: 500,
      maxHeight: 500,
      quality: 0.5,
    };

    await launchCamera(options)
      .then(async res => {
        console.log('response :  ', res);

        if (res.didCancel) {
          console.log('User cancelled image picker');
          resolve(false);
        } else if (res.error) {
          console.log('ImagePicker Error: ', res.error);
          resolve(false);
        } else if (res.customButton) {
          console.log('User tapped custom button: ', res.customButton);
          resolve(false);
        } else {
          let image = {
            path: res.assets[0].uri,
            mime: res.assets[0].type,
            name: res.assets[0].fileName,
          };
          resolve(image);
        }
      })
      .catch(err => {
        reject(err);
      });
  });
};
