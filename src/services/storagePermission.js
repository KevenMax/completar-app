import { PermissionsAndroid } from 'react-native'

export default async function requestStoragePermission() {
  try {
    await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE,
      {
        title: 'Permissão para download',
        message:
          'Permissão para download dos anexos das atividades complementares.',
      },
    )
  } catch (err) {
    console.warn(err)
  }
}
