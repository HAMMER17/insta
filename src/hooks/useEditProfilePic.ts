import { useState } from 'react'

const useEditProfilePic = () => {
  const [selected, setSelected] = useState<any>()
  const maxFileSize = 2 * 1024 * 1024;

  const handleImg = (e: any) => {
    const file = e.target.files[0]
    if (file) {
      if (file.size > maxFileSize) {
        setSelected(null)
        console.log('file is big')
        return;
      }
      const reader = new FileReader()
      reader.onloadend = () => {
        setSelected(reader.result)
      }
      reader.readAsDataURL(file)
    } else {
      setSelected(null)
      console.log('err')
    }
  }
  return { handleImg, selected, setSelected };
}


export default useEditProfilePic
